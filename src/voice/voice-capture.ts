import { cleanupCapture, startMicCapture, type MicCapture } from "./offline-recorder.ts";
import { transcribeAudioFile, type WhisperConfig, type WhisperResult } from "./offline-whisper.ts";

function matchesKey(data: string, key: string): boolean {
  return String(data).trim().toLowerCase() === String(key).trim().toLowerCase();
}

const DEFAULT_INSERT_TRANSCRIPT_KEY = "f10";
const STOP_CAPTURE_TIMEOUT_MS = 3000;
const DEFAULT_TRANSCRIBE_TIMEOUT_MS = 60000;
const FIRST_TRANSCRIBE_TIMEOUT_MS = 600000;

function parseTimeoutMs(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export type VoiceCaptureOptions = {
  insertTranscriptKey?: string;
  whisper?: WhisperConfig;
  captureFactory?: () => MicCapture;
  transcribe?: (filePath: string) => Promise<WhisperResult>;
};

export type VoiceCaptureStatus = "idle" | "recording" | "transcribing" | "error";

export type VoiceCaptureSession = {
  status: VoiceCaptureStatus;
  message: string;
  start(): Promise<void>;
  stop(): Promise<string | undefined>;
  toggle(): Promise<string | undefined>;
  renderLines(): string[];
  handleInput(data: string, done: (result: string | undefined) => void): void;
  dispose(): Promise<void>;
};

export function createVoiceCaptureSession(
  notify: (message: string, level: "info" | "warning" | "error") => void,
  options: VoiceCaptureOptions = {},
): VoiceCaptureSession {
  const insertTranscriptKey = options.insertTranscriptKey?.trim().toLowerCase() || DEFAULT_INSERT_TRANSCRIPT_KEY;
  const captureFactory = options.captureFactory ?? startMicCapture;
  const whisperEnv = options.whisper?.env ?? process.env;
  const transcribeTimeoutMs = parseTimeoutMs(whisperEnv.TALK_PI_TRANSCRIBE_TIMEOUT_MS, DEFAULT_TRANSCRIBE_TIMEOUT_MS);
  const firstTranscribeTimeoutMs = Math.max(transcribeTimeoutMs, parseTimeoutMs(whisperEnv.TALK_PI_TRANSCRIBE_FIRST_TIMEOUT_MS, FIRST_TRANSCRIBE_TIMEOUT_MS));
  const transcribe = options.transcribe ?? ((filePath: string) => transcribeAudioFile(filePath, { ...options.whisper, onNotify: notify }));
  let status: VoiceCaptureStatus = "idle";
  let message = "Ready";
  let capture: MicCapture | undefined;
  let active = false;
  let hasTranscribedOnce = false;

  const set = (nextStatus: VoiceCaptureStatus, nextMessage: string) => {
    status = nextStatus;
    message = nextMessage;
  };

  const start = async () => {
    if (active) return;
    try {
      capture = captureFactory();
      active = true;
      set("recording", "Recording... hold key");
      notify("Voice recording started", "info");
    } catch (error) {
      set("error", "Mic capture unavailable");
      notify(error instanceof Error ? error.message : "Mic capture unavailable", "error");
      capture = undefined;
      active = false;
      throw error instanceof Error ? error : new Error("Mic capture unavailable");
    }
  };

  const stop = async (): Promise<string | undefined> => {
    if (!capture || !active) return undefined;
    set("transcribing", "Transcribing WAV to text...");
    const currentCapture = capture;
    const filePath = currentCapture.filePath;
    capture = undefined;
    active = false;
    try {
      await withTimeout(Promise.resolve(currentCapture.stop()), STOP_CAPTURE_TIMEOUT_MS, "Recording stop");

      const timeoutMs = hasTranscribedOnce ? transcribeTimeoutMs : firstTranscribeTimeoutMs;
      const result = await withTimeout(transcribe(filePath), timeoutMs, "Transcription");
      const text = String(result?.text ?? "").trim();
      if (!text) {
        set("idle", "No speech detected");
        notify("No speech detected", "warning");
        return undefined;
      }

      set("idle", "Ready");
      notify(`Transcript ready`, "info");
      return text;
    } catch (error) {
      set("error", "Transcription failed");
      notify(error instanceof Error ? error.message : "Transcription failed", "error");
      return undefined;
    } finally {
      hasTranscribedOnce = true;
      await cleanupCapture(filePath);
    }
  };

  const dispose = async () => {
    if (capture) {
      const currentCapture = capture;
      const filePath = currentCapture.filePath;
      capture = undefined;
      active = false;
      await currentCapture.stop().catch(() => undefined);
      await cleanupCapture(filePath);
    } else {
      capture = undefined;
      active = false;
    }
    set("idle", "Ready");
  };

  const toggle = async (): Promise<string | undefined> => {
    if (active) return stop();
    await start();
    return undefined;
  };

  return {
    get status() {
      return status;
    },
    get message() {
      return message;
    },
    start,
    stop,
    renderLines() {
      return [
        "",
        `  Voice: ${status}`,
        `  ${message}`,
        `  Hold ${insertTranscriptKey} to record; release to stop.`,
        "",
      ];
    },
    toggle,
    handleInput(data, done) {
      if (matchesKey(data, insertTranscriptKey)) {
        void toggle().then(done).catch(() => done(undefined));
        return;
      }
      if (matchesKey(data, "escape")) {
        void dispose().then(() => done(undefined)).catch(() => done(undefined));
      }
    },
    dispose,
  };
}

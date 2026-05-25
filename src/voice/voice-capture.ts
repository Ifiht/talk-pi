import { matchesKey } from "@earendil-works/pi-tui";
import { cleanupCapture, startMicCapture, type MicCapture } from "./offline-recorder";
import { transcribeAudioFile } from "./offline-whisper";

const DEFAULT_PUSH_TO_TALK_KEY = "f10";

export type VoiceCaptureOptions = {
  pushToTalkKey?: string;
  captureFactory?: () => MicCapture;
  transcribe?: typeof transcribeAudioFile;
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
  const pushToTalkKey = options.pushToTalkKey?.trim().toLowerCase() || DEFAULT_PUSH_TO_TALK_KEY;
  const captureFactory = options.captureFactory ?? startMicCapture;
  const transcribe = options.transcribe ?? transcribeAudioFile;
  let status: VoiceCaptureStatus = "idle";
  let message = "Ready";
  let capture: MicCapture | undefined;
  let active = false;

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
      await currentCapture.stop();

      const result = await transcribe(filePath);
      const text = String(result?.text ?? "").trim();
      if (!text) {
        set("idle", "Ready");
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
        `  Hold ${pushToTalkKey} to record; release to stop.`,
        "",
      ];
    },
    toggle,
    handleInput(data, done) {
      if (matchesKey(data, pushToTalkKey)) {
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

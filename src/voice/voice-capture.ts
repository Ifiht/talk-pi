import { matchesKey } from "@earendil-works/pi-tui";
import { startMicCapture, type MicCapture } from "./offline-recorder";

export const PUSH_TO_TALK_KEY = "f10";

export type VoiceCaptureStatus = "idle" | "recording" | "stopping" | "error";

export type VoiceCaptureSession = {
  status: VoiceCaptureStatus;
  message: string;
  start(): Promise<void>;
  stop(): Promise<string | undefined>;
  toggle(): Promise<string | undefined>;
  renderLines(): string[];
  handleInput(data: string, done: (filePath: string | undefined) => void): void;
  dispose(): Promise<void>;
};

export function createVoiceCaptureSession(notify: (message: string, level: "info" | "warning" | "error") => void): VoiceCaptureSession {
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
      capture = startMicCapture();
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
    set("stopping", "Stopping...");
    await capture.stop();
    const filePath = capture.filePath;
    capture = undefined;
    active = false;
    set("idle", "Ready");
    notify(`Recording saved`, "info");
    return filePath;
  };

  const dispose = async () => {
    if (capture) {
      await capture.stop().catch(() => undefined);
    }
    capture = undefined;
    active = false;
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
        `  Hold ${PUSH_TO_TALK_KEY} to record; release to stop.`,
        "",
      ];
    },
    toggle,
    handleInput(data, done) {
      if (matchesKey(data, PUSH_TO_TALK_KEY)) {
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

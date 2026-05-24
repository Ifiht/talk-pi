import { createIdleRecordingState, describeRecordingState, isRecording, type RecordingState } from "../state/recording_state";
import type { VoiceBridge } from "./microphone_capture";

export type RecordingControllerOptions = {
  onStateChange?: (state: RecordingState) => void;
  onNotify?: (message: string, level: "info" | "warning" | "error") => void;
};

export class RecordingController {
  private state = createIdleRecordingState();

  constructor(
    private readonly bridge: VoiceBridge,
    private readonly options: RecordingControllerOptions = {},
  ) {}

  getState(): RecordingState {
    return this.state;
  }

  getStatusText(): string {
    return describeRecordingState(this.state);
  }

  private emit(): void {
    this.options.onStateChange?.(this.state);
  }

  private notify(message: string, level: "info" | "warning" | "error" = "info"): void {
    this.options.onNotify?.(message, level);
  }

  async start(): Promise<void> {
    if (isRecording(this.state)) return;

    if (!this.bridge.isAvailable()) {
      this.state = { phase: "error", error: "Voice command /voice unavailable" };
      this.emit();
      this.notify("Voice bridge unavailable. Install voice extension with /voice command.", "warning");
      return;
    }

    this.state = { phase: "recording", startedAt: Date.now() };
    this.emit();
    await this.bridge.start();
    this.notify("Voice recording started", "info");
  }

  async stop(): Promise<void> {
    if (!isRecording(this.state)) return;

    await this.bridge.stop();
    this.state = { phase: "idle", stoppedAt: Date.now() };
    this.emit();
    this.notify("Voice recording stopped", "info");
  }

  async toggle(): Promise<void> {
    if (isRecording(this.state)) {
      await this.stop();
      return;
    }
    await this.start();
  }
}

export type RecordingPhase = "idle" | "recording" | "error";

export type RecordingState = {
  phase: RecordingPhase;
  startedAt?: number;
  stoppedAt?: number;
  error?: string;
};

export function createIdleRecordingState(): RecordingState {
  return { phase: "idle" };
}

export function isRecording(state: RecordingState): boolean {
  return state.phase === "recording";
}

export function describeRecordingState(state: RecordingState): string {
  if (state.phase === "recording") return "voice: recording";
  if (state.phase === "error") return `voice: error${state.error ? ` — ${state.error}` : ""}`;
  return "voice: idle";
}

import type { RecordingState } from "../state/recording_state";

export function renderRecordingStatus(state: RecordingState): string {
  switch (state.phase) {
    case "recording":
      return "● voice recording";
    case "error":
      return `! voice error${state.error ? `: ${state.error}` : ""}`;
    default:
      return "voice idle";
  }
}

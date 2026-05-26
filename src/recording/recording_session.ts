import type { RecordingState } from "../state/recording_state.ts";

export type RecordingSession = {
  state: RecordingState;
  bridgeActive: boolean;
  startedAt?: number;
  stoppedAt?: number;
};

export function createRecordingSession(): RecordingSession {
  return {
    state: { phase: "idle" },
    bridgeActive: false,
  };
}

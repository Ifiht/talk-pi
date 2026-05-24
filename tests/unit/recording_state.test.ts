import assert from "node:assert/strict";
import { createIdleRecordingState, describeRecordingState } from "../../src/state/recording_state";

const idle = createIdleRecordingState();
assert.equal(describeRecordingState(idle), "voice: idle");

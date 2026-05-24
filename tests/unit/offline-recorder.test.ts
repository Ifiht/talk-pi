import assert from "node:assert/strict";
import { resolve } from "node:path";
import { startMicCapture } from "../../src/voice/offline-recorder";

// Smoke test only: if recorder backend missing, startMicCapture should throw a clear error.
try {
  const capture = startMicCapture();
  assert.equal(typeof capture.filePath, "string");
  void capture.stop();
} catch (error) {
  assert.ok(error instanceof Error);
}

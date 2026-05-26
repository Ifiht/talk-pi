import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { startMicCapture } from "../../src/voice/offline-recorder.ts";

async function run() {
  const capture = startMicCapture({
    resolveRecorderProgram: () => "mock-recorder",
    loadRecorder: () => ({
      record: () => {
        const stream = Readable.from([] as Buffer[]);
        return {
          stream: () => stream,
          stop: () => undefined,
        };
      },
    }),
  });

  assert.equal(typeof capture.filePath, "string");
  assert.ok(capture.filePath.includes("talk-pi-voice-"));
  await capture.stop();
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

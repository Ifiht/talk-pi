import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { createDecibriCapture } from "../../src/voice/decibri-capture.ts";

async function run() {
  const calls: unknown[] = [];
  const stream = Object.assign(Readable.from([Buffer.from([1, 2, 3, 4])]), {
    async stop() {
      calls.push("stop");
    },
  });

  const capture = createDecibriCapture(
    { sampleRate: 22050, channels: 2, format: "int16", vad: true },
    function MockDecibri(options?: Record<string, unknown>) {
      calls.push(options);
      return stream;
    } as never,
  );

  assert.equal(typeof capture.stream().on, "function");
  await capture.stop();
  assert.deepEqual(calls[0], { sampleRate: 22050, channels: 2, device: undefined, format: "int16", vad: true });
  assert.deepEqual(calls[1], "stop");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

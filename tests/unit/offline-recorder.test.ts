import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import { startMicCapture } from "../../src/voice/offline-recorder.ts";

async function run() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-decibri-"));
  const pcm = Buffer.from([0x01, 0x02, 0x03, 0x04]);

  const capture = startMicCapture({
    captureDir: () => dir,
    createCapture: () => {
      const stream = Readable.from([pcm]);
      return {
        stream: () => stream,
        stop: async () => undefined,
      };
    },
  });

  assert.equal(typeof capture.filePath, "string");
  assert.ok(capture.filePath.includes("talk-pi-voice-"));
  await new Promise((resolve) => setImmediate(resolve));
  await capture.stop();

  assert.equal(fs.existsSync(capture.filePath), true);
  const audio = fs.readFileSync(capture.filePath);
  assert.equal(audio.subarray(0, 4).toString("utf8"), "RIFF");
  assert.equal(audio.subarray(8, 12).toString("utf8"), "WAVE");
  assert.equal(audio.subarray(audio.length - pcm.length).equals(pcm), true);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

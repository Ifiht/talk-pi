import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import { startMicCapture } from "../../src/voice/offline-recorder.ts";

async function run() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-decibri-"));
  const pcm = Buffer.from([0x01, 0x02, 0x03, 0x04]);
  let destroyed = false;

  const capture = startMicCapture({
    captureDir: () => dir,
    createCapture: () => {
      const stream = Readable.from([pcm]);
      const originalDestroy = stream.destroy.bind(stream);
      return {
        stream: () => Object.assign(stream, {
          destroy() {
            destroyed = true;
            return originalDestroy();
          },
        }),
        stop: async () => {
          assert.equal(destroyed, true);
        },
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

  const homeRoot = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-home-"));
  const previousHome = process.env.HOME;
  const previousUserProfile = process.env.USERPROFILE;
  process.env.HOME = homeRoot;
  process.env.USERPROFILE = homeRoot;
  try {
    const defaultCapture = startMicCapture({
      createCapture: () => ({
        stream: () => Readable.from([pcm]),
        stop: async () => undefined,
      }),
    });
    assert.ok(defaultCapture.filePath.includes(path.join(".pi", "agent", "extensions", "talk-pi", "voice-recordings")));
    await defaultCapture.stop();
  } finally {
    if (previousHome === undefined) delete process.env.HOME; else process.env.HOME = previousHome;
    if (previousUserProfile === undefined) delete process.env.USERPROFILE; else process.env.USERPROFILE = previousUserProfile;
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

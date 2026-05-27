import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import { createVoiceCaptureSession } from "../../src/voice/voice-capture.ts";

async function run() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-repeat-"));
  const seen: string[] = [];
  let counter = 0;

  const session = createVoiceCaptureSession(() => undefined, {
    captureFactory: () => {
      counter += 1;
      const filePath = path.join(dir, `capture-${counter}.wav`);
      return {
        filePath,
        stream: () => Readable.from([Buffer.from(`pcm-${counter}`)]),
        async stop() {
          return;
        },
      };
    },
    transcribe: async (filePath: string) => {
      seen.push(filePath);
      return { text: `transcript-${seen.length}`, segments: [] };
    },
  });

  await session.start();
  assert.equal(await session.stop(), "transcript-1");
  await session.start();
  assert.equal(await session.stop(), "transcript-2");
  assert.deepEqual(seen, [path.join(dir, "capture-1.wav"), path.join(dir, "capture-2.wav")]);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

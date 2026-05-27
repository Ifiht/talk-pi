import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import { createVoiceCaptureSession } from "../../src/voice/voice-capture.ts";

async function run() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-push-flow-"));
  const captureFile = path.join(dir, "capture.wav");
  fs.writeFileSync(captureFile, "wav");
  const events: string[] = [];

  const session = createVoiceCaptureSession((message, level) => {
    events.push(`${level}:${message}`);
  }, {
    captureFactory: () => ({
      filePath: captureFile,
      stream: () => Readable.from([Buffer.from("pcm")]),
      async stop() {
        return;
      },
    }),
    transcribe: async (filePath: string) => {
      events.push(`transcribe:${filePath}`);
      return { text: "hello world", segments: [] };
    },
  });

  await session.start();
  const text = await session.stop();

  assert.equal(text, "hello world");
  assert.ok(events.some((event) => event.includes("Transcript ready")));
  assert.ok(events.some((event) => event.startsWith(`transcribe:${captureFile}`)));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

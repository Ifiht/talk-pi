import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createVoiceCaptureSession } from "../../src/voice/voice-capture.ts";

async function testStopCleanup() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-voice-cleanup-"));
  const captureFile = path.join(dir, "capture.wav");
  fs.writeFileSync(captureFile, "wav");
  let transcribedPath: string | undefined;

  const session = createVoiceCaptureSession(() => undefined, {
    captureFactory: () => ({
      filePath: captureFile,
      async stop() {
        return;
      },
    }),
    transcribe: async (filePath: string) => {
      transcribedPath = filePath;
      return { text: "hello", segments: [] };
    },
  });

  await session.start();
  const text = await session.stop();

  assert.equal(text, "hello");
  assert.equal(transcribedPath, captureFile);
  assert.equal(fs.existsSync(captureFile), false);
}

async function testDisposeCleanup() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-voice-dispose-"));
  const captureFile = path.join(dir, "capture.wav");
  fs.writeFileSync(captureFile, "wav");

  const session = createVoiceCaptureSession(() => undefined, {
    captureFactory: () => ({
      filePath: captureFile,
      async stop() {
        return;
      },
    }),
    transcribe: async () => ({ text: "", segments: [] }),
  });

  await session.start();
  await session.dispose();

  assert.equal(fs.existsSync(captureFile), false);
}

async function run() {
  await testStopCleanup();
  await testDisposeCleanup();
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

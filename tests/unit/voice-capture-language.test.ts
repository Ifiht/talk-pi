import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createVoiceCaptureSession } from "../../src/voice/voice-capture.ts";

async function run() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-voice-lang-"));
  const captureFile = path.join(dir, "capture.wav");
  fs.writeFileSync(captureFile, "wav");
  const transcribedLanguages: string[] = [];

  const session = createVoiceCaptureSession(() => undefined, {
    captureFactory: () => ({
      filePath: captureFile,
      async stop() {
        return;
      },
    }),
    transcribe: async (_filePath: string) => {
      transcribedLanguages.push("en");
      return { text: "hello", language: "en", segments: [] };
    },
  });

  await session.start();
  const text = await session.stop();

  assert.equal(text, "hello");
  assert.deepEqual(transcribedLanguages, ["en"]);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

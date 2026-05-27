import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ensureWhisperModel } from "../../src/voice/offline-whisper.ts";

assert.equal(typeof ensureWhisperModel, "function");

async function run() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-whisper-"));
  const modelPath = path.join(dir, "ggml-base.bin");
  const messages: string[] = [];
  fs.writeFileSync(modelPath, "model");
  const resolved = await ensureWhisperModel({ modelPath, onNotify: (message) => messages.push(message) });
  assert.equal(resolved, modelPath);
  assert.deepEqual(messages, []);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

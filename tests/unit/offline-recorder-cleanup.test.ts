import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupCapture } from "../../src/voice/offline-recorder.ts";

async function run() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-cleanup-capture-"));
  const filePath = path.join(dir, "capture.wav");
  fs.writeFileSync(filePath, "wav");

  await cleanupCapture(filePath);

  assert.equal(fs.existsSync(filePath), false);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

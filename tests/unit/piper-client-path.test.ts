import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { EventEmitter } from "node:events";
import { synthesizeSpeechToWav } from "../../src/tts/piper-client.ts";

async function run() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-path-"));
  const install = path.join(dir, "piper");
  fs.mkdirSync(install, { recursive: true });
  const exe = path.join(install, process.platform === "win32" ? "piper.exe" : "piper");
  fs.writeFileSync(exe, "fake");

  const result = await synthesizeSpeechToWav("hello", {
    modelPath: "voice.onnx",
    outputDir: dir,
    binaryPath: exe,
    spawnImpl: ((command: string, args: string[]) => {
      assert.equal(command, exe);
      const child = new EventEmitter() as EventEmitter & { stdin: { end(text: string): void }; stderr: EventEmitter };
      child.stderr = new EventEmitter();
      child.stdin = {
        end(text: string) {
          const out = args[args.indexOf("--output_file") + 1];
          fs.writeFileSync(out, text);
          queueMicrotask(() => child.emit("close", 0));
        },
      };
      return child as never;
    }) as never,
  });

  assert.equal(fs.existsSync(result.audioPath), true);
  await result.cleanup?.();
  assert.equal(fs.existsSync(result.audioPath), false);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

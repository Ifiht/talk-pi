import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { once } from "node:events";
import { setTimeout as delay } from "node:timers/promises";
import { spawnSync } from "node:child_process";
import { record } from "node-record-lpcm16-ts";

export type MicCapture = {
  filePath: string;
  stop(): Promise<void>;
};

function commandExists(command: string): boolean {
  if (process.platform === "win32") {
    const result = spawnSync("where", [command], { stdio: "ignore" });
    return !result.error && result.status === 0;
  }

  const result = spawnSync("sh", ["-lc", `command -v ${command} >/dev/null 2>&1`], { stdio: "ignore" });
  return !result.error && result.status === 0;
}

function resolveRecorderProgram(): string {
  if (process.platform === "win32") {
    return "sox";
  }

  for (const candidate of ["sox", "rec", "arecord"]) {
    if (commandExists(candidate)) {
      return candidate;
    }
  }

  throw new Error("No microphone recorder found. Install sox, rec, or arecord.");
}

function captureDir(): string {
  return path.join(os.homedir(), ".pi", "voice-recordings");
}

export function startMicCapture(): MicCapture {
  const filePath = path.join(captureDir(), `talk-pi-voice-${Date.now()}.wav`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const file = fs.createWriteStream(filePath, { encoding: "binary" });
  const recorder = resolveRecorderProgram();
  const recording = record({
    sampleRate: 16000,
    channels: 1,
    threshold: 0,
    endOnSilence: false,
    silence: "1000.0",
    audioType: "wav",
    verbose: false,
    recorder,
  });

  recording.stream().pipe(file);

  return {
    filePath,
    async stop(): Promise<void> {
      recording.stop();
      file.end();
      await Promise.race([once(file, "finish"), once(file, "close")]);
    },
  };
}

export async function cleanupCapture(filePath: string): Promise<void> {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      await fsp.unlink(filePath);
      return;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return;
      }
      if (attempt === 4) {
        return;
      }
      await delay(50 * (attempt + 1));
    }
  }
}

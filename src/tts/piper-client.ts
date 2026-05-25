import fs from "node:fs/promises";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { createTemporaryWavFile } from "./temp-wav.ts";
import { resolvePiperConfig, type PiperConfigInput } from "./piper-config.ts";

export type PiperClientOptions = PiperConfigInput & {
  spawnImpl?: typeof spawn;
};

export type PiperSynthesisResult = {
  audioPath: string;
  cleanup?: () => Promise<void>;
};

async function pathExists(candidate: string): Promise<boolean> {
  try {
    await fs.access(candidate);
    return true;
  } catch {
    return false;
  }
}

async function resolvePiperBinaryPath(candidate: string): Promise<string> {
  const resolved = candidate.trim();
  if (!resolved) {
    throw new Error("Piper binary path is empty");
  }

  if (path.isAbsolute(resolved) && (await pathExists(resolved))) {
    return resolved;
  }

  const lookup = process.platform === "win32"
    ? spawnSync("where", [resolved], { stdio: "pipe" })
    : spawnSync("sh", ["-lc", `command -v ${resolved}`], { stdio: "pipe" });
  const stdout = String(lookup.stdout ?? "").trim();
  if (lookup.status === 0 && stdout) {
    return stdout.split(/\r?\n/)[0]!.trim();
  }

  if (await pathExists(resolved)) {
    return resolved;
  }

  throw new Error(
    `Piper binary not found: ${resolved}. Set TALK_PI_PIPER_BIN or add piper to PATH.`,
  );
}

export async function synthesizeSpeechToWav(
  text: string,
  options: PiperClientOptions = {},
): Promise<PiperSynthesisResult> {
  const replyText = String(text ?? "").trim();
  if (!replyText) {
    throw new Error("Cannot synthesize empty text");
  }

  const config = resolvePiperConfig(options);
  const binaryPath = await resolvePiperBinaryPath(config.binaryPath);
  const modelPath = config.modelPath;
  const tempFile = await createTemporaryWavFile(config.outputDir);

  try {
    await new Promise<void>((resolve, reject) => {
      const spawnImpl = options.spawnImpl ?? spawn;
      const child = spawnImpl(binaryPath, ["--model", modelPath, "--output_file", tempFile.path], {
        env: config.env,
        stdio: ["pipe", "pipe", "pipe"],
      });

      let stderr = "";
      child.stderr.on("data", (chunk) => {
        stderr += String(chunk);
      });

      child.on("error", reject);
      child.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(stderr.trim() || `Piper failed with code ${code}`));
          return;
        }
        resolve();
      });

      child.stdin.end(`${replyText}\n`);
    });

    const stats = await fs.stat(tempFile.path);
    if (!stats.size) {
      throw new Error("Piper produced empty WAV file");
    }

    return {
      audioPath: tempFile.path,
      cleanup: () => tempFile.cleanup(),
    };
  } catch (error) {
    await tempFile.cleanup().catch(() => undefined);
    throw error;
  }
}

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

export type PiperClientOptions = {
  binaryPath?: string;
  modelPath?: string;
  outputDir?: string;
  env?: NodeJS.ProcessEnv;
  spawnImpl?: typeof spawn;
};

export type PiperSynthesisResult = {
  audioPath: string;
};

async function pathExists(candidate: string): Promise<boolean> {
  try {
    await fs.access(candidate);
    return true;
  } catch {
    return false;
  }
}

function defaultBinaryPath(): string {
  return process.env.TALK_PI_PIPER_BIN ?? "piper";
}

async function resolvePiperBinaryPath(candidate: string): Promise<string> {
  const resolved = candidate.trim();
  if (!resolved) {
    throw new Error("Piper binary path is empty");
  }

  if (path.isAbsolute(resolved) && (await pathExists(resolved))) {
    return resolved;
  }

  const commonWindowsPaths = process.platform === "win32"
    ? [
        "C:\\tools\\piper\\piper\\piper.exe",
        "C:\\tools\\piper\\piper.exe",
        "C:\\Program Files\\Piper\\piper.exe",
        "C:\\Program Files (x86)\\Piper\\piper.exe",
      ]
    : [];

  for (const guess of commonWindowsPaths) {
    if (await pathExists(guess)) {
      return guess;
    }
  }

  const lookup = process.platform === "win32" ? spawnSync("where", [resolved], { stdio: "pipe" }) : spawnSync("sh", ["-lc", `command -v ${resolved}`], { stdio: "pipe" });
  const stdout = String(lookup.stdout ?? "").trim();
  if (lookup.status === 0 && stdout) {
    return stdout.split(/\r?\n/)[0]!.trim();
  }

  if (await pathExists(resolved)) {
    return resolved;
  }

  throw new Error(
    `Piper binary not found: ${resolved}. Set TALK_PI_PIPER_BIN to full path, e.g. C:\\tools\\piper\\piper\\piper.exe`,
  );
}

async function defaultModelPath(): Promise<string> {
  const envModel = process.env.TALK_PI_PIPER_MODEL_PATH?.trim();
  if (envModel) return envModel;

  const candidates = process.platform === "win32"
    ? [
        "C:\\tools\\piper\\voices\\pt_BR-faber-medium.onnx",
        "C:\\tools\\piper\\voices\\en_US-lessac-medium.onnx",
        "C:\\tools\\piper\\voices\\pt_BR-edresson-low.onnx",
        path.join(os.homedir(), ".pi", "tts", "piper", "pt_BR-faber-medium.onnx"),
        path.join(os.homedir(), ".pi", "tts", "piper", "en_US-lessac-medium.onnx"),
      ]
    : [
        path.join(os.homedir(), ".pi", "tts", "piper", "pt_BR-faber-medium.onnx"),
        path.join(os.homedir(), ".pi", "tts", "piper", "en_US-lessac-medium.onnx"),
      ];

  for (const candidate of candidates) {
    if (await pathExists(candidate)) return candidate;
  }

  return candidates[0]!;
}

function defaultOutputDir(): string {
  return process.env.TALK_PI_TTS_OUTPUT_DIR ?? path.join(os.homedir(), ".pi", "tts", "output");
}

function safeName(text: string): string {
  return text
    .slice(0, 24)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "reply";
}

export async function synthesizeSpeechToWav(
  text: string,
  options: PiperClientOptions = {},
): Promise<PiperSynthesisResult> {
  const replyText = String(text ?? "").trim();
  if (!replyText) {
    throw new Error("Cannot synthesize empty text");
  }

  const binaryPath = await resolvePiperBinaryPath(options.binaryPath ?? defaultBinaryPath());
  const modelPath = options.modelPath ?? await defaultModelPath();
  const outputDir = options.outputDir ?? defaultOutputDir();
  const fileName = `reply-${Date.now()}-${safeName(replyText)}.wav`;
  const audioPath = path.join(outputDir, fileName);

  await fs.mkdir(outputDir, { recursive: true });
  await fs.unlink(audioPath).catch(() => undefined);

  await new Promise<void>((resolve, reject) => {
    const spawnImpl = options.spawnImpl ?? spawn;
    const child = spawnImpl(binaryPath, ["--model", modelPath, "--output_file", audioPath], {
      env: options.env ?? process.env,
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

  const stats = await fs.stat(audioPath);
  if (!stats.size) {
    throw new Error("Piper produced empty WAV file");
  }

  return { audioPath };
}

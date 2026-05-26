import fs from "node:fs";
import fsp from "node:fs/promises";
import https from "node:https";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

type WhisperModule = typeof import("whisper-cpp-node");

let whisperModule: WhisperModule | undefined;

function loadWhisperModule(): WhisperModule {
  if (!whisperModule) {
    try {
      whisperModule = createRequire(import.meta.url)("whisper-cpp-node") as WhisperModule;
    } catch {
      throw new Error("whisper-cpp-node not installed. Install dependencies to use voice transcription.");
    }
  }
  return whisperModule;
}

const DEFAULT_MODEL_URL =
  "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin";

export type WhisperResult = {
  text: string;
  language?: string;
  segments: Array<{ start: string; end: string; text: string }>;
};

export type WhisperConfig = {
  modelPath?: string;
  modelUrl?: string;
  language?: string;
  env?: NodeJS.ProcessEnv;
};

function homeModelPath(env: NodeJS.ProcessEnv = process.env): string {
  return env.TALK_PI_WHISPER_MODEL_PATH ?? path.join(os.homedir(), ".pi", "models", "ggml-base.bin");
}

async function downloadFile(url: string, targetPath: string): Promise<void> {
  await fsp.mkdir(path.dirname(targetPath), { recursive: true });
  await fsp.unlink(targetPath).catch(() => undefined);

  await new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(targetPath);
    const request = https.get(url, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        const nextUrl = new URL(response.headers.location, url).toString();
        response.resume();
        file.close(() => void fsp.unlink(targetPath).catch(() => undefined));
        downloadFile(nextUrl, targetPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close(() => void fsp.unlink(targetPath).catch(() => undefined));
        reject(new Error(`Model download failed: HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on("finish", () => file.close(resolve));
    });

    request.on("error", (error) => {
      file.close(() => void fsp.unlink(targetPath).catch(() => undefined));
      reject(error);
    });

    file.on("error", (error) => {
      request.destroy(error);
      reject(error);
    });
  });
}

export async function ensureWhisperModel(options: WhisperConfig = {}): Promise<string> {
  const env = options.env ?? process.env;
  const modelPath = options.modelPath?.trim() || homeModelPath(env);
  const modelUrl = options.modelUrl?.trim() || env.TALK_PI_WHISPER_MODEL_URL?.trim() || DEFAULT_MODEL_URL;
  try {
    const stats = await fsp.stat(modelPath);
    if (stats.size > 0) return modelPath;
  } catch {
    // download below
  }

  await downloadFile(modelUrl, modelPath);
  return modelPath;
}

let cachedContext: ReturnType<WhisperModule["createWhisperContext"]> | undefined;
let cachedModelPath: string | undefined;

export async function transcribeAudioFile(filePath: string, options: WhisperConfig = {}): Promise<WhisperResult> {
  const modelPath = await ensureWhisperModel(options);
  const { createWhisperContext, transcribeAsync } = loadWhisperModule();

  if (!cachedContext || cachedModelPath !== modelPath) {
    cachedContext?.free?.();
    cachedContext = createWhisperContext({ model: modelPath, use_gpu: false, no_prints: true });
    cachedModelPath = modelPath;
  }

  const result = await transcribeAsync(cachedContext, {
    fname_inp: filePath,
    language: options.language?.trim().toLowerCase() || "pt",
    no_timestamps: false,
  });

  const segments = (result?.segments ?? []).map((segment) => ({
    start: segment.start,
    end: segment.end,
    text: String(segment.text ?? "").trim(),
  }));
  const text = String(segments.map((segment) => segment.text).join(" ")).trim();
  return { text, language: result?.language, segments };
}

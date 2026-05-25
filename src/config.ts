import os from "node:os";
import path from "node:path";
import { defaultTemporaryWavRoot } from "./tts/temp-wav.ts";

export type TalkPiShortcutConfig = {
  sendTranscriptKey: string;
  insertTranscriptKey: string;
  pushToTalkKey: string;
};

export type TalkPiPiperConfig = {
  binaryPath: string;
  modelPath: string;
  outputDir: string;
};

export type TalkPiWhisperConfig = {
  modelPath: string;
  modelUrl: string;
};

export type TalkPiConfig = {
  shortcuts: TalkPiShortcutConfig;
  piper: TalkPiPiperConfig;
  whisper: TalkPiWhisperConfig;
};

const DEFAULT_SHORTCUTS: Omit<TalkPiShortcutConfig, "pushToTalkKey"> = {
  sendTranscriptKey: "f9",
  insertTranscriptKey: "f10",
};

const DEFAULT_WHISPER_MODEL_URL =
  "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin";

function normalized(value: string | undefined): string | undefined {
  const trimmed = value?.trim().toLowerCase();
  return trimmed ? trimmed : undefined;
}

function normalizedPath(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function defaultPiperModelPath(): string {
  return path.join(os.homedir(), ".pi", "tts", "piper", "pt_BR-faber-medium.onnx");
}

function defaultWhisperModelPath(): string {
  return path.join(os.homedir(), ".pi", "models", "ggml-base.bin");
}

function resolveShortcuts(env: NodeJS.ProcessEnv): TalkPiShortcutConfig {
  const sendTranscriptKey = normalized(env.TALK_PI_SEND_TRANSCRIPT_KEY) ?? DEFAULT_SHORTCUTS.sendTranscriptKey;
  const insertTranscriptKey = normalized(env.TALK_PI_INSERT_TRANSCRIPT_KEY) ?? DEFAULT_SHORTCUTS.insertTranscriptKey;
  const pushToTalkKey = normalized(env.TALK_PI_PUSH_TO_TALK_KEY) ?? insertTranscriptKey;

  if (sendTranscriptKey === insertTranscriptKey) {
    console.warn(
      `[talk-pi] Shortcut conflict: TALK_PI_SEND_TRANSCRIPT_KEY and TALK_PI_INSERT_TRANSCRIPT_KEY are both "${sendTranscriptKey}". Using defaults.`,
    );
    return {
      ...DEFAULT_SHORTCUTS,
      pushToTalkKey: normalized(env.TALK_PI_PUSH_TO_TALK_KEY) ?? DEFAULT_SHORTCUTS.insertTranscriptKey,
    };
  }

  return {
    sendTranscriptKey,
    insertTranscriptKey,
    pushToTalkKey,
  };
}

export function loadTalkPiConfig(env: NodeJS.ProcessEnv = process.env): TalkPiConfig {
  return {
    shortcuts: resolveShortcuts(env),
    piper: {
      binaryPath: normalizedPath(env.TALK_PI_PIPER_BIN) ?? "piper",
      modelPath: normalizedPath(env.TALK_PI_PIPER_MODEL_PATH) ?? defaultPiperModelPath(),
      outputDir: normalizedPath(env.TALK_PI_TTS_OUTPUT_DIR) ?? defaultTemporaryWavRoot(),
    },
    whisper: {
      modelPath: normalizedPath(env.TALK_PI_WHISPER_MODEL_PATH) ?? defaultWhisperModelPath(),
      modelUrl: normalizedPath(env.TALK_PI_WHISPER_MODEL_URL) ?? DEFAULT_WHISPER_MODEL_URL,
    },
  };
}

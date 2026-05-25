import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { loadTalkPiConfig } from "../../src/config.ts";
import { defaultTemporaryWavRoot } from "../../src/tts/temp-wav.ts";

function run(): void {
  const config = loadTalkPiConfig({
    TALK_PI_SEND_TRANSCRIPT_KEY: " F8 ",
    TALK_PI_INSERT_TRANSCRIPT_KEY: " F7 ",
    TALK_PI_PUSH_TO_TALK_KEY: " F6 ",
    TALK_PI_PIPER_BIN: " /opt/piper/bin/piper ",
    TALK_PI_PIPER_MODEL_PATH: " /opt/piper/voices/voice.onnx ",
    TALK_PI_TTS_OUTPUT_DIR: " /tmp/talk-pi-tts ",
    TALK_PI_WHISPER_MODEL_PATH: " /tmp/whisper.bin ",
    TALK_PI_WHISPER_MODEL_URL: " https://example.com/whisper.bin ",
  } as NodeJS.ProcessEnv);

  assert.deepEqual(config.shortcuts, {
    sendTranscriptKey: "f8",
    insertTranscriptKey: "f7",
    pushToTalkKey: "f6",
  });
  assert.deepEqual(config.piper, {
    binaryPath: "/opt/piper/bin/piper",
    modelPath: "/opt/piper/voices/voice.onnx",
    outputDir: "/tmp/talk-pi-tts",
  });
  assert.deepEqual(config.whisper, {
    modelPath: "/tmp/whisper.bin",
    modelUrl: "https://example.com/whisper.bin",
  });

  const defaults = loadTalkPiConfig({} as NodeJS.ProcessEnv);

  assert.equal(defaults.piper.binaryPath, "piper");
  assert.equal(defaults.piper.outputDir, defaultTemporaryWavRoot());
  assert.equal(
    defaults.piper.modelPath,
    path.join(os.homedir(), ".pi", "tts", "piper", "pt_BR-faber-medium.onnx"),
  );
  assert.equal(
    defaults.whisper.modelPath,
    path.join(os.homedir(), ".pi", "models", "ggml-base.bin"),
  );
}

run();

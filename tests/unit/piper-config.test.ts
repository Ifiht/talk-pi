import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { resolvePiperConfig } from "../../src/tts/piper-config.ts";
import { defaultTemporaryWavRoot } from "../../src/tts/temp-wav.ts";

function run(): void {
  const config = resolvePiperConfig({
    env: {
      TALK_PI_PIPER_BIN: "  /opt/piper/bin/piper  ",
      TALK_PI_PIPER_MODEL_PATH: "  /opt/piper/voices/voice.onnx  ",
      TALK_PI_TTS_OUTPUT_DIR: "  /tmp/talk-pi-tts  ",
    } as NodeJS.ProcessEnv,
  });

  assert.equal(config.binaryPath, "/opt/piper/bin/piper");
  assert.equal(config.modelPath, "/opt/piper/voices/voice.onnx");
  assert.equal(config.outputDir, "/tmp/talk-pi-tts");

  const defaults = resolvePiperConfig({
    env: {
      TALK_PI_PIPER_MODEL_PATH: "/opt/piper/voices/voice.onnx",
    } as NodeJS.ProcessEnv,
  });

  assert.equal(defaults.binaryPath, "piper");
  assert.equal(defaults.modelPath, "/opt/piper/voices/voice.onnx");
  assert.equal(defaults.outputDir, defaultTemporaryWavRoot());
  assert.equal(defaults.outputDir.startsWith(os.tmpdir()), true);

  const fallback = resolvePiperConfig({ env: {} as NodeJS.ProcessEnv });
  assert.equal(
    fallback.modelPath,
    path.join(os.homedir(), ".pi", "tts", "piper", "pt_BR-faber-medium.onnx"),
  );
}

run();

import assert from "node:assert/strict";
import fs from "node:fs";
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

  assert.equal(defaults.binaryPath, path.join(process.cwd(), "tools", "piper", process.platform === "win32" ? "piper.exe" : "piper"));
  assert.equal(defaults.modelPath, "/opt/piper/voices/voice.onnx");
  assert.equal(defaults.outputDir, defaultTemporaryWavRoot());
  assert.equal(defaults.outputDir.startsWith(os.tmpdir()), true);

  const toolsDir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-tools-"));
  const fallback = resolvePiperConfig({ env: { TALK_PI_TOOLS_DIR: toolsDir } as NodeJS.ProcessEnv });
  assert.equal(
    fallback.binaryPath,
    path.join(toolsDir, "piper", process.platform === "win32" ? "piper.exe" : "piper"),
  );
  assert.equal(
    fallback.modelPath,
    path.join(toolsDir, "piper", "models", "pt_BR-faber-medium.onnx"),
  );
}

run();

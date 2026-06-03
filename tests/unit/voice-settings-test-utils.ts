import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { executableName } from "../../src/tools.ts";

export function createVoiceSettingsFixture(prefix: string) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  const toolsDir = path.join(root, ".pi", "agent", "extensions", "talk-pi");
  const piperDir = path.join(toolsDir, "piper");
  const modelsDir = path.join(piperDir, "models");
  const prefsPath = path.join(root, "prefs.json");

  fs.mkdirSync(modelsDir, { recursive: true });
  fs.writeFileSync(path.join(piperDir, executableName("piper")), "piper");
  fs.writeFileSync(path.join(modelsDir, "pt_BR-faber-medium.onnx"), "pt");
  fs.writeFileSync(path.join(modelsDir, "pt_BR-faber-medium.onnx.json"), "{}");
  fs.writeFileSync(path.join(modelsDir, "en_US-lessac-medium.onnx"), "english");
  fs.writeFileSync(path.join(modelsDir, "en_US-lessac-medium.onnx.json"), "{}");
  fs.writeFileSync(path.join(modelsDir, "en_US-ryan-medium.onnx"), "english");
  fs.writeFileSync(path.join(modelsDir, "en_US-ryan-medium.onnx.json"), "{}");

  return {
    root,
    toolsDir,
    modelsDir,
    prefsPath,
    env: {
      HOME: root,
      USERPROFILE: root,
      TALK_PI_TOOLS_DIR: toolsDir,
      TALK_PI_PIPER_MODELS_DIR: modelsDir,
      TALK_PI_PIPER_PREFERENCES_PATH: prefsPath,
    } as NodeJS.ProcessEnv,
  };
}

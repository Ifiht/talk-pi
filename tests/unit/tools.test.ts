import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { executableName, resolveToolPath, resolveToolsRoot } from "../../src/tools.ts";

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-tools-root-"));
const localTools = path.join(temp, "tools");
fs.mkdirSync(path.join(localTools, "piper"), { recursive: true });
fs.mkdirSync(path.join(localTools, "sox"), { recursive: true });
fs.mkdirSync(path.join(localTools, "whisper", "models"), { recursive: true });
fs.writeFileSync(path.join(localTools, "piper", executableName("piper")), "");
fs.writeFileSync(path.join(localTools, "sox", executableName("sox")), "");
fs.writeFileSync(path.join(localTools, "whisper", "models", "ggml-base.bin"), "");

const packageRootTools = resolveToolsRoot({ cwd: temp });
assert.equal(packageRootTools, localTools);
assert.equal(resolveToolPath(["piper", executableName("piper")], { cwd: temp }), path.join(localTools, "piper", executableName("piper")));
assert.equal(resolveToolsRoot({ env: { TALK_PI_TOOLS_DIR: "/custom/tools" } as NodeJS.ProcessEnv, cwd: temp }), "/custom/tools");

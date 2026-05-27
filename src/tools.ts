import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type ToolPathOptions = {
  env?: NodeJS.ProcessEnv;
  cwd?: string;
};

function packageRoot(): string {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

function hasToolsDir(root: string): boolean {
  return fs.existsSync(path.join(root, "tools"));
}

function hasRequiredTools(toolsRoot: string): boolean {
  return [
    path.join(toolsRoot, "piper", executableName("piper")),
    path.join(toolsRoot, "sox", executableName("sox")),
    path.join(toolsRoot, "whisper", "models", "ggml-base.bin"),
  ].every((candidate) => fs.existsSync(candidate));
}

export function resolveToolsRoot(options: ToolPathOptions = {}): string {
  const env = options.env ?? process.env;
  const explicit = env.TALK_PI_TOOLS_DIR?.trim();
  if (explicit) return explicit;

  const cwdRoot = options.cwd ?? process.cwd();
  const cwdTools = path.join(cwdRoot, "tools");
  if (hasToolsDir(cwdRoot) && hasRequiredTools(cwdTools)) return cwdTools;

  const bundledRoot = packageRoot();
  const bundledTools = path.join(bundledRoot, "tools");
  if (hasToolsDir(bundledRoot) && hasRequiredTools(bundledTools)) return bundledTools;

  return cwdTools;
}

export function resolveToolPath(segments: string[], options: ToolPathOptions = {}): string {
  return path.join(resolveToolsRoot(options), ...segments);
}

export function executableName(baseName: string): string {
  return process.platform === "win32" ? `${baseName}.exe` : baseName;
}

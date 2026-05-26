export type UnifiedMenuAction = "status" | "voice-language" | "mute" | "unmute" | "close";

export function buildUnifiedMenuOptions(isMuted: boolean): string[] {
  return ["Status", "Voice Language", isMuted ? "Unmute" : "Mute", "Close"];
}

export function parseUnifiedMenuAction(choice: string | undefined, isMuted: boolean): UnifiedMenuAction {
  const normalized = String(choice ?? "").trim().toLowerCase();
  if (normalized === "status") return "status";
  if (normalized === "voice language" || normalized === "voice-language") return "voice-language";
  if (normalized === "close" || normalized === "escape") return "close";
  if (normalized === "mute" && !isMuted) return "mute";
  if (normalized === "unmute" && isMuted) return "unmute";
  if (normalized === "mute extension" && !isMuted) return "mute";
  if (normalized === "unmute extension" && isMuted) return "unmute";
  return "close";
}

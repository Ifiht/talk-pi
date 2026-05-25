import type { MuteState } from "./mute-state.ts";

export type MuteMenuChoice = "mute" | "unmute" | "close";

export type MuteMenuContext = {
  ui: {
    select?: (title: string, options: string[], opts?: { overlay?: boolean }) => Promise<string | undefined>;
    notify(message: string, level: "info" | "warning" | "error"): void;
  };
};

export function formatMuteStateLabel(muted: boolean): string {
  return muted ? "Muted" : "Unmuted";
}

export function formatMuteMenuTitle(muted: boolean): string {
  return `Extension ${formatMuteStateLabel(muted)}`;
}

export async function openMuteMenu(ctx: MuteMenuContext, state: MuteState): Promise<MuteMenuChoice> {
  const muted = state.isMuted();
  const title = formatMuteMenuTitle(muted);
  const options = muted ? ["Unmute extension", "Close"] : ["Mute extension", "Close"];

  if (!ctx.ui.select) {
    ctx.ui.notify(`Mute menu unavailable; defaulting to ${muted ? "unmute" : "mute"}.`, "warning");
    return muted ? "unmute" : "mute";
  }

  const choice = await ctx.ui.select(title, options, { overlay: true });
  if (choice === options[0]) {
    return muted ? "unmute" : "mute";
  }
  return "close";
}

export type VoiceShortcutKind = "send" | "insert";

export type VoiceShortcutInterruptOptions = {
  isPlaybackPlaying: () => boolean;
  stopPlayback: () => Promise<void>;
  toggleVoiceCapture: (shortcut: VoiceShortcutKind) => void;
};

export async function runVoiceShortcut(shortcut: VoiceShortcutKind, options: VoiceShortcutInterruptOptions): Promise<void> {
  if (options.isPlaybackPlaying()) {
    await options.stopPlayback();
  }

  options.toggleVoiceCapture(shortcut);
}

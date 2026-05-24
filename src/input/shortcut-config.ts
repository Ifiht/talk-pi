export type TalkPiShortcutConfig = {
  sendTranscriptKey: string;
  insertTranscriptKey: string;
};

const DEFAULT_SHORTCUTS: TalkPiShortcutConfig = {
  sendTranscriptKey: "f9",
  insertTranscriptKey: "f10",
};

function normalizeShortcutKey(value: string | undefined, fallback: string): string {
  const key = value?.trim().toLowerCase();
  return key ? key : fallback;
}

export function getTalkPiShortcutConfig(env: NodeJS.ProcessEnv = process.env): TalkPiShortcutConfig {
  const config: TalkPiShortcutConfig = {
    sendTranscriptKey: normalizeShortcutKey(env.TALK_PI_SEND_TRANSCRIPT_KEY, DEFAULT_SHORTCUTS.sendTranscriptKey),
    insertTranscriptKey: normalizeShortcutKey(env.TALK_PI_INSERT_TRANSCRIPT_KEY, DEFAULT_SHORTCUTS.insertTranscriptKey),
  };

  if (config.sendTranscriptKey === config.insertTranscriptKey) {
    console.warn(
      `[talk-pi] Shortcut conflict: TALK_PI_SEND_TRANSCRIPT_KEY and TALK_PI_INSERT_TRANSCRIPT_KEY are both "${config.sendTranscriptKey}". Using defaults.`,
    );
    return { ...DEFAULT_SHORTCUTS };
  }

  return config;
}

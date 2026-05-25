import { loadTalkPiConfig } from "../config.ts";

export type TalkPiShortcutConfig = {
  sendTranscriptKey: string;
  insertTranscriptKey: string;
};

export function getTalkPiShortcutConfig(env: NodeJS.ProcessEnv = process.env): TalkPiShortcutConfig {
  const { sendTranscriptKey, insertTranscriptKey } = loadTalkPiConfig(env).shortcuts;
  return { sendTranscriptKey, insertTranscriptKey };
}

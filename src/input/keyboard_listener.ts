export type PushToTalkHotkey = {
  pressKey: string;
};

export function isPushToTalkPress(data: string, key: string): boolean {
  return data === key;
}

export function isPushToTalkRelease(data: string, key: string): boolean {
  return data === `${key}:release`;
}

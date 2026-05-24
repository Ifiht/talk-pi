import assert from "node:assert/strict";
import { runVoiceShortcut } from "../../src/input/voice-shortcut-interrupt.ts";

async function run() {
  const events: string[] = [];
  await runVoiceShortcut("send", {
    isPlaybackPlaying: () => true,
    stopPlayback: async () => {
      events.push("stop");
    },
    toggleVoiceCapture: (shortcut) => {
      events.push(`toggle:${shortcut}`);
    },
  });

  assert.deepEqual(events, ["stop", "toggle:send"]);

  events.length = 0;
  await runVoiceShortcut("insert", {
    isPlaybackPlaying: () => false,
    stopPlayback: async () => {
      events.push("stop");
    },
    toggleVoiceCapture: (shortcut) => {
      events.push(`toggle:${shortcut}`);
    },
  });

  assert.deepEqual(events, ["toggle:insert"]);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

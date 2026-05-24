import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createPlaybackQueue } from "../../src/tts/playback-queue.ts";

async function run() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "talk-pi-esc-stop-"));
  const events: string[] = [];
  let releasePlayback: (() => void) | undefined;

  const queue = createPlaybackQueue({
    synthesize: async (text) => {
      const audioPath = path.join(dir, `${text}.wav`);
      fs.writeFileSync(audioPath, text);
      return { audioPath };
    },
    player: {
      async play(filePath: string) {
        events.push(`play:${fs.readFileSync(filePath, "utf8")}`);
        await new Promise<void>((resolve) => {
          releasePlayback = resolve;
        });
      },
      async stop() {
        events.push("stop");
        releasePlayback?.();
      },
    },
    onStatus(message) {
      events.push(message);
    },
  });

  const active = queue.enqueue("assistant reply");
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(queue.isPlaying(), true);

  await queue.stop();
  await active;

  assert.deepEqual(events.some((event) => event.includes("stopped")), true);
  assert.equal(events.includes("play:assistant reply"), true);
  assert.equal(queue.pendingCount(), 0);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

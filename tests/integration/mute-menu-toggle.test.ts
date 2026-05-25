import assert from "node:assert/strict";
import { createMuteState } from "../../src/ui/mute-state.ts";
import { openMuteMenu } from "../../src/ui/mute-menu.ts";

async function run() {
  const state = createMuteState();
  const titles: string[] = [];
  const optionsSeen: string[][] = [];

  const ctx = {
    ui: {
      async select(title: string, options: string[]) {
        titles.push(title);
        optionsSeen.push(options);
        return options[0];
      },
      notify: (_message: string, _level: "info" | "warning" | "error") => undefined,
    },
  };

  const first = await openMuteMenu(ctx, state);
  assert.equal(first, "mute");
  state.mute();

  const second = await openMuteMenu(ctx, state);
  assert.equal(second, "unmute");

  assert.ok(titles[0]?.includes("Unmuted"));
  assert.ok(titles[1]?.includes("Muted"));
  assert.deepEqual(optionsSeen[0], ["Mute extension", "Close"]);
  assert.deepEqual(optionsSeen[1], ["Unmute extension", "Close"]);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

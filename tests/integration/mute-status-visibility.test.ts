import assert from "node:assert/strict";
import { createMuteState } from "../../src/ui/mute-state.ts";
import { openMuteMenu } from "../../src/ui/mute-menu.ts";

async function run() {
  const state = createMuteState(true);
  const titles: string[] = [];

  const ctx = {
    ui: {
      async select(title: string) {
        titles.push(title);
        return "Close";
      },
      notify: (_message: string, _level: "info" | "warning" | "error") => undefined,
    },
  };

  await openMuteMenu(ctx, state);
  assert.ok(titles[0]?.includes("Muted"));

  state.unmute();
  await openMuteMenu(ctx, state);
  assert.ok(titles[1]?.includes("Unmuted"));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

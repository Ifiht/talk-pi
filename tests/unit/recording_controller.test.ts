import assert from "node:assert/strict";
import { RecordingController } from "../../src/recording/recording_controller.ts";

async function run() {
  const calls: string[] = [];
  const controller = new RecordingController(
    {
      isAvailable: () => true,
      start: async () => {
        calls.push("start");
      },
      stop: async () => {
        calls.push("stop");
      },
    },
    { onNotify: () => undefined },
  );

  await controller.start();
  assert.equal(controller.getState().phase, "recording");
  await controller.stop();
  assert.equal(controller.getState().phase, "idle");
  assert.deepEqual(calls, ["start", "stop"]);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

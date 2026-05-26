import assert from "node:assert/strict";
import { RecordingController } from "../../src/recording/recording_controller.ts";

async function run() {
  const events: string[] = [];
  const controller = new RecordingController(
    {
      isAvailable: () => true,
      start: async () => events.push("voice-start"),
      stop: async () => events.push("voice-stop"),
    },
    { onNotify: (_message) => undefined },
  );

  await controller.start();
  await controller.stop();

  assert.deepEqual(events, ["voice-start", "voice-stop"]);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

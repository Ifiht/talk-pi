import assert from "node:assert/strict";
import { createVoiceCaptureSession } from "../../src/voice/voice-capture.ts";

async function run() {
  let shouldFail = true;
  const messages: string[] = [];

  const session = createVoiceCaptureSession((message, level) => {
    messages.push(`${level}:${message}`);
  }, {
    captureFactory: () => {
      if (shouldFail) {
        throw new Error("Microphone access unavailable");
      }
      return {
        filePath: "retry.wav",
        stream: () => ({ on: () => undefined, destroy: () => undefined } as never),
        async stop() {
          return;
        },
      };
    },
    transcribe: async () => ({ text: "hello", segments: [] }),
  });

  await assert.rejects(() => session.start(), /Microphone access unavailable/);
  assert.equal(session.status, "error");
  shouldFail = false;
  await session.start();
  await session.stop();
  assert.equal(session.status, "idle");
  assert.ok(messages.some((message) => message.includes("Microphone access unavailable")));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

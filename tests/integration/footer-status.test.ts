import assert from "node:assert/strict";
import { formatFooterStatusFromState } from "../../src/ui/footer-status.ts";

async function run() {
  assert.equal(
    formatFooterStatusFromState({ voiceStatus: "idle", muted: false, playing: false }),
    "| Talk-Pi: Ready 🟢",
  );
  assert.equal(
    formatFooterStatusFromState({ voiceStatus: "recording" }),
    "| Talk-Pi: Listen 🎤",
  );
  assert.equal(
    formatFooterStatusFromState({ voiceStatus: "transcribing", speechStatus: "Spoken reply ready to play: reply.wav" }),
    "| Talk-Pi: Transcribing ⏳",
  );
  assert.equal(
    formatFooterStatusFromState({ speechStatus: "Spoken reply playing: reply.wav", playing: true }),
    "| Talk-Pi: Talking 🗣️",
  );
  assert.equal(
    formatFooterStatusFromState({ muted: true }),
    "| Talk-Pi: Muted 🔇",
  );
  assert.equal(
    formatFooterStatusFromState({ voiceStatus: "error" }),
    "| Talk-Pi: Error ⚠️",
  );
  assert.equal(
    formatFooterStatusFromState({ voiceMessage: "No speech detected" }),
    "| Talk-Pi: No speech detected 👂",
  );

  const narrow = formatFooterStatusFromState({ voiceMessage: "No speech detected" });
  assert.equal(narrow.startsWith("| Talk-Pi:"), true);
  assert.equal(narrow.length <= 40, true);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

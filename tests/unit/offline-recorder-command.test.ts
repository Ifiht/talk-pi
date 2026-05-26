import assert from "node:assert/strict";
import { buildRecorderCommand } from "../../src/voice/offline-recorder.ts";

assert.deepEqual(buildRecorderCommand({}, "sox").args, [
  "--default-device",
  "--no-show-progress",
  "--rate",
  "16000",
  "--channels",
  "1",
  "--encoding",
  "signed-integer",
  "--bits",
  "16",
  "--type",
  "wav",
  "-",
]);

assert.deepEqual(buildRecorderCommand({ device: "hw:1" }, "arecord").args, [
  "-D",
  "hw:1",
  "-q",
  "-r",
  "16000",
  "-c",
  "1",
  "-t",
  "wav",
  "-f",
  "S16_LE",
  "-",
]);

assert.deepEqual(buildRecorderCommand({ endOnSilence: true, threshold: 0.8, silence: "2.0" }, "rec").args, [
  "-q",
  "-r",
  "16000",
  "-c",
  "1",
  "-e",
  "signed-integer",
  "-b",
  "16",
  "-t",
  "wav",
  "-",
  "silence",
  "1",
  "0.1",
  "0.8%",
  "1",
  "2.0",
  "0.8%",
]);

assert.equal(buildRecorderCommand({ device: "hw:1" }, "sox").spawnOptions.env?.AUDIODEV, "hw:1");

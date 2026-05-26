import assert from "node:assert/strict";
import { ensureWhisperModel } from "../../src/voice/offline-whisper.ts";

assert.equal(typeof ensureWhisperModel, "function");

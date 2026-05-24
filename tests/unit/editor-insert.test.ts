import assert from "node:assert/strict";
import { insertTranscriptIntoEditor } from "../../src/input/editor-insert.ts";

let buffer = "hello";
const ctx = {
  ui: {
    getEditorText() {
      return buffer;
    },
    setEditorText(text: string) {
      buffer = text;
    },
  },
};

assert.equal(insertTranscriptIntoEditor(ctx, " world "), true);
assert.equal(buffer, "hello world");
assert.equal(insertTranscriptIntoEditor(ctx, "   "), false);
assert.equal(buffer, "hello world");

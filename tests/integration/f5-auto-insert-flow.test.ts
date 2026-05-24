import assert from "node:assert/strict";
import { createShortcutDebounce } from "../../src/input/f5-shortcut.ts";
import { insertTranscriptIntoEditor } from "../../src/input/editor-insert.ts";

let now = 0;
const f5 = createShortcutDebounce(2000, () => now);
let buffer = "draft";
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

assert.equal(f5.allow(), true);
assert.equal(f5.allow(), false);
now = 2500;
assert.equal(f5.allow(), true);
assert.equal(insertTranscriptIntoEditor(ctx, "olá mundo"), true);
assert.equal(buffer, "draft olá mundo");

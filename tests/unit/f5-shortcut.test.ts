import assert from "node:assert/strict";
import { createShortcutDebounce } from "../../src/input/f5-shortcut.ts";

let now = 0;
const shortcut = createShortcutDebounce(2000, () => now);

assert.equal(shortcut.allow(), true);
assert.equal(shortcut.allow(), false);

now = 2001;
assert.equal(shortcut.allow(), true);

shortcut.reset();
assert.equal(shortcut.allow(), true);

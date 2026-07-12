import assert from "node:assert/strict";
import { buildUnifiedMenuOptions, parseUnifiedMenuAction } from "../../src/ui/menu-actions.ts";

assert.deepEqual(buildUnifiedMenuOptions(false), ["Status", "Voice Language", "Mute", "Close"]);
assert.deepEqual(buildUnifiedMenuOptions(true), ["Status", "Voice Language", "Unmute", "Close"]);
assert.equal(parseUnifiedMenuAction("Status", false), "status");
assert.equal(parseUnifiedMenuAction("Mute", false), "mute");
assert.equal(parseUnifiedMenuAction("Unmute", true), "unmute");
assert.equal(parseUnifiedMenuAction("Close", false), "close");

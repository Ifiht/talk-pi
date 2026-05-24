import assert from "node:assert/strict";
import { isPushToTalkPress } from "../../src/input/keyboard_listener";

assert.equal(isPushToTalkPress("ctrl+space", "ctrl+space"), true);

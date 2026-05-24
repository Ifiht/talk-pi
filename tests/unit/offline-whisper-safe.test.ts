import assert from "node:assert/strict";

const maybe = undefined as string | undefined;
assert.equal(String(maybe ?? "").trim(), "");

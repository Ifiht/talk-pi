import assert from "node:assert/strict";
import { resolveToolsRoot } from "../../src/tools.ts";
import { createToolPathFixture } from "./tools-test-utils.ts";

const failureFixture = createToolPathFixture({ localToolsAsFile: true });
assert.throws(
  () => resolveToolsRoot({ env: failureFixture.env, cwd: failureFixture.cwd }),
  /Unable to prepare local tools folder/,
);

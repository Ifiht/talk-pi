#!/bin/bash

for f in tests/unit/*.test.ts tests/integration/*.test.ts; do echo "== $f"; node "$f" || { echo "FAILED: $f"; break; }; done
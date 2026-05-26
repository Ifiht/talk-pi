import fs from "node:fs";
import path from "node:path";

function patch(file, replacements) {
  if (!fs.existsSync(file)) return;
  const current = fs.readFileSync(file, "utf8");
  let next = current;
  for (const [original, patched] of replacements) {
    next = next.replace(original, patched);
  }
  if (next !== current) {
    fs.writeFileSync(file, next);
    console.log(`patched ${file}`);
  }
}

const root = path.join(process.cwd(), "node_modules", "node-record-lpcm16-ts", "dist");
patch(path.join(root, "index.js"), [["import recorders from \"./recorders\";\n", "import recorders from \"./recorders/index.js\";\n"]]);
patch(path.join(root, "recorders", "index.js"), [
  ["import recRecorder from \"./rec\";\n", "import recRecorder from \"./rec.js\";\n"],
  ["import arecordRecorder from \"./arecord\";\n", "import arecordRecorder from \"./arecord.js\";\n"],
  ["import soxRecorder from \"./sox\";\n", "import soxRecorder from \"./sox.js\";\n"],
]);

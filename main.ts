// The GPS Swears It Was a Shortcut — make.fun bounty
// u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9
//
// Writes a single line of text (1-200 characters) to /output/entry.txt:
// the GPS's own excuse, in its own voice, for sending the driver down
// the wrong road. Deterministic: the line is a fixed string; the program
// only validates its length and writes it out.
//
// Run: node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

const LINE =
  "The satellite photo showed a road straight through that lake, and I trust a camera 400 miles up far more than your eyes, driver.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}

const outPath = join(OUTPUT_DIR, "entry.txt");
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(outPath, LINE, "utf8");
if (readFileSync(outPath, "utf8") !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${chars} chars to ${outPath}`);
console.log(LINE);

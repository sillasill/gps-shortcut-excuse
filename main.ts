// The GPS Swears It Was a Shortcut: the hand-in program (Node 22,
// standard library only). It writes the GPS's one-line excuse to
// /output/entry.txt. Outside the grader, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The program is deterministic: it writes one fixed string, so two runs
// write the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";

const TEXT = "That shortcut was my idea, and technically we did arrive, only three hours late and spiritually changed by the gravel road.";

// The gate only accepts 1 to 200 characters, so refuse loudly instead of
// writing an entry the judge would never see.
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${TEXT.length}`);
}
if (TEXT.trim().length === 0 || TEXT.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
if (TEXT !== TEXT.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
if (TEXT.includes('"')) {
  throw new Error("entry must carry no dialogue tags or quotation marks");
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(out, { recursive: true });
writeFileSync(`${out}/entry.txt`, TEXT, "utf8");

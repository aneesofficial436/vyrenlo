/**
 * Export LinkedIn PNGs from SVG. Run: node assets/brand/export-png.mjs
 * Requires: npm install sharp (dev, one-time in repo root)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = __dirname;

const exports = [
  { svg: "logo-vyrenlo.svg", png: "linkedin-logo-400.png", width: 400, height: 400 },
  { svg: "linkedin-company-cover.svg", png: "linkedin-company-cover.png", width: 1128, height: 191 },
  { svg: "linkedin-profile-cover.svg", png: "linkedin-profile-cover.png", width: 1584, height: 396 },
];

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("Install sharp first: npm install sharp");
  process.exit(1);
}

for (const job of exports) {
  const input = path.join(outDir, job.svg);
  const output = path.join(outDir, job.png);
  await sharp(input).resize(job.width, job.height).png().toFile(output);
  console.log("Wrote", job.png);
}

// Every pull request must describe itself in RELEASE_NOTES.md.
// Fails with an actionable message so an automated fix can read what to do.
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const base = process.argv[2];
if (!base) {
  console.error("usage: check-release-notes.mjs <base-sha>");
  process.exit(2);
}

const changed = execSync(`git diff --name-only ${base}...HEAD`, { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

const FILE = "RELEASE_NOTES.md";
const fail = (msg) => {
  console.error(`RELEASE NOTES CHECK FAILED\n\n${msg}\n\nChanged files in this PR:\n${changed.map((f) => `  - ${f}`).join("\n")}`);
  process.exit(1);
};

if (!changed.includes(FILE)) {
  fail(
    `${FILE} was not updated. Add a line to ${FILE} that starts with "- [forge] " and describes this change in one sentence, then commit and push.`
  );
}
if (!existsSync(FILE)) fail(`${FILE} is listed as changed but does not exist in the checkout.`);

const added = execSync(`git diff ${base}...HEAD -- ${FILE}`, { encoding: "utf8" })
  .split("\n")
  .filter((l) => l.startsWith("+") && !l.startsWith("+++"))
  .map((l) => l.slice(1));

if (!added.some((l) => /^- \[forge\] \S/.test(l))) {
  fail(
    `${FILE} changed, but no added line starts with "- [forge] ". Add exactly such a line describing this change, then commit and push.`
  );
}

console.log(`release notes ok: ${added.filter((l) => l.startsWith("- [forge] ")).length} new entr(y/ies)`);

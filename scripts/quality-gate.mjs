import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const scripts = pkg.scripts ?? {};
const candidates = ["lint", "typecheck", "type-check", "test", "build"];
const selected = candidates.filter(
  (name, index) => scripts[name] && candidates.indexOf(name) === index
);

if (selected.length === 0) {
  console.error("No configured DPM quality-gate scripts were found in package.json.");
  process.exit(1);
}

for (const name of selected) {
  console.log(`\n=== npm run ${name} ===`);
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(command, ["run", name], {
    stdio: "inherit",
    shell: false,
  });
  if (result.error) {
    console.error(`Unable to run ${name}:`, result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`Quality gate failed at: ${name}`);
    process.exit(result.status ?? 1);
  }
}

console.log("\nAll configured quality checks passed.");

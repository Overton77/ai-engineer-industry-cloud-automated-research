import { existsSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");
const sourceFlag = process.argv.find((value) => value.startsWith("--source="))?.slice("--source=".length);
const source = resolve(sourceFlag ?? process.env.AI_ENGINEER_DB_CONTRACT_PATH ?? resolve(ROOT, "..", "ai-engineer-db-contract"));
const packagePath = resolve(source, "package.json");
if (!existsSync(packagePath)) throw new Error(`Database contract package not found: ${packagePath}`);

const manifest = JSON.parse(readFileSync(packagePath, "utf8"));
if (manifest.name !== "@aiengineer/database-contract") {
  throw new Error(`Unexpected package at ${source}: ${manifest.name ?? "unnamed"}`);
}

const npmEntry = process.env.npm_execpath;
if (!npmEntry) throw new Error("Run this helper through npm run db:contract:vendor");

const temporaryDirectory = mkdtempSync(resolve(tmpdir(), "ai-engineer-db-contract-"));
const target = resolve(ROOT, "vendor", "database-contract.tgz");
const targetTemporary = `${target}.tmp`;
try {
  const packed = spawnSync(process.execPath, [npmEntry, "pack", source, "--json", "--pack-destination", temporaryDirectory], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (packed.status !== 0) throw new Error(packed.stderr || packed.stdout || "npm pack failed");
  const result = JSON.parse(packed.stdout);
  const filename = result[0]?.filename;
  if (!filename) throw new Error("npm pack did not return a package filename");

  writeFileSync(targetTemporary, readFileSync(resolve(temporaryDirectory, filename)));
  renameSync(targetTemporary, target);

  const installed = spawnSync(process.execPath, [npmEntry, "install", "--save-exact", "./vendor/database-contract.tgz", "--ignore-scripts", "--force"], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  if (installed.status !== 0) throw new Error(installed.stderr || installed.stdout || "npm install failed");
  process.stdout.write(`Vendored ${manifest.name}@${manifest.version} from ${source}.\n`);
} finally {
  rmSync(targetTemporary, { force: true });
  rmSync(temporaryDirectory, { recursive: true, force: true });
}

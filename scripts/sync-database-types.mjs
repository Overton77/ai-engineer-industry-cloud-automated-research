import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const OUTPUT = resolve(ROOT, "database.types.ts");
const CHECK_ONLY = process.argv.includes("--check");

function contractTypesPath() {
  if (process.env.AI_ENGINEER_DB_CONTRACT_PATH) {
    return resolve(process.env.AI_ENGINEER_DB_CONTRACT_PATH, "src", "database.generated.ts");
  }

  const entry = fileURLToPath(import.meta.resolve("@aiengineer/database-contract"));
  return resolve(dirname(entry), "database.generated.ts");
}

const source = contractTypesPath();
if (!existsSync(source)) throw new Error(`Database contract types not found: ${source}`);

const generated = readFileSync(source, "utf8").replaceAll("\r\n", "\n");
if (!generated.includes("export type Database =")) {
  throw new Error(`Refusing to copy an invalid generated contract: ${source}`);
}

if (CHECK_ONLY) {
  if (!existsSync(OUTPUT) || readFileSync(OUTPUT, "utf8").replaceAll("\r\n", "\n") !== generated) {
    process.stderr.write("database.types.ts is stale. Run npm run db:types.\n");
    process.exit(1);
  }
  process.stdout.write("database.types.ts matches @aiengineer/database-contract.\n");
  process.exit(0);
}

const temporary = `${OUTPUT}.tmp`;
try {
  writeFileSync(temporary, generated, "utf8");
  renameSync(temporary, OUTPUT);
} finally {
  rmSync(temporary, { force: true });
}

process.stdout.write(`Synchronized database.types.ts from ${source}.\n`);

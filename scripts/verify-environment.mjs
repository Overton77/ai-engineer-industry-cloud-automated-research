import { existsSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const envPath = process.env.AI_ENGINEER_ENV_FILE ?? resolve(".env");
if (existsSync(envPath) && typeof process.loadEnvFile === "function") process.loadEnvFile(envPath);

const requireSecrets = process.argv.includes("--require-secrets");
const failures = [];

const major = Number.parseInt(process.versions.node.split(".")[0], 10);
if (major < 24) {
  failures.push(`Node 24+ is required; found ${process.version}`);
} else {
  console.log(`ok node ${process.version}`);
}

for (const command of ["tvly", "firecrawl", "agent-browser"]) {
  const candidates = process.platform === "win32"
    ? spawnSync("where.exe", [command], { encoding: "utf8" }).stdout?.split(/\r?\n/).filter(Boolean) ?? []
    : [];
  const located = candidates.find((candidate) => candidate.toLowerCase().endsWith(".cmd")) ?? candidates[0];
  const executable = located ?? command;
  const powershellLiteral = executable.replaceAll("'", "''");
  const result = process.platform === "win32"
    ? spawnSync("powershell.exe", ["-NoLogo", "-NoProfile", "-NonInteractive", "-Command", `& '${powershellLiteral}' --version`], { encoding: "utf8" })
    : spawnSync(executable, ["--version"], { encoding: "utf8" });

  if (result.status !== 0) {
    failures.push(`${command} is unavailable or failed its version check`);
    continue;
  }

  const version = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  console.log(`ok ${command} ${version}`);
}

const requiredSkills = [
  "agent-browser",
  "ai-engineer-cloud-research",
  "firecrawl",
  "firecrawl-developer-index",
  "firecrawl-research-index",
  "tavily-cli",
  "tavily-research",
  "tavily-search"
];

let installedSkills = [];
try {
  installedSkills = readdirSync(".agents/skills", { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
} catch {
  failures.push(".agents/skills is missing");
}

for (const skill of requiredSkills) {
  if (!installedSkills.includes(skill)) {
    failures.push(`required skill is missing: ${skill}`);
  }
}

if (installedSkills.length > 0) {
  console.log(`ok ${installedSkills.length} project skills discovered`);
}

if (requireSecrets) {
  for (const name of ["TAVILY_API_KEY", "FIRECRAWL_API_KEY", "SUPABASE_URL"]) {
    if (!process.env[name]) {
      failures.push(`required runtime secret is missing: ${name}`);
    } else {
      console.log(`ok ${name} is set (value hidden)`);
    }
  }
  if (!process.env.POSTGRES_URL_NON_POOLING && !process.env.POSTGRES_URL) {
    failures.push("required runtime secret is missing: POSTGRES_URL_NON_POOLING or POSTGRES_URL");
  } else {
    console.log("ok Postgres connection is set (value hidden)");
  }
  if (!process.env.SUPABASE_SECRET_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    failures.push("required runtime secret is missing: SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY");
  } else {
    console.log("ok Supabase server key is set (value hidden)");
  }
}

if (failures.length > 0) {
  console.error("\nEnvironment verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nEnvironment verification passed.");

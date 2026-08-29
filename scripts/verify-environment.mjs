import { existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const requireSecrets = process.argv.includes("--require-secrets");
const failures = [];

const major = Number.parseInt(process.versions.node.split(".")[0], 10);
if (major < 24) {
  failures.push(`Node 24+ is required; found ${process.version}`);
} else {
  console.log(`ok node ${process.version}`);
}

const commands = [
  ["tvly", ["--version"]],
  ["firecrawl", ["--version"]],
  ["agent-browser", ["--version"]],
  ["jq", ["--version"]],
  ["rg", ["--version"]],
  ["python3", ["--version"]],
  ["git", ["--version"]],
  ["curl", ["--version"]],
  ["ffmpeg", ["-version"]],
  ["pdftotext", ["-v"]],
  ["psql", ["--version"]]
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    shell: process.platform === "win32"
  });

  if (result.status !== 0 && result.status !== null) {
    // pdftotext -v writes to stderr and may use a non-zero exit on some builds
    const combined = `${result.stdout ?? ""}${result.stderr ?? ""}`;
    if (command === "pdftotext" && /pdftotext/i.test(combined)) {
      console.log(`ok ${command} ${combined.trim().split("\n")[0]}`);
      continue;
    }
    failures.push(`${command} is unavailable or failed its version check`);
    continue;
  }

  const version = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim().split("\n")[0];
  console.log(`ok ${command} ${version}`);
}

let lockSkills = [];
try {
  const lock = JSON.parse(readFileSync("skills-lock.json", "utf8"));
  lockSkills = Object.keys(lock.skills ?? {}).sort();
} catch {
  failures.push("skills-lock.json is missing or invalid");
}

const requiredSkills = lockSkills.length > 0
  ? lockSkills
  : [
      "agent-browser",
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
    .map((entry) => entry.name)
    .sort();
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

for (const dir of ["artifacts", ".firecrawl", "artifacts/smoke", "artifacts/validation"]) {
  mkdirSync(dir, { recursive: true });
  if (!existsSync(dir)) {
    failures.push(`could not create ${dir}`);
  }
}
console.log("ok artifact directories ready");

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
  if (process.env.CONTEXT7_API_KEY) {
    console.log("ok CONTEXT7_API_KEY is set (value hidden)");
  } else {
    console.log("note CONTEXT7_API_KEY is unset; Context7 MCP may hit the monthly free quota");
  }
}

if (failures.length > 0) {
  console.error("\nEnvironment verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nEnvironment verification passed.");

import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const requireSecrets = process.argv.includes("--require-secrets");
const failures = [];

const major = Number.parseInt(process.versions.node.split(".")[0], 10);
if (major < 24) {
  failures.push(`Node 24+ is required; found ${process.version}`);
} else {
  console.log(`ok node ${process.version}`);
}

for (const command of ["tvly", "firecrawl", "agent-browser", "gh"]) {
  const result = spawnSync(command, ["--version"], {
    encoding: "utf8",
    shell: process.platform === "win32"
  });

  if (result.status !== 0) {
    failures.push(`${command} is unavailable or failed its version check`);
    continue;
  }

  const version = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim().split("\n")[0];
  console.log(`ok ${command} ${version}`);
}

const requiredSkills = [
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

const requiredSecrets = ["TAVILY_API_KEY", "FIRECRAWL_API_KEY"];
const optionalSecrets = ["CONTEXT7_API_KEY", "GITHUB_PERSONAL_ACCESS_TOKEN"];

for (const name of requiredSecrets) {
  if (process.env[name]) {
    console.log(`ok ${name} is set (value hidden)`);
  } else if (requireSecrets) {
    failures.push(`required runtime secret is missing: ${name}`);
  } else {
    console.log(`warn ${name} is unset (keyless / unauthenticated mode only)`);
  }
}

for (const name of optionalSecrets) {
  if (process.env[name]) {
    console.log(`ok ${name} is set (value hidden)`);
  } else {
    console.log(`warn optional ${name} is unset`);
  }
}

if (failures.length > 0) {
  console.error("\nEnvironment verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nEnvironment verification passed.");

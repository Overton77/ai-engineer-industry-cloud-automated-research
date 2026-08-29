# AI Engineer Industry Cloud Automated Research

Portable Cursor Cloud Agent environment for current research on AI organizations, engineers, technologies, developer tools, repositories, libraries, and papers.

## Included tooling

- Node.js 24
- Tavily CLI 0.1.6 and the complete official Tavily skill suite
- Firecrawl CLI 1.23.3 and the complete official Firecrawl CLI skill suite
- Vercel Labs Agent Browser 0.35.1 and its project skill
- `jq`, `ripgrep`, Git, curl, and Python 3

All skill sources are copied into `.agents/skills` and pinned by `skills-lock.json`. Cursor's cloud environment is defined in `.cursor/environment.json` and `.cursor/Dockerfile`.

## Cursor Cloud setup

1. Push this repository's default branch to GitHub.
2. In Cursor, create or update a Cloud Agent environment for this repository.
3. Let Cursor use the committed `.cursor/environment.json` configuration and wait for its Build to pass.
4. In Secrets, add `TAVILY_API_KEY`, `FIRECRAWL_API_KEY`, `POSTGRES_URL_NON_POOLING`, `SUPABASE_URL`, and `SUPABASE_SECRET_KEY`.
5. Configure the GitHub and Context7 MCP servers separately. If their definitions reference environment variables, add those variables as secrets too (commonly `GITHUB_PERSONAL_ACCESS_TOKEN` and `CONTEXT7_API_KEY`).
6. Start a Cloud Agent and ask it to run `npm run verify:environment`.

## One-video research automation

The project skill `.agents/skills/ai-engineer-cloud-research` routes the workflow. Its CLI provides live schema snapshots, date-ordered video loading, shared database leases and progress events, private-bucket intent storage, validation, and approved deterministic execution.

```bash
npm run verify:research
npm run research:cloud -- videos list --order=asc --limit=20
npm run research:cloud -- video get --video-id=<youtube-id>
npm run research:cloud -- progress seed --video-id=<youtube-id>
# Review, then repeat the seed command with --apply.
```

See `schema-workspace/index.md` and `schema-workspace/READINESS_AUDIT.md`. Mutating commands require `--apply`; intent execution also requires database approval state `approved` or `budgeted`.

## Database contract and schema workspace

Cursor Cloud installs a vendored, pinned snapshot of `@aiengineer/database-contract`. The package remains the canonical owner of migrations and Supabase-generated types; `database.types.ts` is an exact synchronized copy for tools that expect the conventional filename at the application root.

```bash
npm run db:types
npm run db:types:check
npm run schema:workspace
```

`schema:workspace` introspects live Postgres and creates a search-first hierarchy under `schema-workspace/schemas/<schema>/`. Each table or view has its own Markdown file with columns, constraints, relationships, indexes, and RLS policies. Each schema also has a structured `schema.json`, function and enum inventories, while `schema-workspace/search-index.json` provides a compact global lookup index.

When the canonical DB contract changes, rebuild the cloud package and projections with:

```bash
npm run db:contract:vendor
npm run schema:refresh
```

The vendor command defaults to the sibling `ai-engineer-db-contract` checkout. Use `AI_ENGINEER_DB_CONTRACT_PATH` or `--source=/absolute/path` when it lives elsewhere. It writes the stable `vendor/database-contract.tgz`, refreshes the lockfile/install, and never requires the sibling checkout inside Cursor Cloud.

The Build verification intentionally checks binaries and skill files without requiring API keys. Runtime API access is checked separately with `npm run verify:secrets`.

## First authenticated proof

After the two API keys are available to the Cloud Agent, run:

```bash
npm run test:smoke
```

This performs one small Tavily search, one small Firecrawl search, and one headless browser navigation/screenshot. Outputs are written only to gitignored directories.

## Local skill maintenance

Discover or update project skills with the Skills CLI:

```bash
npx skills find "research tool"
npx skills check
```

Review skill changes before committing them because skills execute with the agent's permissions.

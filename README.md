# AI Engineer Industry Cloud Automated Research

Portable Cursor Cloud Agent environment for current research on AI organizations, engineers, technologies, developer tools, repositories, libraries, and papers.

## Included tooling

- Node.js 24
- Tavily CLI 0.1.6 and the complete official Tavily skill suite
- Firecrawl CLI 1.23.3 and the complete official Firecrawl CLI skill suite
- Vercel Labs Agent Browser 0.35.1 and its project skill
- `jq`, `ripgrep`, Git, curl, Python 3, `ffmpeg`, `poppler-utils`, `postgresql-client` (`psql`), and `unzip`

All skill sources are copied into `.agents/skills` and pinned by `skills-lock.json`. Cursor's cloud environment is defined in `.cursor/environment.json` and `.cursor/Dockerfile`. The environment is named **AI Engineer Industry Research**.

`install` only verifies binaries and skill files. Do not add `npm ci`; this repository has no lockfile and no npm dependencies. `start` creates the gitignored `artifacts/` and `.firecrawl/` directories. Port `4848` is reserved for the Agent Browser dashboard.

## Cursor Cloud setup

1. Push this repository's default branch to GitHub.
2. In Cursor, create or update a Cloud Agent environment for this repository.
3. Let Cursor use the committed `.cursor/environment.json` configuration and wait for its Build to pass.
4. In the environment's Secrets settings, add `TAVILY_API_KEY`, `FIRECRAWL_API_KEY`, `SUPABASE_URL`, `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY`, and `POSTGRES_URL_NON_POOLING`.
5. Configure Context7 and cursor-cloud MCP servers if you use them. A Google Drive MCP is **not** the catalog surface — query Supabase tables instead.
6. Start a Cloud Agent and ask it to run `npm run verify:environment` and `npm run verify:secrets`.

The Build verification intentionally checks binaries and skill files without requiring API keys. Runtime API access, including Supabase, is checked separately with `npm run verify:secrets`.

Starter and pre-research tables, the first research video, and subagent routing are documented in `AGENTS.md`.

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

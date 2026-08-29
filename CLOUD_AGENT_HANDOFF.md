# Cursor Cloud research handoff

Status date: 2026-08-29  
Repository: `ai-engineer-industry-cloud-automated-research`  
Canonical database contract: sibling repository `ai-engineer-db-contract`  
Live artifact bucket: private `ai-engineer-cloud-bucket`

## Purpose of this handoff

This file is the continuation point for a new agent session and the operating guide for the first Cursor Cloud Agent tests. It distinguishes what is implemented now from the additional operator surfaces required before unattended automation is safe.

Do not rebuild the schema contract, agent skill, or workspace from scratch. Inspect and extend the existing implementation.

## Executive state

The codebase currently provides:

- a reproducible Node 24 Cursor environment with pinned Tavily, Firecrawl, and Agent Browser CLIs;
- a vendored `@aiengineer/database-contract` package that installs without a sibling checkout;
- a conventional `database.types.ts` synchronized byte-for-byte from the contract package;
- a live, deterministic, search-first schema workspace covering 216 relations in nine application schemas;
- a one-video research CLI for readiness checks, starter-video inspection, mission seeding, work leases, heartbeats, completion events, and deterministic ingestion intents;
- a reusable `ai-engineer-cloud-research` skill and six Cursor subagent definitions;
- Postgres-backed shared progress and a private content-addressed storage boundary;
- explicit review and approval boundaries before canonical ingestion.

No automation has been configured. No Git commit was created by the implementation sessions.

## Hard gates before the first cloud test

1. Review the dirty working trees in both repositories.
2. Commit and push the intended changes. A Cursor Cloud Agent only sees the pushed repository state, not this local working directory.
3. Preserve `scripts/check-neo4j-aura.mjs` and its related package changes as pre-existing user work; do not casually discard or attribute them to the research implementation.
4. Configure the required Cursor Secrets listed below.
5. Ensure the Cloud Agent performs `npm ci` before invoking repository scripts.

The current `.cursor/environment.json` install hook is:

```json
{
  "install": "npm run verify:environment"
}
```

That verifies the global CLIs and skill inventory but does not explicitly install local npm dependencies. For the first test, tell the agent to run `npm ci`. A future change may set the install hook to `npm ci && npm run verify:environment` after confirming Cursor does not already install dependencies elsewhere in its environment lifecycle.

## Required secrets

Configure these in Cursor Secrets, never in committed files:

| Secret | Purpose |
| --- | --- |
| `TAVILY_API_KEY` | Discovery and synthesis through `tvly` |
| `FIRECRAWL_API_KEY` | Source search and extraction |
| `POSTGRES_URL_NON_POOLING` | Direct server-side Postgres orchestration and metadata access |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SECRET_KEY` | Server-only access to the private storage bucket |
| `POSTGRES_SSL_ROOT_CERT` | Preferred CA pin for direct Postgres TLS |

`POSTGRES_URL` and legacy `SUPABASE_SERVICE_ROLE_KEY` are supported fallbacks. Do not use `POSTGRES_SSL_MODE=no-verify` in the production cloud environment; it was used only for a known local certificate-chain limitation during development.

Optional integrations are documented in `.env.example`, including Neo4j, GitHub, and Context7.

## What happens when a Cloud Agent starts

### 1. Environment build

Cursor builds `.cursor/Dockerfile` from `node:24-bookworm`. The image installs:

- Git, curl, jq, Python, ripgrep, and supporting utilities;
- `agent-browser@0.35.1` and its browser dependencies;
- `firecrawl-cli@1.23.3`;
- `tavily-cli==0.1.6`.

The global tool versions are pinned in the Dockerfile. Local Node packages are pinned in `package-lock.json`.

### 2. Repository checkout and dependency installation

After checkout, run:

```bash
npm ci
npm run verify:environment
```

`npm ci` installs `vendor/database-contract.tgz` as `@aiengineer/database-contract`. The cloud checkout does not need the sibling DB repository.

### 3. Instruction and skill discovery

The agent should read `AGENTS.md`, then load `.agents/skills/ai-engineer-cloud-research/SKILL.md` for research work. The skill routes additional detail through focused references rather than loading the whole database contract.

The six `.cursor/agents/*.md` definitions are roles, not autonomous background processes. They do not all start automatically. The `research-coordinator` must delegate bounded tasks when Cursor supports subagent delegation, or perform the same roles sequentially in a single run.

### 4. Authenticated readiness

Run:

```bash
npm run verify:secrets
npm run verify:research
npm run typecheck
npm run db:types:check
npm run schema:workspace:check
```

Expected behavior:

- secrets are reported only as present or missing, never printed;
- the live progress ledger, case-study contract, metric targets, and provenance columns are present;
- `ai-engineer-cloud-bucket` exists and remains private;
- the cloud type file matches the installed database-contract package;
- the committed schema workspace matches live structural metadata.

`schema:workspace:check` requires live Postgres credentials. It rewrites the deterministic generated projection and exits nonzero if the pre-run workspace was stale.

### 5. Schema drill-down

The agent begins at `schema-workspace/index.md`, selects one of the nine schema folders, and then opens only the relevant relation files.

Useful paths:

- `schema-workspace/search-index.json`: compact global relation/column lookup;
- `schema-workspace/schemas/<schema>/README.md`: schema inventory;
- `schema-workspace/schemas/<schema>/schema.json`: structured schema metadata;
- `schema-workspace/schemas/<schema>/tables/<table>.md`: one table with columns, constraints, relationships, indexes, and policies;
- `database.types.ts`: exact Supabase row, insert, update, enum, view, and function types.

Every relation page includes its direct TypeScript access path, for example:

```ts
Database["ranking"]["Tables"]["metric_observation"]["Row"]
```

### 6. Video selection and pre-research inspection

List videos without mutating state:

```bash
npm run research:cloud -- videos list --order=asc --limit=20
npm run research:cloud -- video get --video-id=<youtube-id>
```

The video detail includes starter-video metadata, pre-research runs and analyses, extracted entity candidates, organization candidates, source records, and registered pre-research artifacts.

Select exactly one video per mission. Use ascending publication order when validating the rolling timeline workflow.

### 7. Shared mission creation

Preview mission creation first:

```bash
npm run research:cloud -- progress seed --video-id=<youtube-id>
```

After explicit authorization, create it:

```bash
npm run research:cloud -- progress seed --video-id=<youtube-id> --actor=<operator-id> --apply
```

The mission slug and work-item idempotency keys make repeated seeding safe. The graph contains eleven dependency-aware stages:

1. select entities;
2. discover sources;
3. capture sources;
4. extract claims;
5. resolve identity;
6. probe metrics;
7. verify extraction;
8. build ingestion intent;
9. execute approved ingestion intent;
10. synthesize report;
11. update timeline.

Database state is the progress truth. Chat history and local notes are not authoritative progress state.

### 8. Work claiming and leases

A worker claims one ready item:

```bash
npm run research:cloud -- progress claim --worker=<stable-worker-id> --lease-seconds=1800 --apply
```

The claim transaction uses row locking with `SKIP LOCKED`, dependency checks, expiring leases, attempt records, and append-only work-item events. Concurrent workers should not receive the same active item.

Long work must heartbeat before expiry:

```bash
npm run research:cloud -- progress heartbeat \
  --worker=<stable-worker-id> \
  --work-item=<uuid> \
  --attempt=<uuid> \
  --lease-seconds=1800 \
  --apply
```

Finish with a structured JSON payload file:

```bash
npm run research:cloud -- progress finish \
  --worker=<stable-worker-id> \
  --work-item=<uuid> \
  --attempt=<uuid> \
  --outcome=succeeded \
  --payload-file=<path-to-json> \
  --apply
```

Use a stable worker ID such as `cursor-cloud:one-shot-01:entity-selector`. Never edit another worker's lease.

### 9. Evidence and metric behavior

Search tools are discovery mechanisms. A search-result snippet is not evidence. The underlying fetched source must be captured and attributed.

Required evidence behavior:

- store raw provider responses before synthesis;
- keep the immutable byte hash and storage pointer;
- attach locators to extracted claims and metrics;
- separate source publication time, event time, observation time, and retrieval time;
- preserve provider identifiers and refuse ambiguous entity merges;
- record missing metrics as null with an explicit reason, never zero;
- require an independent verifier attempt for claims marked independently verified.

Metric observations preserve entity target, definition version, observed and collected times, measurement kind, dimensions, estimate status, visibility, access tier, raw capture, collector/source-policy versions, quality flags, provenance, and unavailable reason.

### 10. Deterministic canonical writes

Research agents do not write canonical rows directly. They build an intent matching `contracts/ingestion-intent.schema.json`.

Validate locally:

```bash
npm run research:cloud -- intent validate --file=<intent.json>
```

Preview private-bucket submission:

```bash
npm run research:cloud -- intent submit --file=<intent.json>
```

Submit only after review:

```bash
npm run research:cloud -- intent submit --file=<intent.json> --apply
```

Submission canonicalizes the JSON, hashes it, stores it at a content-addressed path in the private bucket, and registers the operation intent and artifact.

Execution is a separate authority boundary:

```bash
npm run research:cloud -- intent execute --intent-id=<uuid> --apply
```

The intent must already have database approval state `approved` or `budgeted`. The executor performs only parameterized insert/upsert operations against its explicit table allowlist. It accepts no delete and no arbitrary SQL. It inserts an immutable receipt in the same transaction and is idempotent if a receipt already exists.

## What is safe to test now

### Test 0: build-only, no credentials

Copy this prompt into a fresh Cloud Agent:

> Read `AGENTS.md` and `CLOUD_AGENT_HANDOFF.md`. Run `npm ci`, `npm run verify:environment`, `npm run typecheck`, and `npm run db:types:check`. Do not use authenticated services, mutate the database, upload anything, or edit files. Report each command's exit status, installed database-contract version, and any blocker.

Success means the container, pinned CLIs, vendored package, generated types, and TypeScript contract all validate without secrets.

### Test 1: authenticated read-only readiness

> Read `AGENTS.md`, `CLOUD_AGENT_HANDOFF.md`, and the `ai-engineer-cloud-research` skill. Run `npm ci`, then `verify:environment`, `verify:secrets`, `verify:research`, `typecheck`, `db:types:check`, and `schema:workspace:check`. List the first five starter videos in ascending publication order and inspect the oldest video's existing pre-research. Do not use `--apply`, do not call the external research APIs, do not upload artifacts, and do not modify canonical or orchestration state. Return a concise readiness report with the selected video ID and the exact schema files you consulted.

Success means live database and storage access work, schema drift is absent, and the agent navigates the drill-down workspace rather than reading the entire generated type file.

### Test 2: mission dry run

> Using the same oldest starter video, inspect its pre-research and run a dry-run `progress seed`. Do not use `--apply`. Explain the eleven work items, their dependency order, the deterministic mission slug, and which entity-selection fields will be needed. Cite the exact schema relation files used. Do not perform web research yet.

Success means the agent understands the work graph and produces no database mutation.

### Test 3: authorized mission seed

This prompt intentionally authorizes orchestration writes but not canonical data writes:

> Seed the reviewed mission for video `<youtube-id>` using actor `cursor-cloud:one-shot-01` and `--apply`. Then stop. Do not claim a work item, call web APIs, upload artifacts, submit an intent, or write canonical data. Report the returned mission ID and all work-item IDs. If the mission already exists, demonstrate the idempotent result rather than creating a duplicate.

Success means one mission and eleven idempotent work items exist with created events.

### Test 4: one bounded entity-selection attempt

This is the first meaningful agent behavior test:

> Act as `entity-selector` for exactly one ready work item in mission `ai-engineer-video:<youtube-id>`. Use worker ID `cursor-cloud:one-shot-01:entity-selector`. Claim one item with `--apply`, inspect existing pre-research, and perform only the minimal source discovery required to rank entity candidates. Preserve raw outputs and source URLs. Do not write canonical rows, submit or execute an ingestion intent, or claim a second item. Heartbeat if necessary, finish the attempt with a structured payload, and report the work-item event trail and artifacts created.

Success means exactly one item is claimed and terminal, the lease is respected, candidates remain staged/proposed, and every factual statement has an underlying source.

### Test 5: verification separation

Run this in a different agent session or worker identity:

> Act as `evidence-verifier` for mission `ai-engineer-video:<youtube-id>`. Do not verify any extraction produced by this worker identity. Claim at most one ready verification item, recompute capture hashes and locators, check identity and metric semantics, and fail closed on ambiguity. Do not execute an ingestion intent. Finish with a structured verification payload and list each accepted or rejected claim with its reason.

Success means verifier independence is real, not asserted by the original extractor.

### Test 6: intent construction without execution

> Act as `intent-builder` for the verified results of mission `ai-engineer-video:<youtube-id>`. Build a deterministic intent with a stable idempotency key, explicit preconditions, allowlisted insert/upsert operations, and `$ref` links. Validate it and show the dry-run submission plan. Do not submit with `--apply`, approve it, or execute it.

Success means the intent validates and repeated validation yields the same canonical hash.

### Test 7: separately authorized submission and execution

Do not combine this with research or verification prompts. Review the intent manually first.

Submission prompt:

> Submit reviewed intent `<path>` with `--apply`. Do not alter its approval state and do not execute it. Report its intent ID, private bucket path, canonical SHA-256, and artifact ID.

Execution prompt, only after an authorized operator approves the intent in the database:

> Execute approved intent `<intent-id>` once with `--apply`. Do no other research or database work. Report the immutable receipt and affected references. Run the same execution command a second time only to verify idempotent receipt reuse, then stop.

## What is not yet ready for unattended automation

Do not turn on broad recurring automation until these gaps are addressed or deliberately accepted:

1. The CLI has no read-only `progress status/list` command for missions, work items, attempts, leases, and events. Operators currently need direct SQL or additional tooling for a consolidated view.
2. The CLI has no approval command. This is a useful separation-of-authority property, but an explicit operator workflow must be chosen.
3. Generic source/report artifact upload and registration is not exposed as a standalone CLI command. Intent JSON upload is implemented; broader artifact ergonomics remain a next step.
4. No automation scheduler or recurring task is configured in this repository.
5. The current direct database secret may be more privileged than an unattended researcher needs. Before automation, prefer distinct least-privilege database identities for researcher, verifier, and executor roles.
6. The Cursor install hook should explicitly include `npm ci` if platform testing confirms dependencies are not installed automatically.
7. Working tree changes must be committed and pushed before any cloud test can observe them.

## Recommended automation rollout

### Phase A: observe only

- Run readiness checks and list candidate videos.
- Do not seed, claim, upload, or submit.
- Alert on schema/type drift or unavailable services.

### Phase B: one work item per run

- Seed only explicitly selected videos.
- Give every automation a stable worker ID.
- Claim at most one ready item per run.
- Heartbeat and always record a terminal outcome.
- Stop on ambiguity, failed verification, expired authority, or budget limits.

### Phase C: propose intents

- Allow research and verifier automations to produce artifacts and proposed intents.
- Keep approval and execution outside those automations.
- Require stable hashes and idempotency keys across retries.

### Phase D: isolated executor

- Use a separate executor identity and automation.
- Process only already-approved intents.
- Execute one intent per run.
- Treat an existing receipt as success.
- Never broaden the executor allowlist through prompt instructions.

The safest initial recurring design is two automations: a bounded researcher/verifier that cannot execute canonical writes, and a separate executor that cannot conduct research and only consumes approved intents.

## Operational invariants

- One video per mission.
- One claimed work item per worker unless the prompt explicitly allows another.
- Postgres is the shared progress truth.
- Leases expire and are never edited by another worker.
- Raw captures precede interpretation.
- Search scores are not evidence.
- Missing metrics remain missing.
- Identity ambiguity stops promotion.
- Verification must be independent.
- Canonical writes require a deterministic intent, approval, execution, and immutable receipt.
- The storage bucket remains private.
- Secrets are never printed, persisted, or committed.

## Generated contract maintenance

The DB contract package is vendored so Cloud Agents can consume it without the sibling repository.

From a local checkout containing both repositories:

```bash
npm run db:contract:vendor
npm run schema:refresh
npm run typecheck
npm run db:types:check
npm run schema:workspace:check
```

`db:contract:vendor` defaults to `../ai-engineer-db-contract`. Override it with `AI_ENGINEER_DB_CONTRACT_PATH` or `--source=/absolute/path`. Do not run it casually inside Cursor Cloud: the canonical source checkout is normally absent there.

The canonical DB repository generates types using its pinned Supabase CLI:

```bash
cd ../ai-engineer-db-contract
npm run types:generate
npm run types:check
npm run typecheck
```

Commit migrations and regenerated contract types together. Then refresh the cloud vendor artifact and projections.

## Important files

| File | Responsibility |
| --- | --- |
| `AGENTS.md` | Cloud-wide behavior and tool policy |
| `.cursor/Dockerfile` | Reproducible global research tools |
| `.cursor/environment.json` | Cursor build/install hook |
| `.agents/skills/ai-engineer-cloud-research/SKILL.md` | Research workflow router and invariants |
| `.cursor/agents/*.md` | Coordinator and bounded specialist roles |
| `scripts/research-cloud.mjs` | Readiness, video, progress, and intent CLI |
| `scripts/build-schema-workspace.mjs` | Deterministic live schema projection |
| `scripts/sync-database-types.mjs` | Contract-to-cloud type synchronization |
| `scripts/vendor-database-contract.mjs` | Self-contained contract package refresh |
| `contracts/ingestion-intent.schema.json` | Deterministic write-intent contract |
| `database.types.ts` | Conventional exact Supabase types |
| `schema-workspace/index.md` | Schema drill-down entry point |
| `schema-workspace/READINESS_AUDIT.md` | Database capability and risk audit |
| `vendor/database-contract.tgz` | Pinned contract package installed by `npm ci` |

## Validation already completed locally

- clean `npm ci` from the vendored contract package;
- environment verifier;
- authenticated database and private bucket readiness;
- DB-contract generated-type drift check;
- cloud type parity and TypeScript compilation;
- deterministic schema generation and repeated drift check;
- 216 unique search-index entries with zero missing paths;
- all nine requested application schemas and 255 generated workspace files;
- one local mission seed/claim/heartbeat/finish lifecycle;
- one local deterministic intent execution and receipt;
- live dry-run video and progress inspection;
- zero npm audit vulnerabilities at validation time;
- skill validation and Git whitespace checks.

The local lifecycle and executor proofs used test/local state where appropriate. Do not infer authorization to repeat a mutating proof against production.

## Continuation prompt for another development agent

Use this prompt in the next coding session:

> Read `CLOUD_AGENT_HANDOFF.md`, `AGENTS.md`, and the current Git status before acting. Preserve existing user changes and do not redo completed schema, type, skill, or workspace work. First verify `npm ci`, type parity, schema-workspace determinism, and live readiness. Then implement the next pre-automation operator surfaces identified in the handoff: a read-only mission/progress status command, a generic content-addressed artifact registration command, and a clearly separated approval workflow proposal. Do not change live schema, approval state, canonical data, or automation schedules without explicit authorization. Add focused tests and update this handoff with verified behavior.

## Final handoff checklist

- [ ] Review cloud-repository diff.
- [ ] Review DB-contract diff and applied live migrations.
- [ ] Commit and push both intended change sets.
- [ ] Configure required Cursor Secrets.
- [ ] Confirm whether the environment install hook needs `npm ci` added.
- [ ] Run Test 0 in a fresh Cloud Agent.
- [ ] Run Test 1 with authenticated read-only access.
- [ ] Choose one video and run Tests 2–6 incrementally.
- [ ] Approve and run Test 7 only after manual review.
- [ ] Implement or accept the listed automation gaps.
- [ ] Start automation at Phase A, not Phase D.

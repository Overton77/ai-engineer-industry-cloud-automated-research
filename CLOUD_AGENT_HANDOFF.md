# Cursor Cloud research handoff

Status date: 2026-08-29  
Repository: `ai-engineer-industry-cloud-automated-research`  
Canonical database contract: sibling repository `ai-engineer-db-contract`  
Live artifact bucket: private `ai-engineer-cloud-bucket`

## Purpose of this handoff

This file is the continuation point for a new agent session and the operating guide for the first Cursor Cloud Agent tests. It distinguishes what is implemented now from the additional operator surfaces required before unattended automation is safe.

Do not rebuild the schema contract, agent skill, or workspace from scratch. Inspect and extend the existing implementation.

The explicit environment goals, three purpose-specific research intents, selected low-cost first video, and copy/paste prompt for the first real run are in `FIRST_CLOUD_RUN_PROMPT.md`.

The supervised two-agent launch checklist, run-scoped materialization contract, and copy/paste prompts for a video-directed researcher plus an autonomous popular-media researcher are in `CLOUD_AGENT_LAUNCH_KIT.md`.

## Executive state

The codebase currently provides:

- a reproducible Node 24 Cursor environment with pinned Tavily, Firecrawl, and Agent Browser CLIs;
- a vendored `@aiengineer/database-contract` package that installs without a sibling checkout;
- a conventional `database.types.ts` synchronized byte-for-byte from the contract package;
- a live, deterministic, search-first schema workspace covering 239 relations in nine application schemas;
- a one-video research CLI for readiness checks, starter-video inspection, mission seeding, work leases, heartbeats, completion events, and deterministic ingestion intents;
- reusable `ai-engineer-cloud-research` and `claim-evidence-workflow` skills plus eight Cursor subagent definitions, including source-intelligence and claim-evidence specialist roles;
- mission-scoped, parallel-safe Postgres claiming plus read-only mission status;
- current, read-only video prioritization plus mandatory pre-mission entity grounding across latest pre-research, related missions, and canonical people/organizations;
- authenticated transcript retrieval from private `ai-engineer-transcripts/ai-dot-engineer/<video-id>.txt` objects;
- an operational source ledger for exact queries, retrieval/cache outcomes, immutable captures, and why each source mattered;
- attempt-scoped, content-addressed workspace archival into the private `ai-engineer-cloud-bucket`, with two-phase verified cleanup;
- explicit review and approval boundaries before canonical ingestion.

No automation has been configured. No Git commit was created by the implementation sessions.

## Hard gates before the first cloud test

1. Review the dirty working trees in both repositories.
2. Commit and push the intended changes. A Cursor Cloud Agent only sees the pushed repository state, not this local working directory.
3. Preserve `scripts/check-neo4j-aura.mjs` and its related package changes as pre-existing user work; do not casually discard or attribute them to the research implementation.
4. Configure the required Cursor Secrets listed below.
5. Ensure the Cloud Agent performs `npm ci` before invoking repository scripts.

The `.cursor/environment.json` install hook is:

```json
{
  "install": "npm ci && npm run verify:environment"
}
```

The hook installs the exact lockfile before verifying the global CLIs and skill inventory. The first-run prompt still repeats readiness checks so failures are visible in the task transcript.

## Required secrets

Configure these in Cursor Secrets, never in committed files:

| Secret | Purpose |
| --- | --- |
| `TAVILY_API_KEY` | Discovery and synthesis through `tvly` |
| `FIRECRAWL_API_KEY` | Source search and extraction |
| `POSTGRES_URL_NON_POOLING` | Direct server-side Postgres orchestration and metadata access |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SECRET_KEY` | Server-only access to the private storage bucket |

`POSTGRES_URL` and legacy `SUPABASE_SERVICE_ROLE_KEY` are supported fallbacks. Do not use `POSTGRES_SSL_MODE=no-verify` in the production cloud environment; it was used only for a known local certificate-chain limitation during development.

Recommended TLS hardening: add `POSTGRES_SSL_ROOT_CERT` when the connection string/provider chain does not already verify cleanly, preserving certificate newlines as `\\n`. Prefer `sslmode=verify-full` semantics. This is not an additional API credential.

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

The eight `.cursor/agents/*.md` definitions are roles, not autonomous background processes. They do not all start automatically. The `research-coordinator` may delegate bounded tasks when Cursor supports subagent delegation, or perform the same roles sequentially in a single run. Claim extraction and verification for the same claim must use different agent deployments.

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
- the scoped entity taxonomy, product hierarchy, organization/product graph, model/protocol lineage, and benchmark/case-study joins are present;
- claim producer provenance, exact locator hashes, typed product-version claims, immutable attempt/verifier identity and links/findings, append-only run-scoped evidence assessments, and the direct same-run verified-status gate are enforced by Postgres;
- both `ai-engineer-cloud-bucket` and `ai-engineer-transcripts` exist and remain private;
- the source-query, retrieval, and operational-support ledgers exist;
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

When the operator does not provide a video, use the balanced workspace policy:

```bash
npm run research:cloud -- videos prioritize --strategy=balanced --limit=20
```

When popular media should be a stronger discovery signal, use the still-readiness-gated strategy and persist its exact current-state packet:

```bash
npm run research:cloud -- videos prioritize --strategy=popular-media --limit=20 \
  --output=artifacts/runs/<run-id>/inputs/video-candidates.json
```

The ranking hard-gates readiness, favors oldest-first chronology and cross-video entity continuity, then uses pre-research ambiguity, log-scaled views, engagement, and duration as secondary signals. Alternate chronology and entity-cluster queries are documented in `video-workspace/README.md`.

For a first bounded test, select an eligible, completed pre-research video that has no mission:

```bash
npm run research:cloud -- videos list --order=asc --limit=20 \
  --eligible --pre-research-complete --without-mission
```

Before web research or mission seeding, persist and inspect current entity context:

```bash
npm run research:cloud -- mission preflight \
  --video-id=<youtube-id> \
  --output=artifacts/runs/<run-id>/inputs/pre-mission-context.json
```

This retrieves the latest candidates, exact same-kind/name occurrences in other latest pre-research packets, related mission state, and exact canonical person/organization matches. It does not promote an identity. `progress seed` repeats and returns the same query as an enforced pre-mutation gate.

Retrieve the private transcript only when useful:

```bash
npm run research:cloud -- transcript get \
  --video-id=<youtube-id> \
  --output=artifacts/runs/<run-id>/inputs/transcript.txt
```

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

A worker first inspects, then claims one ready item inside exactly one mission:

```bash
npm run research:cloud -- progress status --mission-id=<mission-id>
npm run research:cloud -- progress claim \
  --mission-id=<mission-id> \
  --worker=<stable-worker-id> \
  --lease-seconds=1800 \
  --apply
```

The claim transaction requires exactly one of `--mission-id`, `--mission-slug`, or `--video-id`. It uses row locking with `SKIP LOCKED`, dependency checks, attempt limits, expiring leases, attempt records, timeout closure for expired attempts, and append-only work-item events. Concurrent workers cannot receive the same active item, and they cannot drift into another mission.

Long work must heartbeat before expiry:

```bash
npm run research:cloud -- progress heartbeat \
  --worker=<stable-worker-id> \
  --work-item=<uuid> \
  --lease-seconds=1800 \
  --apply
```

Finish with a structured JSON payload file:

```bash
npm run research:cloud -- progress finish \
  --worker=<stable-worker-id> \
  --work-item=<uuid> \
  --attempt-id=<uuid> \
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

### Source cache and operational source intelligence

The cloud environment now keeps a pragmatic operational ledger alongside the deeper canonical evidence model:

- `evidence.source_query`: exact query, provider, request parameters, purpose, raw response artifact, and deterministic query hash;
- `evidence.source_retrieval`: selected URL, query relationship, source/capture, cache or capture outcome, rank, and provider metadata;
- `evidence.source_support`: how the retrieval supported, challenged, contextualized, or was discarded for a specific operation.

Use `source cache-lookup` before refetching a canonical URL. Store the complete search response with `source query-record`; store the selected underlying bytes and support statement with `source capture-record`. This ledger is source intelligence for the Cursor execution plane, not a shortcut around canonical locators, claims, and independent verification.

### Workspace archival and cleanup

Every run uses `artifacts/runs/<run-id>/`. Archive paths are collision-free and attempt-scoped:

```text
missions/<mission-slug>/<mission-id>/
  work-items/<work-item-id>/
    attempts/<attempt-no>-<attempt-id>/
      queries/<provider>/<query-hash>/<response-hash>.<ext>
      sources/<content-hash>/<filename>
      workspace/files/<content-hash>/<relative-path>
      workspace/manifest/<manifest-hash>.json
```

`artifacts archive` hashes and uploads every regular file with `upsert:false`, verifies any pre-existing object by downloading and hashing it, registers each object, links it to the work item, writes a deterministic workspace manifest, and appends an idempotent checkpoint event. Identical bytes from separate attempts remain separate provenance objects; hash indexes still support cache lookup.

Use the two-phase sequence: archive without cleanup, finish the work item using the still-local terminal payload, then rerun the identical archive with `--cleanup`. Local deletion happens only after all uploads and registry writes commit.

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

Success means one mission and eleven idempotent work-item rows exist. Re-seeding may append another audit event, but it must not duplicate the mission or work-item rows.

### Test 4: one bounded entity-selection attempt

This is the first meaningful agent behavior test:

> Act as `entity-selector` for exactly one ready work item in mission `ai-engineer-video:<youtube-id>`. Use worker ID `cursor-cloud:<uuid>:entity-selector`. Claim one item with the explicit mission scope and `--apply`, inspect existing pre-research, and perform only the minimal source discovery required to rank entity candidates. Record all queries, captures, and support statements; archive and clean the attempt workspace. Do not write canonical rows, submit or execute an ingestion intent, or claim a second item. Heartbeat if necessary, finish the attempt with a structured payload, and report the work-item event trail and artifacts created.

Success means exactly one intended item is claimed and terminal, the lease is respected, candidates remain staged/proposed, and every factual statement has an underlying source.

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

Do not turn on broad recurring automation until these remaining boundaries are deliberately accepted:

1. The CLI intentionally has no approval command. Choose a separate human/operator approval workflow before any execution automation.
2. No scheduler is configured in this repository. The CLI now ranks autonomous candidates, but scheduled fan-out must run selection once in the control plane and assign explicit, distinct video or mission scopes; simultaneous “pick next” workers may still converge on one idempotent mission and leave one idle.
3. The current direct database secret is more privileged than the bounded database roles model. Before unattended automation, issue distinct least-privilege researcher, verifier, control-plane, and executor credentials.
4. Storage upload and Postgres registration cannot be one cross-service transaction. Paths are deterministic and retries repair registration, but operational monitoring should detect orphaned objects after a process crash.
5. Working tree changes must be committed and pushed before a cloud test can observe them.

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
| `.agents/skills/claim-evidence-workflow/SKILL.md` | Atomic claim extraction and independent verification contract |
| `ENTITY_TAXONOMY.md` | Human-readable primary/secondary divisions and product-ingestion rules |
| `video-workspace/README.md` | Autonomous selection policy, ranking modes, and pre-mission retrieval playbook |
| `.cursor/agents/*.md` | Coordinator and bounded specialist roles |
| `scripts/research-cloud.mjs` | Readiness, transcript, mission, source-intelligence, workspace-archive, and intent CLI |
| `FIRST_CLOUD_RUN_PROMPT.md` | Explicit goals, purpose-specific intents, and copy/paste first-run prompt |
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
- 239 unique search-index entries with zero missing paths;
- all nine requested application schemas and 278 generated workspace files;
- live source-intelligence migration, parallel artifact constraint change, and private dual-bucket readiness;
- live transcript retrieval with database-pointer/path validation and SHA-256 reporting;
- live two-worker `SKIP LOCKED` race: exactly one winner for one ready item, no cross-mission claim, and zero test missions remaining after UUID-scoped cleanup;
- one local mission seed/claim/heartbeat/finish lifecycle;
- one local deterministic intent execution and receipt;
- live dry-run video and progress inspection;
- zero npm audit vulnerabilities at validation time;
- skill validation and Git whitespace checks.

The local lifecycle and executor proofs used test/local state where appropriate. Do not infer authorization to repeat a mutating proof against production.

## First real cloud run

Use the copy/paste prompt in `FIRST_CLOUD_RUN_PROMPT.md`. It is deliberately bounded to a short starter video and one `entity_identity_intelligence` work item. It exercises authenticated readiness, transcript retrieval, mission-scoped claiming, query/retrieval/source-support provenance, two-phase workspace archive/cleanup, and terminal status without canonical writes or intent execution.

## Final handoff checklist

- [ ] Review cloud-repository diff.
- [ ] Review DB-contract diff and applied live migrations.
- [ ] Commit and push both intended change sets.
- [ ] Configure required Cursor Secrets.
- [x] Install hook runs `npm ci` before environment verification.
- [ ] Run Test 0 in a fresh Cloud Agent.
- [ ] Run Test 1 with authenticated read-only access.
- [ ] Choose one video and run Tests 2–6 incrementally.
- [ ] Approve and run Test 7 only after manual review.
- [ ] Deliberately accept or resolve the remaining approval, least-privilege credential, scheduler fan-out, and orphan-monitoring boundaries.
- [ ] Start automation at Phase A, not Phase D.

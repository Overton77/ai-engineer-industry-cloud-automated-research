---
name: ai-engineer-cloud-research
description: "Run one-video-at-a-time AI Engineer industry research in Cursor Cloud: inspect pre-research, coordinate shared work, resolve canonical entities, probe metrics, verify source attribution, upload reports, and submit or execute deterministic Supabase ingestion intents."
---

# AI Engineer cloud research

Use Postgres as the shared progress ledger and `ai-engineer-cloud-bucket` as the private content-addressed artifact store. Run commands from the repository root with `npm run research:cloud -- ...`.

## Start

1. Run `npm run verify:environment`, then `npm run verify:research`.
2. Read [schema routing](references/schema-routing.md). Drill into `schema-workspace/schemas/<schema>/README.md`, then open only the relevant table files. Read [evidence and verification](references/evidence-verification.md) before capturing or extracting sources.
3. If the operator supplied a video, use it. Otherwise run `videos prioritize --strategy=balanced --limit=20`, choose exactly one of the returned videos, and state the score components that drove the choice. Use `--strategy=popular-media` when the operator explicitly wants audience reach to be a stronger starter-packet signal, `--strategy=chronology` for a timeline backfill, or `--strategy=entity-cluster --entity=<normalized-name>` for a declared entity campaign. Popularity is discovery context, never identity proof or evidence.
4. Inspect the selected video with `video get --video-id=<id>`, then run `mission preflight --video-id=<id> --output=artifacts/runs/<run-id>/inputs/pre-mission-context.json`. Read that file before web research. Normalized-name overlap is context, not identity proof.
5. Seed the shared graph with `progress seed --video-id=<id>`; every seed dry run and mutation performs the same pre-mission retrieval again. Review the dry run, then add `--apply`. Retain the returned mission ID.

## Work contract

- Claim one ready item using `progress claim --mission-id=<mission-id> --worker=<stable-agent-id> --apply`. Mission scope is mandatory; dependencies, simultaneous claims, attempt limits, and expired leases are handled transactionally.
- Treat the pre-mission context as the baseline for entity selection. Reuse canonical IDs only after provider identifier, authoritative URL, or other source agreement; preserve conflicts and video-time versus current-time facts.
- Heartbeat long work before the lease expires. Finish with a structured payload file. Do not edit another worker's lease.
- Put all local work under `artifacts/runs/<run-id>/`. Before finishing, run `artifacts archive --mission-id=<mission-id> --work-item=<id> --attempt-id=<id> --root=artifacts/runs/<run-id> --apply --cleanup`. Cleanup occurs only after immutable uploads, registry rows, links, manifest, and checkpoint event commit.
- Retrieve a starter transcript with `transcript get --video-id=<id> --output=artifacts/runs/<run-id>/inputs/transcript.txt` when it is useful. The command requires the database pointer to match `ai-engineer-transcripts/ai-dot-engineer/<video-id>.txt` and uses authenticated private-bucket download.
- Before fetching a URL, use `source cache-lookup --url=<canonical-url>`. Store each raw provider search response with `source query-record`, then each fetched underlying source with `source capture-record`. These commands preserve the query, provider parameters, bytes, hashes, cache/retrieval relationship, and a concise statement of how the source supports or challenges the current operation.
- Store raw provider responses before synthesis. Every metric needs a canonical entity, source capture hash, locator, observed and collected times, measurement semantics, missingness, and quality flags.
- Treat Tavily and Firecrawl search scores as discovery. Cite the fetched underlying source, not a search-result snippet.
- Agents propose canonical writes as intent JSON. Validate and dry-run submission first. Execution requires a separately approved or budgeted intent and explicit `--apply`.
- The executor only performs parameterized insert/upsert operations against an allowlist. It accepts no delete or arbitrary SQL operation.

## Routing

- Entity fields, identity keys, and metric targets: [schema routing](references/schema-routing.md)
- Exact generated Supabase types: `database.types.ts`
- Searchable live columns, relationships, indexes, and policies: `schema-workspace/search-index.json` and `schema-workspace/schemas/`
- Locator fidelity, independent verification, temporal facts, and failure rules: [evidence and verification](references/evidence-verification.md)
- Intent shape and `$ref` examples: [deterministic intents](references/deterministic-intents.md)
- Metric source tiers and probe semantics: [metric probes](references/metric-probes.md)
- Atomic claim extraction and independent verification: load `../claim-evidence-workflow/SKILL.md`

Never print secrets, make the bucket public, coerce missing metrics to zero, merge ambiguous identities, or claim verification independence when the verifier produced the extraction.

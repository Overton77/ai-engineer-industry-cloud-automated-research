---
name: ai-engineer-cloud-research
description: "Run one-video-at-a-time AI Engineer industry research in Cursor Cloud: inspect pre-research, coordinate shared work, resolve canonical entities, probe metrics, verify source attribution, upload reports, and submit or execute deterministic Supabase ingestion intents."
---

# AI Engineer cloud research

Use Postgres as the shared progress ledger and `ai-engineer-cloud-bucket` as the private content-addressed artifact store. Run commands from the repository root with `npm run research:cloud -- ...`.

## Start

1. Run `npm run verify:environment`, then `npm run verify:research`.
2. Read [schema routing](references/schema-routing.md). Drill into `schema-workspace/schemas/<schema>/README.md`, then open only the relevant table files. Read [evidence and verification](references/evidence-verification.md) before capturing or extracting sources.
3. Choose exactly one video with `videos list --order asc|desc`, then inspect it with `video get --video-id=<id>`.
4. Seed the shared graph with `progress seed --video-id=<id>`; review the dry run, then add `--apply`.

## Work contract

- Claim one ready item using `progress claim --worker=<stable-agent-id> --apply`. Dependencies and expired leases are handled transactionally.
- Heartbeat long work before the lease expires. Finish with a structured payload file. Do not edit another worker's lease.
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

Never print secrets, make the bucket public, coerce missing metrics to zero, merge ambiguous identities, or claim verification independence when the verifier produced the extraction.

# AI Engineer Postgres schema workspace

Generated, search-first projection of the live Supabase database. Start with the schema index, search `search-index.json`, or use `rg` against the per-relation Markdown files.

The canonical migration and TypeScript contract is `@aiengineer/database-contract`; the synchronized cloud type file is [`database.types.ts`](../database.types.ts).

## Drill-down map

| Schema | Relations | Purpose |
| --- | --- | --- |
| [`public`](schemas/public/README.md) | 40 | Starter videos and pre-research pipeline |
| [`api`](schemas/api/README.md) | 9 | Stable application-facing views and functions |
| [`orchestration`](schemas/orchestration/README.md) | 23 | Missions, work leases, intents, receipts, and artifacts |
| [`evidence`](schemas/evidence/README.md) | 32 | Sources, captures, locators, claims, and verification |
| [`taxonomy`](schemas/taxonomy/README.md) | 6 | Versioned facets, terms, relations, and assignments |
| [`corpus`](schemas/corpus/README.md) | 60 | Canonical industry entities |
| [`staging`](schemas/staging/README.md) | 22 | Candidates, mentions, identity resolution, and vetting |
| [`ranking`](schemas/ranking/README.md) | 16 | Metric definitions, observations, features, and scores |
| [`research`](schemas/research/README.md) | 8 | Bundles, reports, findings, comparisons, and handoffs |

## Fast searches

```bash
rg -n "metric_observation|github_stars|quality_flags" schema-workspace/schemas/ranking
rg -n "FOREIGN KEY.*corpus.organization" schema-workspace/schemas
rg -n "security definer|RLS policies" schema-workspace/schemas
jq '.[] | select(.columns | index("video_id"))' schema-workspace/search-index.json
```

Run `npm run schema:workspace` to rebuild from live Postgres. Run `npm run schema:workspace:check` in CI to rebuild and fail when the committed workspace has drifted.

See [READINESS_AUDIT.md](READINESS_AUDIT.md) for the design audit and [taxonomy.snapshot.json](taxonomy.snapshot.json) for current grouping terms.

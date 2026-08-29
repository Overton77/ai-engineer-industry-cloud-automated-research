# Schema routing

Start at `schema-workspace/index.md`, then open `schema-workspace/schemas/<schema>/README.md` and only the relevant per-table files. Search `schema-workspace/search-index.json` by qualified name or column. Use the schema-level `schema.json` when structured metadata is more efficient than Markdown. Refresh the workspace with `npm run schema:workspace`; refresh the conventional Supabase type file with `npm run db:types`.

`database.types.ts` is synchronized byte-for-byte from the installed `@aiengineer/database-contract` package. It is the type authority for Supabase queries; the workspace files are the navigation and database-design authority.

| Need | Area |
| --- | --- |
| Starter video and existing pre-research | `public.research_*` (read only) |
| Shared mission, DAG, leases, attempts, artifacts, intents, receipts | `orchestration` |
| Immutable sources, captures, locators, claims, verification | `evidence` |
| Unresolved entity candidates and identity decisions | `staging` |
| Canonical entities and relationships | `corpus` |
| Metric definitions, observations, features, ranking runs | `ranking` |
| Versioned reports, findings, comparisons, handoffs | `research` |
| Grouping and facet assignment | `taxonomy` |

Canonical kinds include organizations, people, repositories, libraries, papers, videos, talks, products, concepts, datasets, benchmarks, AI models and versions, protocols, MCP servers, agent skills, and case studies.

Canonical rows require an immutable `operation_receipt`. Never insert a fake receipt ID or bypass the intent executor.

---
schema: public
relation: research_video_lifecycle
qualified_name: public.research_video_lifecycle
kind: table
---

# public.research_video_lifecycle

Database table public.research_video_lifecycle.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_video_lifecycle"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_video_lifecycle public.research_video_lifecycle analysis_id lifecycle_stage`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `analysis_id` | `uuid` | no | — | — |
| 2 | `lifecycle_stage` | `research_lifecycle_stage` | no | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_video_lifecycle_analysis_id_fkey` | `foreign_key` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` | `research_video_analysis` |
| `research_video_lifecycle_pkey` | `primary_key` | `PRIMARY KEY (analysis_id, lifecycle_stage)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_video_lifecycle_analysis_id_fkey` | `research_video_analysis` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_video_lifecycle_pkey` | `CREATE UNIQUE INDEX research_video_lifecycle_pkey ON public.research_video_lifecycle USING btree (analysis_id, lifecycle_stage)` |

## RLS policies

_None._

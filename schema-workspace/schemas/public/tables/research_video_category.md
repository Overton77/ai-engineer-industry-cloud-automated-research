---
schema: public
relation: research_video_category
qualified_name: public.research_video_category
kind: table
---

# public.research_video_category

Exactly one primary category and up to three secondary categories per analysis.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_video_category"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_video_category public.research_video_category analysis_id category_code assignment_role confidence rationale alternative_rank`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `analysis_id` | `uuid` | no | — | — |
| 2 | `category_code` | `research_engineering_category_code` | no | — | — |
| 3 | `assignment_role` | `research_category_assignment_role` | no | — | — |
| 4 | `confidence` | `numeric(4,3)` | no | — | — |
| 5 | `rationale` | `text` | no | — | — |
| 6 | `alternative_rank` | `integer` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_video_category_alternative_rank_check` | `check` | `CHECK (alternative_rank IS NULL OR alternative_rank >= 1)` | — |
| `research_video_category_confidence_check` | `check` | `CHECK (confidence >= 0::numeric AND confidence <= 1::numeric)` | — |
| `research_video_category_analysis_id_fkey` | `foreign_key` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` | `research_video_analysis` |
| `research_video_category_pkey` | `primary_key` | `PRIMARY KEY (analysis_id, category_code)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_video_category_analysis_id_fkey` | `research_video_analysis` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_video_category_code_idx` | `CREATE INDEX research_video_category_code_idx ON public.research_video_category USING btree (category_code, assignment_role)` |
| `research_video_category_one_primary_uidx` | `CREATE UNIQUE INDEX research_video_category_one_primary_uidx ON public.research_video_category USING btree (analysis_id) WHERE (assignment_role = 'primary'::research_category_assignment_role)` |
| `research_video_category_pkey` | `CREATE UNIQUE INDEX research_video_category_pkey ON public.research_video_category USING btree (analysis_id, category_code)` |

## RLS policies

_None._

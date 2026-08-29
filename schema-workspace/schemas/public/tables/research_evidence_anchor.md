---
schema: public
relation: research_evidence_anchor
qualified_name: public.research_evidence_anchor
kind: table
---

# public.research_evidence_anchor

Database table public.research_evidence_anchor.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_evidence_anchor"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_evidence_anchor public.research_evidence_anchor evidence_id analysis_id source_kind source_url transcript_segment start_seconds end_seconds start_character end_character short_excerpt supports`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `evidence_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `analysis_id` | `uuid` | no | — | — |
| 3 | `source_kind` | `research_evidence_source_kind` | no | — | — |
| 4 | `source_url` | `text` | yes | — | — |
| 5 | `transcript_segment` | `text` | yes | — | — |
| 6 | `start_seconds` | `numeric` | yes | — | — |
| 7 | `end_seconds` | `numeric` | yes | — | — |
| 8 | `start_character` | `integer` | yes | — | — |
| 9 | `end_character` | `integer` | yes | — | — |
| 10 | `short_excerpt` | `text` | no | — | — |
| 11 | `supports` | `text` | no | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_evidence_anchor_characters_check` | `check` | `CHECK (start_character IS NULL OR end_character IS NULL OR end_character >= start_character)` | — |
| `research_evidence_anchor_seconds_check` | `check` | `CHECK (start_seconds IS NULL OR end_seconds IS NULL OR end_seconds >= start_seconds)` | — |
| `research_evidence_anchor_analysis_id_fkey` | `foreign_key` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` | `research_video_analysis` |
| `research_evidence_anchor_pkey` | `primary_key` | `PRIMARY KEY (evidence_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_evidence_anchor_analysis_id_fkey` | `research_video_analysis` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.research_organization_source`](../../public/tables/research_organization_source.md) | `research_organization_source_evidence_id_fkey` | `FOREIGN KEY (evidence_id) REFERENCES research_evidence_anchor(evidence_id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `research_evidence_anchor_analysis_idx` | `CREATE INDEX research_evidence_anchor_analysis_idx ON public.research_evidence_anchor USING btree (analysis_id, source_kind)` |
| `research_evidence_anchor_pkey` | `CREATE UNIQUE INDEX research_evidence_anchor_pkey ON public.research_evidence_anchor USING btree (evidence_id)` |

## Triggers

_None._

## RLS policies

_None._

---
schema: public
relation: research_resource_candidate
qualified_name: public.research_resource_candidate
kind: table
---

# public.research_resource_candidate

Database table public.research_resource_candidate.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_resource_candidate"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_resource_candidate public.research_resource_candidate resource_candidate_id analysis_id resource_type title url normalized_url publisher relationship_to_video why_valuable verification_status is_first_party license confidence evidence_ids`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `resource_candidate_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `analysis_id` | `uuid` | no | — | — |
| 3 | `resource_type` | `research_resource_type` | no | — | — |
| 4 | `title` | `text` | no | — | — |
| 5 | `url` | `text` | no | — | — |
| 6 | `normalized_url` | `text` | no | — | — |
| 7 | `publisher` | `text` | yes | — | — |
| 8 | `relationship_to_video` | `text` | no | — | — |
| 9 | `why_valuable` | `text` | no | — | — |
| 10 | `verification_status` | `research_verification_status` | no | — | — |
| 11 | `is_first_party` | `boolean` | no | `false` | — |
| 12 | `license` | `text` | yes | — | — |
| 13 | `confidence` | `numeric(4,3)` | no | — | — |
| 14 | `evidence_ids` | `uuid[]` | no | `'{}'::uuid[]` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_resource_candidate_confidence_check` | `check` | `CHECK (confidence >= 0::numeric AND confidence <= 1::numeric)` | — |
| `research_resource_candidate_analysis_id_fkey` | `foreign_key` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` | `research_video_analysis` |
| `research_resource_candidate_pkey` | `primary_key` | `PRIMARY KEY (resource_candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_resource_candidate_analysis_id_fkey` | `research_video_analysis` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_resource_candidate_analysis_idx` | `CREATE INDEX research_resource_candidate_analysis_idx ON public.research_resource_candidate USING btree (analysis_id, resource_type)` |
| `research_resource_candidate_analysis_url_uidx` | `CREATE UNIQUE INDEX research_resource_candidate_analysis_url_uidx ON public.research_resource_candidate USING btree (analysis_id, normalized_url)` |
| `research_resource_candidate_pkey` | `CREATE UNIQUE INDEX research_resource_candidate_pkey ON public.research_resource_candidate USING btree (resource_candidate_id)` |

## Triggers

_None._

## RLS policies

_None._

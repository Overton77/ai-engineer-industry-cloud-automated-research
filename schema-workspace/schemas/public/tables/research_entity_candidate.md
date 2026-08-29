---
schema: public
relation: research_entity_candidate
qualified_name: public.research_entity_candidate
kind: table
---

# public.research_entity_candidate

Database table public.research_entity_candidate.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_entity_candidate"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_entity_candidate public.research_entity_candidate candidate_id analysis_id entity_kind name normalized_name canonical_url organization_name relationship_to_video confidence verification_status evidence_ids`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `candidate_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `analysis_id` | `uuid` | no | — | — |
| 3 | `entity_kind` | `research_entity_kind` | no | — | — |
| 4 | `name` | `text` | no | — | — |
| 5 | `normalized_name` | `text` | no | — | — |
| 6 | `canonical_url` | `text` | yes | — | — |
| 7 | `organization_name` | `text` | yes | — | — |
| 8 | `relationship_to_video` | `text` | no | — | — |
| 9 | `confidence` | `numeric(4,3)` | no | — | — |
| 10 | `verification_status` | `research_verification_status` | no | — | — |
| 11 | `evidence_ids` | `uuid[]` | no | `'{}'::uuid[]` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_entity_candidate_confidence_check` | `check` | `CHECK (confidence >= 0::numeric AND confidence <= 1::numeric)` | — |
| `research_entity_candidate_analysis_id_fkey` | `foreign_key` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` | `research_video_analysis` |
| `research_entity_candidate_pkey` | `primary_key` | `PRIMARY KEY (candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_entity_candidate_analysis_id_fkey` | `research_video_analysis` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_entity_candidate_analysis_idx` | `CREATE INDEX research_entity_candidate_analysis_idx ON public.research_entity_candidate USING btree (analysis_id, entity_kind)` |
| `research_entity_candidate_normalized_idx` | `CREATE INDEX research_entity_candidate_normalized_idx ON public.research_entity_candidate USING btree (normalized_name)` |
| `research_entity_candidate_pkey` | `CREATE UNIQUE INDEX research_entity_candidate_pkey ON public.research_entity_candidate USING btree (candidate_id)` |

## Triggers

_None._

## RLS policies

_None._

---
schema: public
relation: research_organization_candidate
qualified_name: public.research_organization_candidate
kind: table
---

# public.research_organization_candidate

Database table public.research_organization_candidate.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_organization_candidate"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_organization_candidate public.research_organization_candidate organization_candidate_id analysis_id video_id canonical_name normalized_name organization_scope relationship_roles is_primary_featured featured_rank primary_domain_code secondary_domain_codes parent_name parent_canonical_url official_url authoritative_summary relationship_to_implementation current_status status_as_of video_time_name video_time_parent_name ownership_changed_since_video confidence evidence_ids generated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `organization_candidate_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `analysis_id` | `uuid` | no | — | — |
| 3 | `video_id` | `text` | no | — | — |
| 4 | `canonical_name` | `text` | no | — | — |
| 5 | `normalized_name` | `text` | no | — | — |
| 6 | `organization_scope` | `research_organization_scope` | no | — | — |
| 7 | `relationship_roles` | `research_video_organization_role[]` | no | — | — |
| 8 | `is_primary_featured` | `boolean` | no | `false` | — |
| 9 | `featured_rank` | `integer` | no | — | — |
| 10 | `primary_domain_code` | `research_organization_domain_code` | no | — | — |
| 11 | `secondary_domain_codes` | `research_organization_domain_code[]` | no | `'{}'::research_organization_domain_code[]` | — |
| 12 | `parent_name` | `text` | yes | — | — |
| 13 | `parent_canonical_url` | `text` | yes | — | — |
| 14 | `official_url` | `text` | no | — | — |
| 15 | `authoritative_summary` | `text` | no | — | — |
| 16 | `relationship_to_implementation` | `text` | no | — | — |
| 17 | `current_status` | `text` | no | — | — |
| 18 | `status_as_of` | `date` | no | — | — |
| 19 | `video_time_name` | `text` | yes | — | — |
| 20 | `video_time_parent_name` | `text` | yes | — | — |
| 21 | `ownership_changed_since_video` | `boolean` | no | `false` | — |
| 22 | `confidence` | `numeric(4,3)` | no | — | — |
| 23 | `evidence_ids` | `uuid[]` | no | `'{}'::uuid[]` | — |
| 24 | `generated_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_organization_candidate_confidence_check` | `check` | `CHECK (confidence >= 0::numeric AND confidence <= 1::numeric)` | — |
| `research_organization_candidate_rank_check` | `check` | `CHECK (featured_rank >= 1)` | — |
| `research_organization_candidate_secondary_len_check` | `check` | `CHECK (cardinality(secondary_domain_codes) <= 2)` | — |
| `research_organization_candidate_analysis_id_fkey` | `foreign_key` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` | `research_video_analysis` |
| `research_organization_candidate_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` | `research_starter_videos` |
| `research_organization_candidate_pkey` | `primary_key` | `PRIMARY KEY (organization_candidate_id)` | — |
| `research_organization_candidate_analysis_id_normalized_name_key` | `unique` | `UNIQUE (analysis_id, normalized_name)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_organization_candidate_analysis_id_fkey` | `research_video_analysis` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| `research_organization_candidate_video_id_fkey` | `research_starter_videos` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.research_organization_source`](../../public/tables/research_organization_source.md) | `research_organization_source_organization_candidate_id_fkey` | `FOREIGN KEY (organization_candidate_id) REFERENCES research_organization_candidate(organization_candidate_id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `research_organization_candidate_analysis_id_normalized_name_key` | `CREATE UNIQUE INDEX research_organization_candidate_analysis_id_normalized_name_key ON public.research_organization_candidate USING btree (analysis_id, normalized_name)` |
| `research_organization_candidate_analysis_idx` | `CREATE INDEX research_organization_candidate_analysis_idx ON public.research_organization_candidate USING btree (analysis_id, featured_rank)` |
| `research_organization_candidate_one_primary_uidx` | `CREATE UNIQUE INDEX research_organization_candidate_one_primary_uidx ON public.research_organization_candidate USING btree (analysis_id) WHERE is_primary_featured` |
| `research_organization_candidate_one_rank1_uidx` | `CREATE UNIQUE INDEX research_organization_candidate_one_rank1_uidx ON public.research_organization_candidate USING btree (analysis_id) WHERE (featured_rank = 1)` |
| `research_organization_candidate_pkey` | `CREATE UNIQUE INDEX research_organization_candidate_pkey ON public.research_organization_candidate USING btree (organization_candidate_id)` |

## Triggers

_None._

## RLS policies

_None._

---
schema: public
relation: research_video_technology_summary
qualified_name: public.research_video_technology_summary
kind: table
---

# public.research_video_technology_summary

Database table public.research_video_technology_summary.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_video_technology_summary"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_video_technology_summary public.research_video_technology_summary technology_summary_id analysis_id video_id family_rank family_label primary_technology primary_technology_kind related_technologies implementations summary relationship_rationale role_in_video current_status temporal_status video_published_at research_as_of official_urls evidence_ids confidence generated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `technology_summary_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `analysis_id` | `uuid` | no | — | — |
| 3 | `video_id` | `text` | no | — | — |
| 4 | `family_rank` | `integer` | no | — | — |
| 5 | `family_label` | `text` | no | — | — |
| 6 | `primary_technology` | `text` | no | — | — |
| 7 | `primary_technology_kind` | `text` | no | — | — |
| 8 | `related_technologies` | `jsonb` | no | `'[]'::jsonb` | — |
| 9 | `implementations` | `jsonb` | no | `'[]'::jsonb` | — |
| 10 | `summary` | `text` | no | — | — |
| 11 | `relationship_rationale` | `text` | no | — | — |
| 12 | `role_in_video` | `text` | no | — | — |
| 13 | `current_status` | `text` | no | — | — |
| 14 | `temporal_status` | `text` | no | — | — |
| 15 | `video_published_at` | `timestamp with time zone` | yes | — | — |
| 16 | `research_as_of` | `date` | no | — | — |
| 17 | `official_urls` | `jsonb` | no | `'[]'::jsonb` | — |
| 18 | `evidence_ids` | `uuid[]` | no | `'{}'::uuid[]` | — |
| 19 | `confidence` | `numeric(4,3)` | no | — | — |
| 20 | `generated_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_video_technology_summary_confidence_check` | `check` | `CHECK (confidence >= 0::numeric AND confidence <= 1::numeric)` | — |
| `research_video_technology_summary_impl_check` | `check` | `CHECK (jsonb_typeof(implementations) = 'array'::text)` | — |
| `research_video_technology_summary_kind_check` | `check` | `CHECK (primary_technology_kind = ANY (ARRAY['architecture'::text, 'technique'::text, 'protocol'::text, 'model_family'::text, 'platform_capability'::text, 'product'::text, 'other'::text]))` | — |
| `research_video_technology_summary_rank_check` | `check` | `CHECK (family_rank >= 1)` | — |
| `research_video_technology_summary_related_check` | `check` | `CHECK (jsonb_typeof(related_technologies) = 'array'::text)` | — |
| `research_video_technology_summary_temporal_check` | `check` | `CHECK (temporal_status = ANY (ARRAY['current'::text, 'changed_since_publication'::text, 'historical'::text, 'uncertain'::text]))` | — |
| `research_video_technology_summary_urls_check` | `check` | `CHECK (jsonb_typeof(official_urls) = 'array'::text)` | — |
| `research_video_technology_summary_analysis_id_fkey` | `foreign_key` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` | `research_video_analysis` |
| `research_video_technology_summary_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` | `research_starter_videos` |
| `research_video_technology_summary_pkey` | `primary_key` | `PRIMARY KEY (technology_summary_id)` | — |
| `research_video_technology_summary_analysis_id_family_rank_key` | `unique` | `UNIQUE (analysis_id, family_rank)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_video_technology_summary_analysis_id_fkey` | `research_video_analysis` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| `research_video_technology_summary_video_id_fkey` | `research_starter_videos` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_video_technology_summary_analysis_id_family_rank_key` | `CREATE UNIQUE INDEX research_video_technology_summary_analysis_id_family_rank_key ON public.research_video_technology_summary USING btree (analysis_id, family_rank)` |
| `research_video_technology_summary_analysis_idx` | `CREATE INDEX research_video_technology_summary_analysis_idx ON public.research_video_technology_summary USING btree (analysis_id, family_rank)` |
| `research_video_technology_summary_pkey` | `CREATE UNIQUE INDEX research_video_technology_summary_pkey ON public.research_video_technology_summary USING btree (technology_summary_id)` |

## Triggers

_None._

## RLS policies

_None._

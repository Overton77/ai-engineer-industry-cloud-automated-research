---
schema: public
relation: research_video_analysis
qualified_name: public.research_video_analysis
kind: table
---

# public.research_video_analysis

Immutable analysis packet for one completed pre-research run.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_video_analysis"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_video_analysis public.research_video_analysis analysis_id run_id video_id initial_summary structured_summary contextualized_abstract why_it_matters key_takeaways concepts prerequisites learning_outcomes limitations quantitative_claims demonstrations curriculum_roles challenge_seeds difficulty content_form evidence_level overall_confidence generated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `analysis_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `run_id` | `uuid` | no | — | — |
| 3 | `video_id` | `text` | no | — | — |
| 4 | `initial_summary` | `text` | no | — | 75-125 word transcript-only abstract. No web-derived claims. |
| 5 | `structured_summary` | `text` | no | — | 200-400 word transcript-grounded structured summary. |
| 6 | `contextualized_abstract` | `text` | no | — | Transcript plus verified web context. Distinguish evidence grades. |
| 7 | `why_it_matters` | `text` | no | — | — |
| 8 | `key_takeaways` | `jsonb` | no | `'[]'::jsonb` | — |
| 9 | `concepts` | `jsonb` | no | `'[]'::jsonb` | — |
| 10 | `prerequisites` | `jsonb` | no | `'[]'::jsonb` | — |
| 11 | `learning_outcomes` | `jsonb` | no | `'[]'::jsonb` | — |
| 12 | `limitations` | `jsonb` | no | `'[]'::jsonb` | — |
| 13 | `quantitative_claims` | `jsonb` | no | `'[]'::jsonb` | — |
| 14 | `demonstrations` | `jsonb` | no | `'[]'::jsonb` | — |
| 15 | `curriculum_roles` | `text[]` | no | `'{}'::text[]` | — |
| 16 | `challenge_seeds` | `jsonb` | no | `'[]'::jsonb` | — |
| 17 | `difficulty` | `research_difficulty` | no | — | — |
| 18 | `content_form` | `research_content_form` | no | — | — |
| 19 | `evidence_level` | `research_evidence_level` | no | — | — |
| 20 | `overall_confidence` | `numeric(4,3)` | no | — | — |
| 21 | `generated_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_video_analysis_challenge_seeds_check` | `check` | `CHECK (jsonb_typeof(challenge_seeds) = 'array'::text)` | — |
| `research_video_analysis_concepts_check` | `check` | `CHECK (jsonb_typeof(concepts) = 'array'::text)` | — |
| `research_video_analysis_confidence_check` | `check` | `CHECK (overall_confidence >= 0::numeric AND overall_confidence <= 1::numeric)` | — |
| `research_video_analysis_demonstrations_check` | `check` | `CHECK (jsonb_typeof(demonstrations) = 'array'::text)` | — |
| `research_video_analysis_key_takeaways_check` | `check` | `CHECK (jsonb_typeof(key_takeaways) = 'array'::text)` | — |
| `research_video_analysis_learning_outcomes_check` | `check` | `CHECK (jsonb_typeof(learning_outcomes) = 'array'::text)` | — |
| `research_video_analysis_limitations_check` | `check` | `CHECK (jsonb_typeof(limitations) = 'array'::text)` | — |
| `research_video_analysis_prerequisites_check` | `check` | `CHECK (jsonb_typeof(prerequisites) = 'array'::text)` | — |
| `research_video_analysis_quantitative_claims_check` | `check` | `CHECK (jsonb_typeof(quantitative_claims) = 'array'::text)` | — |
| `research_video_analysis_run_id_fkey` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id)` | `research_pre_research_run` |
| `research_video_analysis_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` | `research_starter_videos` |
| `research_video_analysis_pkey` | `primary_key` | `PRIMARY KEY (analysis_id)` | — |
| `research_video_analysis_run_id_key` | `unique` | `UNIQUE (run_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_video_analysis_run_id_fkey` | `research_pre_research_run` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id)` |
| `research_video_analysis_video_id_fkey` | `research_starter_videos` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.research_entity_candidate`](../../public/tables/research_entity_candidate.md) | `research_entity_candidate_analysis_id_fkey` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| [`public.research_evidence_anchor`](../../public/tables/research_evidence_anchor.md) | `research_evidence_anchor_analysis_id_fkey` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| [`public.research_organization_candidate`](../../public/tables/research_organization_candidate.md) | `research_organization_candidate_analysis_id_fkey` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| [`public.research_resource_candidate`](../../public/tables/research_resource_candidate.md) | `research_resource_candidate_analysis_id_fkey` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| [`public.research_video_category`](../../public/tables/research_video_category.md) | `research_video_category_analysis_id_fkey` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| [`public.research_video_domain`](../../public/tables/research_video_domain.md) | `research_video_domain_analysis_id_fkey` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| [`public.research_video_initial_summary`](../../public/tables/research_video_initial_summary.md) | `research_video_initial_summary_analysis_id_fkey` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| [`public.research_video_lifecycle`](../../public/tables/research_video_lifecycle.md) | `research_video_lifecycle_analysis_id_fkey` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| [`public.research_video_technology_summary`](../../public/tables/research_video_technology_summary.md) | `research_video_technology_summary_analysis_id_fkey` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `research_video_analysis_pkey` | `CREATE UNIQUE INDEX research_video_analysis_pkey ON public.research_video_analysis USING btree (analysis_id)` |
| `research_video_analysis_run_id_key` | `CREATE UNIQUE INDEX research_video_analysis_run_id_key ON public.research_video_analysis USING btree (run_id)` |
| `research_video_analysis_video_id_idx` | `CREATE INDEX research_video_analysis_video_id_idx ON public.research_video_analysis USING btree (video_id, generated_at DESC)` |

## Triggers

_None._

## RLS policies

_None._

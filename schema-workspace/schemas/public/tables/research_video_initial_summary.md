---
schema: public
relation: research_video_initial_summary
qualified_name: public.research_video_initial_summary
kind: table
---

# public.research_video_initial_summary

Database table public.research_video_initial_summary.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_video_initial_summary"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_video_initial_summary public.research_video_initial_summary analysis_id video_id transcript_summary software_engineering_concepts ai_concepts external_context_notes temporal_context research_as_of evidence_ids generated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `analysis_id` | `uuid` | no | — | — |
| 2 | `video_id` | `text` | no | — | — |
| 3 | `transcript_summary` | `text` | no | — | — |
| 4 | `software_engineering_concepts` | `jsonb` | no | `'[]'::jsonb` | — |
| 5 | `ai_concepts` | `jsonb` | no | `'[]'::jsonb` | — |
| 6 | `external_context_notes` | `jsonb` | no | `'[]'::jsonb` | — |
| 7 | `temporal_context` | `text` | no | — | — |
| 8 | `research_as_of` | `date` | no | — | — |
| 9 | `evidence_ids` | `uuid[]` | no | `'{}'::uuid[]` | — |
| 10 | `generated_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_video_initial_summary_ai_concepts_check` | `check` | `CHECK (jsonb_typeof(ai_concepts) = 'array'::text)` | — |
| `research_video_initial_summary_notes_check` | `check` | `CHECK (jsonb_typeof(external_context_notes) = 'array'::text)` | — |
| `research_video_initial_summary_se_concepts_check` | `check` | `CHECK (jsonb_typeof(software_engineering_concepts) = 'array'::text)` | — |
| `research_video_initial_summary_analysis_id_fkey` | `foreign_key` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` | `research_video_analysis` |
| `research_video_initial_summary_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` | `research_starter_videos` |
| `research_video_initial_summary_pkey` | `primary_key` | `PRIMARY KEY (analysis_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_video_initial_summary_analysis_id_fkey` | `research_video_analysis` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| `research_video_initial_summary_video_id_fkey` | `research_starter_videos` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_video_initial_summary_pkey` | `CREATE UNIQUE INDEX research_video_initial_summary_pkey ON public.research_video_initial_summary USING btree (analysis_id)` |
| `research_video_initial_summary_video_idx` | `CREATE INDEX research_video_initial_summary_video_idx ON public.research_video_initial_summary USING btree (video_id)` |

## Triggers

_None._

## RLS policies

_None._

---
schema: public
relation: research_starter_videos
qualified_name: public.research_starter_videos
kind: table
---

# public.research_starter_videos

Raw AI Engineer channel catalog plus transcript storage pointers. Starter table for the research schema; relationship tables come later.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_starter_videos"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_starter_videos public.research_starter_videos video_id title description published_at channel_id channel_handle channel_title duration duration_seconds view_count like_count comment_count thumbnail_url url source catalog_fetched_at transcript_status transcript_bucket transcript_path transcript_language transcript_char_count transcript_error transcript_fetched_at transcript_text metadata created_at updated_at pre_research_complete`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `video_id` | `text` | no | — | — |
| 2 | `title` | `text` | no | — | — |
| 3 | `description` | `text` | yes | — | — |
| 4 | `published_at` | `timestamp with time zone` | yes | — | — |
| 5 | `channel_id` | `text` | yes | — | — |
| 6 | `channel_handle` | `text` | yes | — | — |
| 7 | `channel_title` | `text` | yes | — | — |
| 8 | `duration` | `text` | yes | — | — |
| 9 | `duration_seconds` | `integer` | yes | — | — |
| 10 | `view_count` | `bigint` | yes | — | — |
| 11 | `like_count` | `bigint` | yes | — | — |
| 12 | `comment_count` | `bigint` | yes | — | — |
| 13 | `thumbnail_url` | `text` | yes | — | — |
| 14 | `url` | `text` | yes | — | — |
| 15 | `source` | `text` | yes | — | — |
| 16 | `catalog_fetched_at` | `timestamp with time zone` | yes | — | — |
| 17 | `transcript_status` | `text` | no | `'none'::text` | — |
| 18 | `transcript_bucket` | `text` | yes | — | — |
| 19 | `transcript_path` | `text` | yes | — | Object key in the ai-engineer-transcripts bucket, e.g. ai-dot-engineer/<video_id>.txt. |
| 20 | `transcript_language` | `text` | yes | — | — |
| 21 | `transcript_char_count` | `integer` | yes | — | — |
| 22 | `transcript_error` | `text` | yes | — | — |
| 23 | `transcript_fetched_at` | `timestamp with time zone` | yes | — | — |
| 24 | `transcript_text` | `text` | yes | — | Full caption text when fetched. Canonical file also lives in transcript_bucket/transcript_path. |
| 25 | `metadata` | `jsonb` | no | `'{}'::jsonb` | — |
| 26 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 27 | `updated_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 28 | `pre_research_complete` | `boolean` | no | `false` | True only after the Eve pre-research pipeline has been transactionally applied and finalized for this video. |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_starter_videos_transcript_status_check` | `check` | `CHECK (transcript_status = ANY (ARRAY['none'::text, 'pending'::text, 'stored'::text, 'missing'::text, 'error'::text]))` | — |
| `research_starter_videos_pkey` | `primary_key` | `PRIMARY KEY (video_id)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.research_ingestion_intent`](../../public/tables/research_ingestion_intent.md) | `research_ingestion_intent_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |
| [`public.research_organization_candidate`](../../public/tables/research_organization_candidate.md) | `research_organization_candidate_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |
| [`public.research_pre_research_run`](../../public/tables/research_pre_research_run.md) | `research_pre_research_run_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |
| [`public.research_pre_research_video_state`](../../public/tables/research_pre_research_video_state.md) | `research_pre_research_video_state_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |
| [`public.research_video_analysis`](../../public/tables/research_video_analysis.md) | `research_video_analysis_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |
| [`public.research_video_initial_summary`](../../public/tables/research_video_initial_summary.md) | `research_video_initial_summary_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |
| [`public.research_video_technology_summary`](../../public/tables/research_video_technology_summary.md) | `research_video_technology_summary_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `research_starter_videos_channel_id_idx` | `CREATE INDEX research_starter_videos_channel_id_idx ON public.research_starter_videos USING btree (channel_id)` |
| `research_starter_videos_pkey` | `CREATE UNIQUE INDEX research_starter_videos_pkey ON public.research_starter_videos USING btree (video_id)` |
| `research_starter_videos_pre_research_eligible_idx` | `CREATE INDEX research_starter_videos_pre_research_eligible_idx ON public.research_starter_videos USING btree (published_at, video_id) WHERE ((transcript_status = 'stored'::text) AND (duration_seconds IS NOT NULL) AND (duration_seconds > 0) AND (duration_seconds < 5400))` |
| `research_starter_videos_published_at_idx` | `CREATE INDEX research_starter_videos_published_at_idx ON public.research_starter_videos USING btree (published_at DESC NULLS LAST)` |
| `research_starter_videos_transcript_status_idx` | `CREATE INDEX research_starter_videos_transcript_status_idx ON public.research_starter_videos USING btree (transcript_status)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `set_research_starter_videos_updated_at` | `public.set_updated_at` | `CREATE TRIGGER set_research_starter_videos_updated_at BEFORE UPDATE ON research_starter_videos FOR EACH ROW EXECUTE FUNCTION set_updated_at()` |

## RLS policies

_None._

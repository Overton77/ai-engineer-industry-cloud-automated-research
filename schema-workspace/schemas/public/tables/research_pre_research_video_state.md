---
schema: public
relation: research_pre_research_video_state
qualified_name: public.research_pre_research_video_state
kind: table
---

# public.research_pre_research_video_state

Database table public.research_pre_research_video_state.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_pre_research_video_state"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_pre_research_video_state public.research_pre_research_video_state video_id transcript_sha256 eligibility_status ineligibility_reasons duration_seconds transcript_object_exists evaluated_at latest_run_id pipeline_status pre_research_pipeline_finished pre_research_pipeline_finished_at finished_transcript_sha256 finished_intent_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `video_id` | `text` | no | — | — |
| 2 | `transcript_sha256` | `text` | yes | — | — |
| 3 | `eligibility_status` | `text` | no | `'pending'::text` | — |
| 4 | `ineligibility_reasons` | `text[]` | no | `'{}'::text[]` | — |
| 5 | `duration_seconds` | `integer` | yes | — | — |
| 6 | `transcript_object_exists` | `boolean` | no | `false` | — |
| 7 | `evaluated_at` | `timestamp with time zone` | yes | — | — |
| 8 | `latest_run_id` | `uuid` | yes | — | — |
| 9 | `pipeline_status` | `text` | no | `'not_started'::text` | — |
| 10 | `pre_research_pipeline_finished` | `boolean` | no | `false` | — |
| 11 | `pre_research_pipeline_finished_at` | `timestamp with time zone` | yes | — | — |
| 12 | `finished_transcript_sha256` | `text` | yes | — | — |
| 13 | `finished_intent_id` | `uuid` | yes | — | — |
| 14 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 15 | `updated_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_pre_research_video_state_eligibility_check` | `check` | `CHECK (eligibility_status = ANY (ARRAY['pending'::text, 'eligible'::text, 'ineligible'::text]))` | — |
| `research_pre_research_video_state_finished_check` | `check` | `CHECK (pre_research_pipeline_finished = false OR pre_research_pipeline_finished_at IS NOT NULL AND finished_transcript_sha256 IS NOT NULL AND finished_intent_id IS NOT NULL AND pipeline_status = 'finished'::text)` | — |
| `research_pre_research_video_state_finished_sha256_check` | `check` | `CHECK (finished_transcript_sha256 IS NULL OR finished_transcript_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `research_pre_research_video_state_pipeline_check` | `check` | `CHECK (pipeline_status = ANY (ARRAY['not_started'::text, 'eligible'::text, 'claimed'::text, 'researching'::text, 'research_complete'::text, 'synthesizing'::text, 'intent_ready'::text, 'review_required'::text, 'applying'::text, 'finalizing'::text, 'finished'::text, 'failed'::text, 'superseded'::text]))` | — |
| `research_pre_research_video_state_sha256_check` | `check` | `CHECK (transcript_sha256 IS NULL OR transcript_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `research_pre_research_video_state_finished_intent_id_fkey` | `foreign_key` | `FOREIGN KEY (finished_intent_id) REFERENCES research_ingestion_intent(intent_id)` | `research_ingestion_intent` |
| `research_pre_research_video_state_latest_run_id_fkey` | `foreign_key` | `FOREIGN KEY (latest_run_id) REFERENCES research_pre_research_run(run_id)` | `research_pre_research_run` |
| `research_pre_research_video_state_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` | `research_starter_videos` |
| `research_pre_research_video_state_pkey` | `primary_key` | `PRIMARY KEY (video_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_pre_research_video_state_finished_intent_id_fkey` | `research_ingestion_intent` | `FOREIGN KEY (finished_intent_id) REFERENCES research_ingestion_intent(intent_id)` |
| `research_pre_research_video_state_latest_run_id_fkey` | `research_pre_research_run` | `FOREIGN KEY (latest_run_id) REFERENCES research_pre_research_run(run_id)` |
| `research_pre_research_video_state_video_id_fkey` | `research_starter_videos` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_pre_research_video_state_eligible_idx` | `CREATE INDEX research_pre_research_video_state_eligible_idx ON public.research_pre_research_video_state USING btree (eligibility_status, pipeline_status)` |
| `research_pre_research_video_state_pkey` | `CREATE UNIQUE INDEX research_pre_research_video_state_pkey ON public.research_pre_research_video_state USING btree (video_id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `set_research_pre_research_video_state_updated_at` | `public.set_updated_at` | `CREATE TRIGGER set_research_pre_research_video_state_updated_at BEFORE UPDATE ON research_pre_research_video_state FOR EACH ROW EXECUTE FUNCTION set_updated_at()` |

## RLS policies

_None._

---
schema: public
relation: research_pre_research_run
qualified_name: public.research_pre_research_run
kind: table
---

# public.research_pre_research_run

One claimable orchestration row per video+transcript-hash attempt.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_pre_research_run"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_pre_research_run public.research_pre_research_run run_id video_id taxonomy_version_id status attempt lease_token lease_expires_at transcript_sha256 prompt_bundle_version model_id workflow_session_id started_at completed_at error_code error_detail intent_path intent_sha256 created_at updated_at research_as_of packet_schema_version packet_storage_prefix packet_sha256 research_session_id synthesis_session_id research_completed_at synthesis_started_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `run_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `video_id` | `text` | no | — | — |
| 3 | `taxonomy_version_id` | `uuid` | no | — | — |
| 4 | `status` | `research_pre_research_run_status` | no | `'queued'::research_pre_research_run_status` | — |
| 5 | `attempt` | `integer` | no | `1` | — |
| 6 | `lease_token` | `uuid` | yes | — | — |
| 7 | `lease_expires_at` | `timestamp with time zone` | yes | — | — |
| 8 | `transcript_sha256` | `text` | no | — | — |
| 9 | `prompt_bundle_version` | `text` | no | — | — |
| 10 | `model_id` | `text` | no | — | — |
| 11 | `workflow_session_id` | `text` | yes | — | — |
| 12 | `started_at` | `timestamp with time zone` | yes | — | — |
| 13 | `completed_at` | `timestamp with time zone` | yes | — | — |
| 14 | `error_code` | `text` | yes | — | — |
| 15 | `error_detail` | `text` | yes | — | — |
| 16 | `intent_path` | `text` | yes | — | — |
| 17 | `intent_sha256` | `text` | yes | — | — |
| 18 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 19 | `updated_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 20 | `research_as_of` | `date` | no | `(timezone('utc'::text, now()))::date` | — |
| 21 | `packet_schema_version` | `text` | no | `'1.0.0'::text` | — |
| 22 | `packet_storage_prefix` | `text` | yes | — | — |
| 23 | `packet_sha256` | `text` | yes | — | — |
| 24 | `research_session_id` | `text` | yes | — | — |
| 25 | `synthesis_session_id` | `text` | yes | — | — |
| 26 | `research_completed_at` | `timestamp with time zone` | yes | — | — |
| 27 | `synthesis_started_at` | `timestamp with time zone` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_pre_research_run_attempt_check` | `check` | `CHECK (attempt >= 1)` | — |
| `research_pre_research_run_intent_sha256_check` | `check` | `CHECK (intent_sha256 IS NULL OR intent_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `research_pre_research_run_packet_sha256_check` | `check` | `CHECK (packet_sha256 IS NULL OR packet_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `research_pre_research_run_transcript_sha256_check` | `check` | `CHECK (transcript_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `research_pre_research_run_taxonomy_version_id_fkey` | `foreign_key` | `FOREIGN KEY (taxonomy_version_id) REFERENCES research_taxonomy_version(taxonomy_version_id)` | `research_taxonomy_version` |
| `research_pre_research_run_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` | `research_starter_videos` |
| `research_pre_research_run_pkey` | `primary_key` | `PRIMARY KEY (run_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_pre_research_run_taxonomy_version_id_fkey` | `research_taxonomy_version` | `FOREIGN KEY (taxonomy_version_id) REFERENCES research_taxonomy_version(taxonomy_version_id)` |
| `research_pre_research_run_video_id_fkey` | `research_starter_videos` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.research_ingestion_intent`](../../public/tables/research_ingestion_intent.md) | `research_ingestion_intent_run_id_fkey` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id)` |
| [`public.research_pre_research_artifact`](../../public/tables/research_pre_research_artifact.md) | `research_pre_research_artifact_run_id_fkey` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` |
| [`public.research_pre_research_session`](../../public/tables/research_pre_research_session.md) | `research_pre_research_session_run_id_fkey` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` |
| [`public.research_pre_research_stage_execution`](../../public/tables/research_pre_research_stage_execution.md) | `research_pre_research_stage_execution_run_id_fkey` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` |
| [`public.research_pre_research_video_state`](../../public/tables/research_pre_research_video_state.md) | `research_pre_research_video_state_latest_run_id_fkey` | `FOREIGN KEY (latest_run_id) REFERENCES research_pre_research_run(run_id)` |
| [`public.research_video_analysis`](../../public/tables/research_video_analysis.md) | `research_video_analysis_run_id_fkey` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id)` |
| [`public.research_web_search_event`](../../public/tables/research_web_search_event.md) | `research_web_search_event_run_id_fkey` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `research_pre_research_run_applied_video_hash_uidx` | `CREATE UNIQUE INDEX research_pre_research_run_applied_video_hash_uidx ON public.research_pre_research_run USING btree (video_id, transcript_sha256) WHERE (status = 'applied'::research_pre_research_run_status)` |
| `research_pre_research_run_lease_idx` | `CREATE INDEX research_pre_research_run_lease_idx ON public.research_pre_research_run USING btree (status, lease_expires_at) WHERE (status = ANY (ARRAY['claimed'::research_pre_research_run_status, 'analyzing'::research_pre_research_run_status]))` |
| `research_pre_research_run_live_video_hash_uidx` | `CREATE UNIQUE INDEX research_pre_research_run_live_video_hash_uidx ON public.research_pre_research_run USING btree (video_id, transcript_sha256) WHERE (status = ANY (ARRAY['queued'::research_pre_research_run_status, 'claimed'::research_pre_research_run_status, 'analyzing'::research_pre_research_run_status, 'research_complete'::research_pre_research_run_status, 'synthesizing'::research_pre_research_run_status, 'intent_ready'::research_pre_research_run_status, 'applying'::research_pre_research_run_status]))` |
| `research_pre_research_run_pkey` | `CREATE UNIQUE INDEX research_pre_research_run_pkey ON public.research_pre_research_run USING btree (run_id)` |
| `research_pre_research_run_status_idx` | `CREATE INDEX research_pre_research_run_status_idx ON public.research_pre_research_run USING btree (status, created_at DESC)` |
| `research_pre_research_run_video_id_idx` | `CREATE INDEX research_pre_research_run_video_id_idx ON public.research_pre_research_run USING btree (video_id, created_at DESC)` |

## RLS policies

_None._

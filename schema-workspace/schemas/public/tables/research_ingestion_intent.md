---
schema: public
relation: research_ingestion_intent
qualified_name: public.research_ingestion_intent
kind: table
---

# public.research_ingestion_intent

Database table public.research_ingestion_intent.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_ingestion_intent"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_ingestion_intent public.research_ingestion_intent intent_id run_id video_id schema_version idempotency_key storage_bucket storage_path content_sha256 status validated_at applied_at rejected_at error_detail created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `intent_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `run_id` | `uuid` | no | — | — |
| 3 | `video_id` | `text` | no | — | — |
| 4 | `schema_version` | `text` | no | — | — |
| 5 | `idempotency_key` | `text` | no | — | — |
| 6 | `storage_bucket` | `text` | no | — | — |
| 7 | `storage_path` | `text` | no | — | — |
| 8 | `content_sha256` | `text` | no | — | — |
| 9 | `status` | `research_intent_status` | no | `'draft'::research_intent_status` | — |
| 10 | `validated_at` | `timestamp with time zone` | yes | — | — |
| 11 | `applied_at` | `timestamp with time zone` | yes | — | — |
| 12 | `rejected_at` | `timestamp with time zone` | yes | — | — |
| 13 | `error_detail` | `text` | yes | — | — |
| 14 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_ingestion_intent_content_sha256_check` | `check` | `CHECK (content_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `research_ingestion_intent_run_id_fkey` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id)` | `research_pre_research_run` |
| `research_ingestion_intent_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` | `research_starter_videos` |
| `research_ingestion_intent_pkey` | `primary_key` | `PRIMARY KEY (intent_id)` | — |
| `research_ingestion_intent_idempotency_key_key` | `unique` | `UNIQUE (idempotency_key)` | — |
| `research_ingestion_intent_run_id_key` | `unique` | `UNIQUE (run_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_ingestion_intent_run_id_fkey` | `research_pre_research_run` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id)` |
| `research_ingestion_intent_video_id_fkey` | `research_starter_videos` | `FOREIGN KEY (video_id) REFERENCES research_starter_videos(video_id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.research_ingestion_intent_event`](../../public/tables/research_ingestion_intent_event.md) | `research_ingestion_intent_event_intent_id_fkey` | `FOREIGN KEY (intent_id) REFERENCES research_ingestion_intent(intent_id) ON DELETE CASCADE` |
| [`public.research_pre_research_artifact`](../../public/tables/research_pre_research_artifact.md) | `research_pre_research_artifact_intent_id_fkey` | `FOREIGN KEY (intent_id) REFERENCES research_ingestion_intent(intent_id) ON DELETE CASCADE` |
| [`public.research_pre_research_video_state`](../../public/tables/research_pre_research_video_state.md) | `research_pre_research_video_state_finished_intent_id_fkey` | `FOREIGN KEY (finished_intent_id) REFERENCES research_ingestion_intent(intent_id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `research_ingestion_intent_idempotency_key_key` | `CREATE UNIQUE INDEX research_ingestion_intent_idempotency_key_key ON public.research_ingestion_intent USING btree (idempotency_key)` |
| `research_ingestion_intent_pkey` | `CREATE UNIQUE INDEX research_ingestion_intent_pkey ON public.research_ingestion_intent USING btree (intent_id)` |
| `research_ingestion_intent_run_id_key` | `CREATE UNIQUE INDEX research_ingestion_intent_run_id_key ON public.research_ingestion_intent USING btree (run_id)` |
| `research_ingestion_intent_video_id_idx` | `CREATE INDEX research_ingestion_intent_video_id_idx ON public.research_ingestion_intent USING btree (video_id, created_at DESC)` |

## RLS policies

_None._

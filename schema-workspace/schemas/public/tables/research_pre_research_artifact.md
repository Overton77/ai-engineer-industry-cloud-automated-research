---
schema: public
relation: research_pre_research_artifact
qualified_name: public.research_pre_research_artifact
kind: table
---

# public.research_pre_research_artifact

Database table public.research_pre_research_artifact.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_pre_research_artifact"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_pre_research_artifact public.research_pre_research_artifact artifact_id run_id intent_id artifact_kind schema_version storage_bucket storage_path content_sha256 byte_count created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `artifact_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `run_id` | `uuid` | no | — | — |
| 3 | `intent_id` | `uuid` | yes | — | — |
| 4 | `artifact_kind` | `text` | no | — | — |
| 5 | `schema_version` | `text` | no | — | — |
| 6 | `storage_bucket` | `text` | no | — | — |
| 7 | `storage_path` | `text` | no | — | — |
| 8 | `content_sha256` | `text` | no | — | — |
| 9 | `byte_count` | `bigint` | no | — | — |
| 10 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_pre_research_artifact_byte_count_check` | `check` | `CHECK (byte_count >= 0)` | — |
| `research_pre_research_artifact_kind_check` | `check` | `CHECK (artifact_kind = ANY (ARRAY['run_manifest'::text, 'transcript_analysis'::text, 'taxonomy_classification'::text, 'web_context'::text, 'organization_research'::text, 'source_verification'::text, 'curriculum_signals'::text, 'initial_summary'::text, 'technology_library_summary'::text, 'organization_profile'::text, 'ingestion_intent'::text, 'execution_receipt'::text]))` | — |
| `research_pre_research_artifact_sha256_check` | `check` | `CHECK (content_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `research_pre_research_artifact_intent_id_fkey` | `foreign_key` | `FOREIGN KEY (intent_id) REFERENCES research_ingestion_intent(intent_id) ON DELETE CASCADE` | `research_ingestion_intent` |
| `research_pre_research_artifact_run_id_fkey` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` | `research_pre_research_run` |
| `research_pre_research_artifact_pkey` | `primary_key` | `PRIMARY KEY (artifact_id)` | — |
| `research_pre_research_artifact_run_id_artifact_kind_key` | `unique` | `UNIQUE (run_id, artifact_kind)` | — |
| `research_pre_research_artifact_storage_bucket_storage_path_key` | `unique` | `UNIQUE (storage_bucket, storage_path)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_pre_research_artifact_intent_id_fkey` | `research_ingestion_intent` | `FOREIGN KEY (intent_id) REFERENCES research_ingestion_intent(intent_id) ON DELETE CASCADE` |
| `research_pre_research_artifact_run_id_fkey` | `research_pre_research_run` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_pre_research_artifact_pkey` | `CREATE UNIQUE INDEX research_pre_research_artifact_pkey ON public.research_pre_research_artifact USING btree (artifact_id)` |
| `research_pre_research_artifact_run_id_artifact_kind_key` | `CREATE UNIQUE INDEX research_pre_research_artifact_run_id_artifact_kind_key ON public.research_pre_research_artifact USING btree (run_id, artifact_kind)` |
| `research_pre_research_artifact_run_idx` | `CREATE INDEX research_pre_research_artifact_run_idx ON public.research_pre_research_artifact USING btree (run_id, artifact_kind)` |
| `research_pre_research_artifact_storage_bucket_storage_path_key` | `CREATE UNIQUE INDEX research_pre_research_artifact_storage_bucket_storage_path_key ON public.research_pre_research_artifact USING btree (storage_bucket, storage_path)` |

## Triggers

_None._

## RLS policies

_None._

---
schema: public
relation: research_pre_research_stage_execution
qualified_name: public.research_pre_research_stage_execution
kind: table
---

# public.research_pre_research_stage_execution

Database table public.research_pre_research_stage_execution.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_pre_research_stage_execution"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_pre_research_stage_execution public.research_pre_research_stage_execution stage_execution_id run_id stage status attempt_count lease_owner lease_token_hash lease_expires_at retry_after input_manifest_bucket input_manifest_path input_sha256 output_artifact_kinds completed_artifact_sha256s model_id prompt_bundle_version last_error_code last_error_detail usage_summary started_at updated_at completed_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `stage_execution_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `run_id` | `uuid` | no | — | — |
| 3 | `stage` | `text` | no | — | — |
| 4 | `status` | `text` | no | `'pending'::text` | — |
| 5 | `attempt_count` | `integer` | no | `0` | — |
| 6 | `lease_owner` | `text` | yes | — | — |
| 7 | `lease_token_hash` | `text` | yes | — | — |
| 8 | `lease_expires_at` | `timestamp with time zone` | yes | — | — |
| 9 | `retry_after` | `timestamp with time zone` | yes | — | — |
| 10 | `input_manifest_bucket` | `text` | yes | — | — |
| 11 | `input_manifest_path` | `text` | yes | — | — |
| 12 | `input_sha256` | `text` | yes | — | — |
| 13 | `output_artifact_kinds` | `text[]` | no | `'{}'::text[]` | — |
| 14 | `completed_artifact_sha256s` | `jsonb` | no | `'{}'::jsonb` | — |
| 15 | `model_id` | `text` | no | `'zai/glm-5.2'::text` | — |
| 16 | `prompt_bundle_version` | `text` | no | `'pre-research-v3-stateless-1'::text` | — |
| 17 | `last_error_code` | `text` | yes | — | — |
| 18 | `last_error_detail` | `text` | yes | — | — |
| 19 | `usage_summary` | `jsonb` | no | `'{}'::jsonb` | — |
| 20 | `started_at` | `timestamp with time zone` | yes | — | — |
| 21 | `updated_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 22 | `completed_at` | `timestamp with time zone` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_pre_research_stage_execution_attempt_check` | `check` | `CHECK (attempt_count >= 0)` | — |
| `research_pre_research_stage_execution_error_detail_check` | `check` | `CHECK (last_error_detail IS NULL OR length(last_error_detail) <= 2000)` | — |
| `research_pre_research_stage_execution_input_hash_check` | `check` | `CHECK (input_sha256 IS NULL OR input_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `research_pre_research_stage_execution_lease_hash_check` | `check` | `CHECK (lease_token_hash IS NULL OR lease_token_hash ~ '^[0-9a-f]{64}$'::text)` | — |
| `research_pre_research_stage_execution_stage_check` | `check` | `CHECK (stage = ANY (ARRAY['transcript_taxonomy'::text, 'web_context'::text, 'organization_research'::text, 'source_verification'::text, 'curriculum'::text, 'initial_summary'::text, 'technology_library_summary'::text, 'organization_profile'::text, 'ingestion_intent'::text]))` | — |
| `research_pre_research_stage_execution_status_check` | `check` | `CHECK (status = ANY (ARRAY['pending'::text, 'leased'::text, 'retry_wait'::text, 'completed'::text, 'dead_letter'::text]))` | — |
| `research_pre_research_stage_execution_run_id_fkey` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` | `research_pre_research_run` |
| `research_pre_research_stage_execution_pkey` | `primary_key` | `PRIMARY KEY (stage_execution_id)` | — |
| `research_pre_research_stage_execution_run_stage_key` | `unique` | `UNIQUE (run_id, stage)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_pre_research_stage_execution_run_id_fkey` | `research_pre_research_run` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_pre_research_stage_execution_pkey` | `CREATE UNIQUE INDEX research_pre_research_stage_execution_pkey ON public.research_pre_research_stage_execution USING btree (stage_execution_id)` |
| `research_pre_research_stage_execution_ready_idx` | `CREATE INDEX research_pre_research_stage_execution_ready_idx ON public.research_pre_research_stage_execution USING btree (status, retry_after, updated_at)` |
| `research_pre_research_stage_execution_run_idx` | `CREATE INDEX research_pre_research_stage_execution_run_idx ON public.research_pre_research_stage_execution USING btree (run_id, stage)` |
| `research_pre_research_stage_execution_run_stage_key` | `CREATE UNIQUE INDEX research_pre_research_stage_execution_run_stage_key ON public.research_pre_research_stage_execution USING btree (run_id, stage)` |

## RLS policies

_None._

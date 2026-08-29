---
schema: public
relation: factory_episode
qualified_name: public.factory_episode
kind: table
---

# public.factory_episode

Immutable-identity app-factory or optimization rollout. External artifacts and OTel traces are referenced by content hash.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_episode"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_episode public.factory_episode factory_episode_id factory_task_id environment_version_id factory_candidate_id attempt_id seed idempotency_key workflow_run_id eve_session_id sandbox_provider sandbox_session_id source_revision status terminal_state started_at finished_at duration_ms model_tokens cost_usd metadata created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_episode_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `factory_task_id` | `uuid` | no | — | — |
| 3 | `environment_version_id` | `uuid` | no | — | — |
| 4 | `factory_candidate_id` | `uuid` | no | — | — |
| 5 | `attempt_id` | `uuid` | yes | — | — |
| 6 | `seed` | `bigint` | no | — | — |
| 7 | `idempotency_key` | `text` | no | — | — |
| 8 | `workflow_run_id` | `text` | yes | — | — |
| 9 | `eve_session_id` | `text` | yes | — | — |
| 10 | `sandbox_provider` | `text` | yes | — | — |
| 11 | `sandbox_session_id` | `text` | yes | — | — |
| 12 | `source_revision` | `text` | no | — | — |
| 13 | `status` | `text` | no | `'queued'::text` | — |
| 14 | `terminal_state` | `text` | yes | — | — |
| 15 | `started_at` | `timestamp with time zone` | yes | — | — |
| 16 | `finished_at` | `timestamp with time zone` | yes | — | — |
| 17 | `duration_ms` | `bigint` | yes | — | — |
| 18 | `model_tokens` | `bigint` | no | `0` | — |
| 19 | `cost_usd` | `numeric` | no | `0` | — |
| 20 | `metadata` | `jsonb` | no | `'{}'::jsonb` | — |
| 21 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_episode_nonnegative_usage_check` | `check` | `CHECK (model_tokens >= 0 AND cost_usd >= 0::numeric AND (duration_ms IS NULL OR duration_ms >= 0))` | — |
| `factory_episode_status_check` | `check` | `CHECK (status = ANY (ARRAY['queued'::text, 'running'::text, 'waiting'::text, 'verifying'::text, 'completed'::text, 'failed'::text, 'cancelled'::text]))` | — |
| `factory_episode_terminal_state_check` | `check` | `CHECK (terminal_state IS NULL OR (terminal_state = ANY (ARRAY['completed'::text, 'failed'::text, 'timed_out'::text, 'cancelled'::text, 'budget_exhausted'::text, 'policy_breach'::text])))` | — |
| `factory_episode_environment_version_id_fkey` | `foreign_key` | `FOREIGN KEY (environment_version_id) REFERENCES factory_environment_version(environment_version_id) ON DELETE RESTRICT` | `factory_environment_version` |
| `factory_episode_factory_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (factory_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` | `factory_candidate` |
| `factory_episode_factory_task_id_fkey` | `foreign_key` | `FOREIGN KEY (factory_task_id) REFERENCES factory_task(factory_task_id) ON DELETE RESTRICT` | `factory_task` |
| `factory_episode_pkey` | `primary_key` | `PRIMARY KEY (factory_episode_id)` | — |
| `factory_episode_idempotency_key_key` | `unique` | `UNIQUE (idempotency_key)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_episode_environment_version_id_fkey` | `factory_environment_version` | `FOREIGN KEY (environment_version_id) REFERENCES factory_environment_version(environment_version_id) ON DELETE RESTRICT` |
| `factory_episode_factory_candidate_id_fkey` | `factory_candidate` | `FOREIGN KEY (factory_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` |
| `factory_episode_factory_task_id_fkey` | `factory_task` | `FOREIGN KEY (factory_task_id) REFERENCES factory_task(factory_task_id) ON DELETE RESTRICT` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.factory_artifact`](../../public/tables/factory_artifact.md) | `factory_artifact_factory_episode_id_fkey` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` |
| [`public.factory_assertion_result`](../../public/tables/factory_assertion_result.md) | `factory_assertion_result_factory_episode_id_fkey` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` |
| [`public.factory_runtime_event`](../../public/tables/factory_runtime_event.md) | `factory_runtime_event_factory_episode_id_fkey` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE RESTRICT` |
| [`public.factory_score_vector`](../../public/tables/factory_score_vector.md) | `factory_score_vector_factory_episode_id_fkey` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` |
| [`public.factory_trace_span_ref`](../../public/tables/factory_trace_span_ref.md) | `factory_trace_span_ref_factory_episode_id_fkey` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `factory_episode_candidate_idx` | `CREATE INDEX factory_episode_candidate_idx ON public.factory_episode USING btree (factory_candidate_id, created_at DESC)` |
| `factory_episode_eve_session_uniq` | `CREATE UNIQUE INDEX factory_episode_eve_session_uniq ON public.factory_episode USING btree (eve_session_id) WHERE (eve_session_id IS NOT NULL)` |
| `factory_episode_idempotency_key_key` | `CREATE UNIQUE INDEX factory_episode_idempotency_key_key ON public.factory_episode USING btree (idempotency_key)` |
| `factory_episode_pkey` | `CREATE UNIQUE INDEX factory_episode_pkey ON public.factory_episode USING btree (factory_episode_id)` |
| `factory_episode_status_idx` | `CREATE INDEX factory_episode_status_idx ON public.factory_episode USING btree (status, created_at)` |
| `factory_episode_task_idx` | `CREATE INDEX factory_episode_task_idx ON public.factory_episode USING btree (factory_task_id, created_at DESC)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `protect_factory_episode_identity_and_terminal` | `public.protect_factory_episode_identity_and_terminal` | `CREATE TRIGGER protect_factory_episode_identity_and_terminal BEFORE DELETE OR UPDATE ON factory_episode FOR EACH ROW EXECUTE FUNCTION protect_factory_episode_identity_and_terminal()` |

## RLS policies

_None._

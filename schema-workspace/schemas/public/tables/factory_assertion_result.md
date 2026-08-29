---
schema: public
relation: factory_assertion_result
qualified_name: public.factory_assertion_result
kind: table
---

# public.factory_assertion_result

Database table public.factory_assertion_result.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_assertion_result"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_assertion_result public.factory_assertion_result factory_assertion_result_id factory_episode_id assertion_key assertion_kind evaluator_version passed hard_gate score details evidence_artifact_ids created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_assertion_result_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `factory_episode_id` | `uuid` | no | — | — |
| 3 | `assertion_key` | `text` | no | — | — |
| 4 | `assertion_kind` | `text` | no | — | — |
| 5 | `evaluator_version` | `text` | no | — | — |
| 6 | `passed` | `boolean` | no | — | — |
| 7 | `hard_gate` | `boolean` | no | `false` | — |
| 8 | `score` | `numeric` | yes | — | — |
| 9 | `details` | `jsonb` | no | `'{}'::jsonb` | — |
| 10 | `evidence_artifact_ids` | `uuid[]` | no | `'{}'::uuid[]` | — |
| 11 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_assertion_score_check` | `check` | `CHECK (score IS NULL OR score >= 0::numeric AND score <= 1::numeric)` | — |
| `factory_assertion_result_factory_episode_id_fkey` | `foreign_key` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` | `factory_episode` |
| `factory_assertion_result_pkey` | `primary_key` | `PRIMARY KEY (factory_assertion_result_id)` | — |
| `factory_assertion_episode_key_uniq` | `unique` | `UNIQUE (factory_episode_id, assertion_key, evaluator_version)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_assertion_result_factory_episode_id_fkey` | `factory_episode` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `factory_assertion_episode_key_uniq` | `CREATE UNIQUE INDEX factory_assertion_episode_key_uniq ON public.factory_assertion_result USING btree (factory_episode_id, assertion_key, evaluator_version)` |
| `factory_assertion_result_pkey` | `CREATE UNIQUE INDEX factory_assertion_result_pkey ON public.factory_assertion_result USING btree (factory_assertion_result_id)` |

## RLS policies

_None._

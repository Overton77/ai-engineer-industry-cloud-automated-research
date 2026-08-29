---
schema: public
relation: factory_promotion_decision
qualified_name: public.factory_promotion_decision
kind: table
---

# public.factory_promotion_decision

Independent signed promotion outcome with evidence and an explicit rollback target.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_promotion_decision"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_promotion_decision public.factory_promotion_decision factory_promotion_decision_id factory_experiment_id baseline_candidate_id candidate_id decision promotion_policy_version evidence reasons decided_by rollback_component_version_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_promotion_decision_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `factory_experiment_id` | `uuid` | no | — | — |
| 3 | `baseline_candidate_id` | `uuid` | no | — | — |
| 4 | `candidate_id` | `uuid` | no | — | — |
| 5 | `decision` | `text` | no | — | — |
| 6 | `promotion_policy_version` | `text` | no | — | — |
| 7 | `evidence` | `jsonb` | no | — | — |
| 8 | `reasons` | `text[]` | no | `'{}'::text[]` | — |
| 9 | `decided_by` | `text` | no | — | — |
| 10 | `rollback_component_version_id` | `uuid` | yes | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_promotion_decision_check` | `check` | `CHECK (decision = ANY (ARRAY['promote'::text, 'reject'::text, 'shadow'::text, 'canary'::text, 'roll_back'::text, 'needs_human_review'::text]))` | — |
| `factory_promotion_decision_baseline_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (baseline_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` | `factory_candidate` |
| `factory_promotion_decision_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` | `factory_candidate` |
| `factory_promotion_decision_factory_experiment_id_fkey` | `foreign_key` | `FOREIGN KEY (factory_experiment_id) REFERENCES factory_experiment(factory_experiment_id) ON DELETE RESTRICT` | `factory_experiment` |
| `factory_promotion_decision_rollback_component_version_id_fkey` | `foreign_key` | `FOREIGN KEY (rollback_component_version_id) REFERENCES factory_component_version(component_version_id) ON DELETE RESTRICT` | `factory_component_version` |
| `factory_promotion_decision_pkey` | `primary_key` | `PRIMARY KEY (factory_promotion_decision_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_promotion_decision_baseline_candidate_id_fkey` | `factory_candidate` | `FOREIGN KEY (baseline_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` |
| `factory_promotion_decision_candidate_id_fkey` | `factory_candidate` | `FOREIGN KEY (candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` |
| `factory_promotion_decision_factory_experiment_id_fkey` | `factory_experiment` | `FOREIGN KEY (factory_experiment_id) REFERENCES factory_experiment(factory_experiment_id) ON DELETE RESTRICT` |
| `factory_promotion_decision_rollback_component_version_id_fkey` | `factory_component_version` | `FOREIGN KEY (rollback_component_version_id) REFERENCES factory_component_version(component_version_id) ON DELETE RESTRICT` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.factory_canary_result`](../../public/tables/factory_canary_result.md) | `factory_canary_result_promotion_decision_id_fkey` | `FOREIGN KEY (promotion_decision_id) REFERENCES factory_promotion_decision(factory_promotion_decision_id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `factory_promotion_decision_pkey` | `CREATE UNIQUE INDEX factory_promotion_decision_pkey ON public.factory_promotion_decision USING btree (factory_promotion_decision_id)` |

## Triggers

_None._

## RLS policies

_None._

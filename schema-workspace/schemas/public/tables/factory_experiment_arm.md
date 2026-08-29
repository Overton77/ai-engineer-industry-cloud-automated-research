---
schema: public
relation: factory_experiment_arm
qualified_name: public.factory_experiment_arm
kind: table
---

# public.factory_experiment_arm

Database table public.factory_experiment_arm.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_experiment_arm"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_experiment_arm public.factory_experiment_arm factory_experiment_arm_id factory_experiment_id factory_candidate_id arm_name assignment_probability aggregate_metrics episode_ids created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_experiment_arm_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `factory_experiment_id` | `uuid` | no | — | — |
| 3 | `factory_candidate_id` | `uuid` | no | — | — |
| 4 | `arm_name` | `text` | no | — | — |
| 5 | `assignment_probability` | `numeric` | yes | — | — |
| 6 | `aggregate_metrics` | `jsonb` | no | `'{}'::jsonb` | — |
| 7 | `episode_ids` | `uuid[]` | no | `'{}'::uuid[]` | — |
| 8 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_experiment_arm_probability_check` | `check` | `CHECK (assignment_probability IS NULL OR assignment_probability > 0::numeric AND assignment_probability <= 1::numeric)` | — |
| `factory_experiment_arm_factory_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (factory_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` | `factory_candidate` |
| `factory_experiment_arm_factory_experiment_id_fkey` | `foreign_key` | `FOREIGN KEY (factory_experiment_id) REFERENCES factory_experiment(factory_experiment_id) ON DELETE CASCADE` | `factory_experiment` |
| `factory_experiment_arm_pkey` | `primary_key` | `PRIMARY KEY (factory_experiment_arm_id)` | — |
| `factory_experiment_arm_name_uniq` | `unique` | `UNIQUE (factory_experiment_id, arm_name)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_experiment_arm_factory_candidate_id_fkey` | `factory_candidate` | `FOREIGN KEY (factory_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` |
| `factory_experiment_arm_factory_experiment_id_fkey` | `factory_experiment` | `FOREIGN KEY (factory_experiment_id) REFERENCES factory_experiment(factory_experiment_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `factory_experiment_arm_name_uniq` | `CREATE UNIQUE INDEX factory_experiment_arm_name_uniq ON public.factory_experiment_arm USING btree (factory_experiment_id, arm_name)` |
| `factory_experiment_arm_pkey` | `CREATE UNIQUE INDEX factory_experiment_arm_pkey ON public.factory_experiment_arm USING btree (factory_experiment_arm_id)` |

## RLS policies

_None._

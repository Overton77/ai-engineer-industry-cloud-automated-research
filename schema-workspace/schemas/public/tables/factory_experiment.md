---
schema: public
relation: factory_experiment
qualified_name: public.factory_experiment
kind: table
---

# public.factory_experiment

Database table public.factory_experiment.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_experiment"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_experiment public.factory_experiment factory_experiment_id evolution_proposal_id experiment_version split_manifest_digest policy status started_at finished_at created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_experiment_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `evolution_proposal_id` | `uuid` | no | — | — |
| 3 | `experiment_version` | `text` | no | — | — |
| 4 | `split_manifest_digest` | `text` | no | — | — |
| 5 | `policy` | `jsonb` | no | — | — |
| 6 | `status` | `text` | no | `'draft'::text` | — |
| 7 | `started_at` | `timestamp with time zone` | yes | — | — |
| 8 | `finished_at` | `timestamp with time zone` | yes | — | — |
| 9 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_experiment_status_check` | `check` | `CHECK (status = ANY (ARRAY['draft'::text, 'running'::text, 'completed'::text, 'failed'::text, 'cancelled'::text]))` | — |
| `factory_experiment_evolution_proposal_id_fkey` | `foreign_key` | `FOREIGN KEY (evolution_proposal_id) REFERENCES factory_evolution_proposal(factory_evolution_proposal_id) ON DELETE CASCADE` | `factory_evolution_proposal` |
| `factory_experiment_pkey` | `primary_key` | `PRIMARY KEY (factory_experiment_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_experiment_evolution_proposal_id_fkey` | `factory_evolution_proposal` | `FOREIGN KEY (evolution_proposal_id) REFERENCES factory_evolution_proposal(factory_evolution_proposal_id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.factory_experiment_arm`](../../public/tables/factory_experiment_arm.md) | `factory_experiment_arm_factory_experiment_id_fkey` | `FOREIGN KEY (factory_experiment_id) REFERENCES factory_experiment(factory_experiment_id) ON DELETE CASCADE` |
| [`public.factory_promotion_decision`](../../public/tables/factory_promotion_decision.md) | `factory_promotion_decision_factory_experiment_id_fkey` | `FOREIGN KEY (factory_experiment_id) REFERENCES factory_experiment(factory_experiment_id) ON DELETE RESTRICT` |

## Indexes

| Name | Definition |
| --- | --- |
| `factory_experiment_pkey` | `CREATE UNIQUE INDEX factory_experiment_pkey ON public.factory_experiment USING btree (factory_experiment_id)` |

## RLS policies

_None._

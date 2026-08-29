---
schema: public
relation: factory_evolution_proposal
qualified_name: public.factory_evolution_proposal
kind: table
---

# public.factory_evolution_proposal

Bounded, evidence-backed proposal. The optimizer may propose a candidate but cannot alter verifier, reward, promotion, or production authority.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_evolution_proposal"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_evolution_proposal public.factory_evolution_proposal factory_evolution_proposal_id failure_cluster_id proposed_candidate_id hypothesized_component_kind hypothesis mutation_surface predicted_impact risks evaluation_plan budget stop_condition rollback_component_version_id status created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_evolution_proposal_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `failure_cluster_id` | `uuid` | yes | — | — |
| 3 | `proposed_candidate_id` | `uuid` | yes | — | — |
| 4 | `hypothesized_component_kind` | `text` | no | — | — |
| 5 | `hypothesis` | `text` | no | — | — |
| 6 | `mutation_surface` | `jsonb` | no | — | — |
| 7 | `predicted_impact` | `jsonb` | no | — | — |
| 8 | `risks` | `jsonb` | no | — | — |
| 9 | `evaluation_plan` | `jsonb` | no | — | — |
| 10 | `budget` | `jsonb` | no | — | — |
| 11 | `stop_condition` | `jsonb` | no | — | — |
| 12 | `rollback_component_version_id` | `uuid` | yes | — | — |
| 13 | `status` | `text` | no | `'proposed'::text` | — |
| 14 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_evolution_status_check` | `check` | `CHECK (status = ANY (ARRAY['proposed'::text, 'approved'::text, 'running'::text, 'no_promotion'::text, 'promotion_requested'::text, 'rejected'::text, 'cancelled'::text]))` | — |
| `factory_evolution_proposal_failure_cluster_id_fkey` | `foreign_key` | `FOREIGN KEY (failure_cluster_id) REFERENCES factory_failure_cluster(factory_failure_cluster_id) ON DELETE SET NULL` | `factory_failure_cluster` |
| `factory_evolution_proposal_proposed_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (proposed_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE SET NULL` | `factory_candidate` |
| `factory_evolution_proposal_rollback_component_version_id_fkey` | `foreign_key` | `FOREIGN KEY (rollback_component_version_id) REFERENCES factory_component_version(component_version_id) ON DELETE RESTRICT` | `factory_component_version` |
| `factory_evolution_proposal_pkey` | `primary_key` | `PRIMARY KEY (factory_evolution_proposal_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_evolution_proposal_failure_cluster_id_fkey` | `factory_failure_cluster` | `FOREIGN KEY (failure_cluster_id) REFERENCES factory_failure_cluster(factory_failure_cluster_id) ON DELETE SET NULL` |
| `factory_evolution_proposal_proposed_candidate_id_fkey` | `factory_candidate` | `FOREIGN KEY (proposed_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE SET NULL` |
| `factory_evolution_proposal_rollback_component_version_id_fkey` | `factory_component_version` | `FOREIGN KEY (rollback_component_version_id) REFERENCES factory_component_version(component_version_id) ON DELETE RESTRICT` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.factory_experiment`](../../public/tables/factory_experiment.md) | `factory_experiment_evolution_proposal_id_fkey` | `FOREIGN KEY (evolution_proposal_id) REFERENCES factory_evolution_proposal(factory_evolution_proposal_id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `factory_evolution_proposal_pkey` | `CREATE UNIQUE INDEX factory_evolution_proposal_pkey ON public.factory_evolution_proposal USING btree (factory_evolution_proposal_id)` |

## RLS policies

_None._

---
schema: public
relation: factory_candidate
qualified_name: public.factory_candidate
kind: table
---

# public.factory_candidate

Database table public.factory_candidate.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_candidate"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_candidate public.factory_candidate factory_candidate_id parent_candidate_id candidate_kind content_digest source_revision proposer rationale mutation_surface component_versions status created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_candidate_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `parent_candidate_id` | `uuid` | yes | — | — |
| 3 | `candidate_kind` | `text` | no | — | — |
| 4 | `content_digest` | `text` | no | — | — |
| 5 | `source_revision` | `text` | no | — | — |
| 6 | `proposer` | `text` | no | — | — |
| 7 | `rationale` | `text` | no | — | — |
| 8 | `mutation_surface` | `jsonb` | no | — | — |
| 9 | `component_versions` | `jsonb` | no | — | — |
| 10 | `status` | `text` | no | `'proposed'::text` | — |
| 11 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_candidate_kind_check` | `check` | `CHECK (candidate_kind = ANY (ARRAY['instructions'::text, 'skill'::text, 'tool'::text, 'retriever'::text, 'workflow'::text, 'model_route'::text, 'memory_policy'::text, 'application_code'::text, 'model_weights'::text, 'compound'::text]))` | — |
| `factory_candidate_status_check` | `check` | `CHECK (status = ANY (ARRAY['proposed'::text, 'evaluating'::text, 'rejected'::text, 'approved'::text, 'canary'::text, 'promoted'::text, 'rolled_back'::text]))` | — |
| `factory_candidate_parent_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (parent_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE SET NULL` | `factory_candidate` |
| `factory_candidate_pkey` | `primary_key` | `PRIMARY KEY (factory_candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_candidate_parent_candidate_id_fkey` | `factory_candidate` | `FOREIGN KEY (parent_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE SET NULL` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.factory_candidate`](../../public/tables/factory_candidate.md) | `factory_candidate_parent_candidate_id_fkey` | `FOREIGN KEY (parent_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE SET NULL` |
| [`public.factory_episode`](../../public/tables/factory_episode.md) | `factory_episode_factory_candidate_id_fkey` | `FOREIGN KEY (factory_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` |
| [`public.factory_evolution_proposal`](../../public/tables/factory_evolution_proposal.md) | `factory_evolution_proposal_proposed_candidate_id_fkey` | `FOREIGN KEY (proposed_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE SET NULL` |
| [`public.factory_experiment_arm`](../../public/tables/factory_experiment_arm.md) | `factory_experiment_arm_factory_candidate_id_fkey` | `FOREIGN KEY (factory_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` |
| [`public.factory_promotion_decision`](../../public/tables/factory_promotion_decision.md) | `factory_promotion_decision_baseline_candidate_id_fkey` | `FOREIGN KEY (baseline_candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` |
| [`public.factory_promotion_decision`](../../public/tables/factory_promotion_decision.md) | `factory_promotion_decision_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES factory_candidate(factory_candidate_id) ON DELETE RESTRICT` |

## Indexes

| Name | Definition |
| --- | --- |
| `factory_candidate_pkey` | `CREATE UNIQUE INDEX factory_candidate_pkey ON public.factory_candidate USING btree (factory_candidate_id)` |

## Triggers

_None._

## RLS policies

_None._

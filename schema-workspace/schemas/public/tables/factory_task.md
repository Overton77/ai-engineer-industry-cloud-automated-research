---
schema: public
relation: factory_task
qualified_name: public.factory_task
kind: table
---

# public.factory_task

Database table public.factory_task.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_task"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_task public.factory_task factory_task_id challenge_id parent_task_id task_kind slug version spec_digest spec risk_tier data_split status created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_task_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `challenge_id` | `uuid` | yes | — | — |
| 3 | `parent_task_id` | `uuid` | yes | — | — |
| 4 | `task_kind` | `text` | no | — | — |
| 5 | `slug` | `text` | no | — | — |
| 6 | `version` | `text` | no | — | — |
| 7 | `spec_digest` | `text` | no | — | — |
| 8 | `spec` | `jsonb` | no | — | — |
| 9 | `risk_tier` | `text` | no | `'standard'::text` | — |
| 10 | `data_split` | `text` | no | — | — |
| 11 | `status` | `text` | no | `'draft'::text` | — |
| 12 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_task_data_split_check` | `check` | `CHECK (data_split = ANY (ARRAY['train'::text, 'development'::text, 'hidden_holdout'::text, 'adversarial'::text, 'temporal_frontier'::text, 'human_calibration'::text, 'production_quarantine'::text]))` | — |
| `factory_task_kind_check` | `check` | `CHECK (task_kind = ANY (ARRAY['research_ingestion'::text, 'curriculum_generation'::text, 'app_feature'::text, 'app_repair'::text, 'learner_submission'::text, 'harness_optimization'::text]))` | — |
| `factory_task_risk_tier_check` | `check` | `CHECK (risk_tier = ANY (ARRAY['low'::text, 'standard'::text, 'high'::text, 'regulated'::text]))` | — |
| `factory_task_status_check` | `check` | `CHECK (status = ANY (ARRAY['draft'::text, 'review'::text, 'active'::text, 'retired'::text, 'quarantined'::text]))` | — |
| `factory_task_parent_task_id_fkey` | `foreign_key` | `FOREIGN KEY (parent_task_id) REFERENCES factory_task(factory_task_id) ON DELETE SET NULL` | `factory_task` |
| `factory_task_pkey` | `primary_key` | `PRIMARY KEY (factory_task_id)` | — |
| `factory_task_slug_version_uniq` | `unique` | `UNIQUE (slug, version)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_task_parent_task_id_fkey` | `factory_task` | `FOREIGN KEY (parent_task_id) REFERENCES factory_task(factory_task_id) ON DELETE SET NULL` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.factory_episode`](../../public/tables/factory_episode.md) | `factory_episode_factory_task_id_fkey` | `FOREIGN KEY (factory_task_id) REFERENCES factory_task(factory_task_id) ON DELETE RESTRICT` |
| [`public.factory_task`](../../public/tables/factory_task.md) | `factory_task_parent_task_id_fkey` | `FOREIGN KEY (parent_task_id) REFERENCES factory_task(factory_task_id) ON DELETE SET NULL` |

## Indexes

| Name | Definition |
| --- | --- |
| `factory_task_pkey` | `CREATE UNIQUE INDEX factory_task_pkey ON public.factory_task USING btree (factory_task_id)` |
| `factory_task_slug_version_uniq` | `CREATE UNIQUE INDEX factory_task_slug_version_uniq ON public.factory_task USING btree (slug, version)` |

## RLS policies

_None._

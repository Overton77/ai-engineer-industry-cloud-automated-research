---
schema: public
relation: factory_environment_version
qualified_name: public.factory_environment_version
kind: table
---

# public.factory_environment_version

Database table public.factory_environment_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_environment_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_environment_version public.factory_environment_version environment_version_id slug version task_kind image_digest verifier_bundle_digest reward_contract_version protocol_version spec status created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `environment_version_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `slug` | `text` | no | — | — |
| 3 | `version` | `text` | no | — | — |
| 4 | `task_kind` | `text` | no | — | — |
| 5 | `image_digest` | `text` | no | — | — |
| 6 | `verifier_bundle_digest` | `text` | no | — | — |
| 7 | `reward_contract_version` | `text` | no | — | — |
| 8 | `protocol_version` | `text` | no | `'1'::text` | — |
| 9 | `spec` | `jsonb` | no | — | — |
| 10 | `status` | `text` | no | `'draft'::text` | — |
| 11 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_environment_status_check` | `check` | `CHECK (status = ANY (ARRAY['draft'::text, 'active'::text, 'retired'::text]))` | — |
| `factory_environment_task_kind_check` | `check` | `CHECK (task_kind = ANY (ARRAY['research_ingestion'::text, 'curriculum_generation'::text, 'app_feature'::text, 'app_repair'::text, 'learner_submission'::text, 'harness_optimization'::text]))` | — |
| `factory_environment_version_pkey` | `primary_key` | `PRIMARY KEY (environment_version_id)` | — |
| `factory_environment_slug_version_uniq` | `unique` | `UNIQUE (slug, version)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.factory_episode`](../../public/tables/factory_episode.md) | `factory_episode_environment_version_id_fkey` | `FOREIGN KEY (environment_version_id) REFERENCES factory_environment_version(environment_version_id) ON DELETE RESTRICT` |

## Indexes

| Name | Definition |
| --- | --- |
| `factory_environment_slug_version_uniq` | `CREATE UNIQUE INDEX factory_environment_slug_version_uniq ON public.factory_environment_version USING btree (slug, version)` |
| `factory_environment_version_pkey` | `CREATE UNIQUE INDEX factory_environment_version_pkey ON public.factory_environment_version USING btree (environment_version_id)` |

## RLS policies

_None._

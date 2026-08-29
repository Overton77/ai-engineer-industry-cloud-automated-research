---
schema: public
relation: factory_component_version
qualified_name: public.factory_component_version
kind: table
---

# public.factory_component_version

Database table public.factory_component_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_component_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_component_version public.factory_component_version component_version_id component_kind slug version content_digest source_revision storage_uri metadata created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `component_version_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `component_kind` | `text` | no | — | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `version` | `text` | no | — | — |
| 5 | `content_digest` | `text` | no | — | — |
| 6 | `source_revision` | `text` | no | — | — |
| 7 | `storage_uri` | `text` | yes | — | — |
| 8 | `metadata` | `jsonb` | no | `'{}'::jsonb` | — |
| 9 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_component_kind_check` | `check` | `CHECK (component_kind = ANY (ARRAY['instructions'::text, 'skill'::text, 'tool'::text, 'retriever'::text, 'workflow'::text, 'model_route'::text, 'memory_policy'::text, 'application_code'::text, 'model_weights'::text, 'verifier'::text, 'reward_contract'::text]))` | — |
| `factory_component_version_pkey` | `primary_key` | `PRIMARY KEY (component_version_id)` | — |
| `factory_component_slug_version_uniq` | `unique` | `UNIQUE (component_kind, slug, version)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.factory_evolution_proposal`](../../public/tables/factory_evolution_proposal.md) | `factory_evolution_proposal_rollback_component_version_id_fkey` | `FOREIGN KEY (rollback_component_version_id) REFERENCES factory_component_version(component_version_id) ON DELETE RESTRICT` |
| [`public.factory_promotion_decision`](../../public/tables/factory_promotion_decision.md) | `factory_promotion_decision_rollback_component_version_id_fkey` | `FOREIGN KEY (rollback_component_version_id) REFERENCES factory_component_version(component_version_id) ON DELETE RESTRICT` |

## Indexes

| Name | Definition |
| --- | --- |
| `factory_component_slug_version_uniq` | `CREATE UNIQUE INDEX factory_component_slug_version_uniq ON public.factory_component_version USING btree (component_kind, slug, version)` |
| `factory_component_version_pkey` | `CREATE UNIQUE INDEX factory_component_version_pkey ON public.factory_component_version USING btree (component_version_id)` |

## Triggers

_None._

## RLS policies

_None._

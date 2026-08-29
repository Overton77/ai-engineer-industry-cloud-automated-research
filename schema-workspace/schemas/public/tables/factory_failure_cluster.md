---
schema: public
relation: factory_failure_cluster
qualified_name: public.factory_failure_cluster
kind: table
---

# public.factory_failure_cluster

Database table public.factory_failure_cluster.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_failure_cluster"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_failure_cluster public.factory_failure_cluster factory_failure_cluster_id signature title taxonomy_code severity affected_episode_ids evidence status created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_failure_cluster_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `signature` | `text` | no | — | — |
| 3 | `title` | `text` | no | — | — |
| 4 | `taxonomy_code` | `text` | no | — | — |
| 5 | `severity` | `text` | no | — | — |
| 6 | `affected_episode_ids` | `uuid[]` | no | `'{}'::uuid[]` | — |
| 7 | `evidence` | `jsonb` | no | — | — |
| 8 | `status` | `text` | no | `'open'::text` | — |
| 9 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 10 | `updated_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_failure_severity_check` | `check` | `CHECK (severity = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'critical'::text]))` | — |
| `factory_failure_status_check` | `check` | `CHECK (status = ANY (ARRAY['open'::text, 'triaged'::text, 'eval_drafted'::text, 'mitigated'::text, 'accepted'::text, 'invalid'::text]))` | — |
| `factory_failure_cluster_pkey` | `primary_key` | `PRIMARY KEY (factory_failure_cluster_id)` | — |
| `factory_failure_cluster_signature_key` | `unique` | `UNIQUE (signature)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.factory_evolution_proposal`](../../public/tables/factory_evolution_proposal.md) | `factory_evolution_proposal_failure_cluster_id_fkey` | `FOREIGN KEY (failure_cluster_id) REFERENCES factory_failure_cluster(factory_failure_cluster_id) ON DELETE SET NULL` |

## Indexes

| Name | Definition |
| --- | --- |
| `factory_failure_cluster_pkey` | `CREATE UNIQUE INDEX factory_failure_cluster_pkey ON public.factory_failure_cluster USING btree (factory_failure_cluster_id)` |
| `factory_failure_cluster_signature_key` | `CREATE UNIQUE INDEX factory_failure_cluster_signature_key ON public.factory_failure_cluster USING btree (signature)` |

## Triggers

_None._

## RLS policies

_None._

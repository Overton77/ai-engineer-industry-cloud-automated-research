---
schema: ranking
relation: feature_definition
qualified_name: ranking.feature_definition
kind: table
---

# ranking.feature_definition

Database table ranking.feature_definition.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["feature_definition"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking feature_definition ranking.feature_definition id slug version expression inputs created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `slug` | `text` | no | — | — |
| 3 | `version` | `integer` | no | `1` | — |
| 4 | `expression` | `text` | no | — | — |
| 5 | `inputs` | `jsonb` | no | `'[]'::jsonb` | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `feature_definition_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `feature_definition_slug_key` | `unique` | `UNIQUE (slug)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`ranking.feature_value`](../../ranking/tables/feature_value.md) | `feature_value_feature_definition_id_fkey` | `FOREIGN KEY (feature_definition_id) REFERENCES ranking.feature_definition(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `feature_definition_pkey` | `CREATE UNIQUE INDEX feature_definition_pkey ON ranking.feature_definition USING btree (id)` |
| `feature_definition_slug_key` | `CREATE UNIQUE INDEX feature_definition_slug_key ON ranking.feature_definition USING btree (slug)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

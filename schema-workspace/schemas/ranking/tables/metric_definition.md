---
schema: ranking
relation: metric_definition
qualified_name: ranking.metric_definition
kind: table
---

# ranking.metric_definition

Database table ranking.metric_definition.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["metric_definition"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking metric_definition ranking.metric_definition id tenant_id slug label created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `label` | `text` | no | — | — |
| 5 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `metric_definition_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `metric_definition_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`ranking.metric_definition_version`](../../ranking/tables/metric_definition_version.md) | `metric_definition_version_metric_definition_id_fkey` | `FOREIGN KEY (metric_definition_id) REFERENCES ranking.metric_definition(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `metric_definition_pkey` | `CREATE UNIQUE INDEX metric_definition_pkey ON ranking.metric_definition USING btree (id)` |
| `metric_definition_tenant_id_slug_key` | `CREATE UNIQUE INDEX metric_definition_tenant_id_slug_key ON ranking.metric_definition USING btree (tenant_id, slug)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

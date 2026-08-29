---
schema: orchestration
relation: provider_route
qualified_name: orchestration.provider_route
kind: table
---

# orchestration.provider_route

Database table orchestration.provider_route.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["provider_route"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration provider_route orchestration.provider_route id abstract_operation provider policy_version selection_rules priority enabled failure_rollup created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `abstract_operation` | `text` | no | — | — |
| 3 | `provider` | `text` | no | — | — |
| 4 | `policy_version` | `integer` | no | `1` | — |
| 5 | `selection_rules` | `jsonb` | no | `'{}'::jsonb` | — |
| 6 | `priority` | `integer` | no | `100` | — |
| 7 | `enabled` | `boolean` | no | `true` | — |
| 8 | `failure_rollup` | `jsonb` | no | `'{}'::jsonb` | — |
| 9 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `provider_route_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `provider_route_abstract_operation_provider_policy_version_key` | `unique` | `UNIQUE (abstract_operation, provider, policy_version)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `provider_route_abstract_operation_provider_policy_version_key` | `CREATE UNIQUE INDEX provider_route_abstract_operation_provider_policy_version_key ON orchestration.provider_route USING btree (abstract_operation, provider, policy_version)` |
| `provider_route_pkey` | `CREATE UNIQUE INDEX provider_route_pkey ON orchestration.provider_route USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

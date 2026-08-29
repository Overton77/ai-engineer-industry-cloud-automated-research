---
schema: orchestration
relation: intent_type
qualified_name: orchestration.intent_type
kind: table
---

# orchestration.intent_type

Database table orchestration.intent_type.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["intent_type"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration intent_type orchestration.intent_type code description schema_version created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `code` | `text` | no | — | — |
| 2 | `description` | `text` | no | — | — |
| 3 | `schema_version` | `integer` | no | `1` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `intent_type_pkey` | `primary_key` | `PRIMARY KEY (code)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.operation_intent`](../../orchestration/tables/operation_intent.md) | `operation_intent_intent_type_fkey` | `FOREIGN KEY (intent_type) REFERENCES orchestration.intent_type(code)` |

## Indexes

| Name | Definition |
| --- | --- |
| `intent_type_pkey` | `CREATE UNIQUE INDEX intent_type_pkey ON orchestration.intent_type USING btree (code)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

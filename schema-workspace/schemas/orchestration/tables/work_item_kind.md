---
schema: orchestration
relation: work_item_kind
qualified_name: orchestration.work_item_kind
kind: table
---

# orchestration.work_item_kind

Database table orchestration.work_item_kind.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["work_item_kind"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration work_item_kind orchestration.work_item_kind code description created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `code` | `text` | no | — | — |
| 2 | `description` | `text` | no | — | — |
| 3 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `work_item_kind_pkey` | `primary_key` | `PRIMARY KEY (code)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `work_item_kind_fkey` | `FOREIGN KEY (kind) REFERENCES orchestration.work_item_kind(code)` |

## Indexes

| Name | Definition |
| --- | --- |
| `work_item_kind_pkey` | `CREATE UNIQUE INDEX work_item_kind_pkey ON orchestration.work_item_kind USING btree (code)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

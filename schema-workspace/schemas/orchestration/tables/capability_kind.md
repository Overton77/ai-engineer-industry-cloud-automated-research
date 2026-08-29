---
schema: orchestration
relation: capability_kind
qualified_name: orchestration.capability_kind
kind: table
---

# orchestration.capability_kind

Database table orchestration.capability_kind.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["capability_kind"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration capability_kind orchestration.capability_kind code description created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `code` | `text` | no | — | — |
| 2 | `description` | `text` | no | — | — |
| 3 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `capability_kind_pkey` | `primary_key` | `PRIMARY KEY (code)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.capability`](../../orchestration/tables/capability.md) | `capability_kind_fkey` | `FOREIGN KEY (kind) REFERENCES orchestration.capability_kind(code)` |

## Indexes

| Name | Definition |
| --- | --- |
| `capability_kind_pkey` | `CREATE UNIQUE INDEX capability_kind_pkey ON orchestration.capability_kind USING btree (code)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

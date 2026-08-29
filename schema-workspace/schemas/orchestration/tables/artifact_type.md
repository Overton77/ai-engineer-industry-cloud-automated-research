---
schema: orchestration
relation: artifact_type
qualified_name: orchestration.artifact_type
kind: table
---

# orchestration.artifact_type

Database table orchestration.artifact_type.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["artifact_type"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration artifact_type orchestration.artifact_type code description created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `code` | `text` | no | — | — |
| 2 | `description` | `text` | no | — | — |
| 3 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `artifact_type_pkey` | `primary_key` | `PRIMARY KEY (code)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `artifact_artifact_type_fkey` | `FOREIGN KEY (artifact_type) REFERENCES orchestration.artifact_type(code)` |

## Indexes

| Name | Definition |
| --- | --- |
| `artifact_type_pkey` | `CREATE UNIQUE INDEX artifact_type_pkey ON orchestration.artifact_type USING btree (code)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: orchestration
relation: work_item_artifact
qualified_name: orchestration.work_item_artifact
kind: table
---

# orchestration.work_item_artifact

Database table orchestration.work_item_artifact.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["work_item_artifact"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration work_item_artifact orchestration.work_item_artifact work_item_id artifact_id role`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `work_item_id` | `uuid` | no | — | — |
| 2 | `artifact_id` | `uuid` | no | — | — |
| 3 | `role` | `text` | no | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `work_item_artifact_role_check` | `check` | `CHECK (role = ANY (ARRAY['produced'::text, 'consumed'::text]))` | — |
| `work_item_artifact_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (artifact_id) REFERENCES orchestration.artifact(id) ON DELETE CASCADE` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `work_item_artifact_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `work_item_artifact_pkey` | `primary_key` | `PRIMARY KEY (work_item_id, artifact_id, role)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `work_item_artifact_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (artifact_id) REFERENCES orchestration.artifact(id) ON DELETE CASCADE` |
| `work_item_artifact_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `work_item_artifact_pkey` | `CREATE UNIQUE INDEX work_item_artifact_pkey ON orchestration.work_item_artifact USING btree (work_item_id, artifact_id, role)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

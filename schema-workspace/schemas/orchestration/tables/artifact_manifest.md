---
schema: orchestration
relation: artifact_manifest
qualified_name: orchestration.artifact_manifest
kind: table
---

# orchestration.artifact_manifest

Database table orchestration.artifact_manifest.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["artifact_manifest"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration artifact_manifest orchestration.artifact_manifest id mission_id work_item_id required produced omitted failed deferred created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mission_id` | `uuid` | yes | — | — |
| 3 | `work_item_id` | `uuid` | yes | — | — |
| 4 | `required` | `jsonb` | no | `'[]'::jsonb` | — |
| 5 | `produced` | `jsonb` | no | `'[]'::jsonb` | — |
| 6 | `omitted` | `jsonb` | no | `'[]'::jsonb` | — |
| 7 | `failed` | `jsonb` | no | `'[]'::jsonb` | — |
| 8 | `deferred` | `jsonb` | no | `'[]'::jsonb` | — |
| 9 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `artifact_manifest_scope` | `check` | `CHECK (num_nonnulls(mission_id, work_item_id) >= 1)` | — |
| `artifact_manifest_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `artifact_manifest_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `artifact_manifest_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `artifact_manifest_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| `artifact_manifest_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `artifact_manifest_pkey` | `CREATE UNIQUE INDEX artifact_manifest_pkey ON orchestration.artifact_manifest USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: orchestration
relation: work_item_dependency
qualified_name: orchestration.work_item_dependency
kind: table
---

# orchestration.work_item_dependency

Database table orchestration.work_item_dependency.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["work_item_dependency"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration work_item_dependency orchestration.work_item_dependency work_item_id depends_on_id dependency_kind created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `work_item_id` | `uuid` | no | — | — |
| 2 | `depends_on_id` | `uuid` | no | — | — |
| 3 | `dependency_kind` | `text` | no | `'completion'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `work_item_dependency_dependency_kind_check` | `check` | `CHECK (dependency_kind = ANY (ARRAY['completion'::text, 'artifact'::text, 'approval'::text, 'data'::text]))` | — |
| `work_item_dependency_no_self` | `check` | `CHECK (work_item_id <> depends_on_id)` | — |
| `work_item_dependency_depends_on_id_fkey` | `foreign_key` | `FOREIGN KEY (depends_on_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `work_item_dependency_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `work_item_dependency_pkey` | `primary_key` | `PRIMARY KEY (work_item_id, depends_on_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `work_item_dependency_depends_on_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (depends_on_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |
| `work_item_dependency_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `work_item_dependency_pkey` | `CREATE UNIQUE INDEX work_item_dependency_pkey ON orchestration.work_item_dependency USING btree (work_item_id, depends_on_id)` |
| `work_item_dependency_reverse_idx` | `CREATE INDEX work_item_dependency_reverse_idx ON orchestration.work_item_dependency USING btree (depends_on_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: research
relation: report
qualified_name: research.report
kind: table
---

# research.report

Database table research.report.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["research"]["Tables"]["report"]["Row"]`
- Row-level security: enabled
- Search tokens: `research report research.report id tenant_id mission_id slug title created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `mission_id` | `uuid` | yes | — | — |
| 4 | `slug` | `text` | no | — | — |
| 5 | `title` | `text` | no | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `report_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `report_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `report_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `report_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`research.report_version`](../../research/tables/report_version.md) | `report_version_report_id_fkey` | `FOREIGN KEY (report_id) REFERENCES research.report(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `report_pkey` | `CREATE UNIQUE INDEX report_pkey ON research.report USING btree (id)` |
| `report_tenant_id_slug_key` | `CREATE UNIQUE INDEX report_tenant_id_slug_key ON research.report USING btree (tenant_id, slug)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

---
schema: ranking
relation: selection
qualified_name: ranking.selection
kind: table
---

# ranking.selection

Database table ranking.selection.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["selection"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking selection ranking.selection id tenant_id run_id purpose selected diversity_rationale coverage_rationale created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `run_id` | `uuid` | yes | — | — |
| 4 | `purpose` | `text` | no | — | — |
| 5 | `selected` | `jsonb` | no | `'[]'::jsonb` | — |
| 6 | `diversity_rationale` | `text` | yes | — | — |
| 7 | `coverage_rationale` | `text` | yes | — | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `selection_run_id_fkey` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES ranking.ranking_run(id)` | [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) |
| `selection_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `selection_run_id_fkey` | [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) | `FOREIGN KEY (run_id) REFERENCES ranking.ranking_run(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.mission`](../../orchestration/tables/mission.md) | `mission_selection_fk` | `FOREIGN KEY (selection_id) REFERENCES ranking.selection(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `selection_pkey` | `CREATE UNIQUE INDEX selection_pkey ON ranking.selection USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

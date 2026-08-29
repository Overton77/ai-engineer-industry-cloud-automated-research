---
schema: research
relation: comparison
qualified_name: research.comparison
kind: table
---

# research.comparison

Database table research.comparison.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["research"]["Tables"]["comparison"]["Row"]`
- Row-level security: enabled
- Search tokens: `research comparison research.comparison id mission_id title entity_kind entity_ids dimensions verdicts created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mission_id` | `uuid` | no | — | — |
| 3 | `title` | `text` | no | — | — |
| 4 | `entity_kind` | `text` | no | — | — |
| 5 | `entity_ids` | `uuid[]` | no | `'{}'::uuid[]` | — |
| 6 | `dimensions` | `jsonb` | no | `'[]'::jsonb` | — |
| 7 | `verdicts` | `jsonb` | no | `'{}'::jsonb` | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `comparison_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `comparison_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `comparison_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `comparison_pkey` | `CREATE UNIQUE INDEX comparison_pkey ON research.comparison USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

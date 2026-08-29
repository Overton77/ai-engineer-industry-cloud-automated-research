---
schema: orchestration
relation: mission_event
qualified_name: orchestration.mission_event
kind: table
---

# orchestration.mission_event

Database table orchestration.mission_event.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["mission_event"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration mission_event orchestration.mission_event id mission_id from_status to_status actor reason causation_id payload occurred_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mission_id` | `uuid` | no | — | — |
| 3 | `from_status` | `orchestration.mission_status` | yes | — | — |
| 4 | `to_status` | `orchestration.mission_status` | no | — | — |
| 5 | `actor` | `text` | no | — | — |
| 6 | `reason` | `text` | yes | — | — |
| 7 | `causation_id` | `uuid` | yes | — | — |
| 8 | `payload` | `jsonb` | no | `'{}'::jsonb` | — |
| 9 | `occurred_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `mission_event_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `mission_event_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `mission_event_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `mission_event_mission_idx` | `CREATE INDEX mission_event_mission_idx ON orchestration.mission_event USING btree (mission_id, occurred_at)` |
| `mission_event_pkey` | `CREATE UNIQUE INDEX mission_event_pkey ON orchestration.mission_event USING btree (id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `mission_event_immutable` | `util.reject_mutation` | `CREATE TRIGGER mission_event_immutable BEFORE DELETE OR UPDATE ON orchestration.mission_event FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

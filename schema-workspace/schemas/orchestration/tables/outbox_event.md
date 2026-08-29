---
schema: orchestration
relation: outbox_event
qualified_name: orchestration.outbox_event
kind: table
---

# orchestration.outbox_event

Database table orchestration.outbox_event.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["outbox_event"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration outbox_event orchestration.outbox_event id topic payload mission_id causation_id published_at created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `bigint` | no | `nextval('orchestration.outbox_event_id_seq'::regclass)` | — |
| 2 | `topic` | `text` | no | — | — |
| 3 | `payload` | `jsonb` | no | — | — |
| 4 | `mission_id` | `uuid` | yes | — | — |
| 5 | `causation_id` | `uuid` | yes | — | — |
| 6 | `published_at` | `timestamp with time zone` | yes | — | — |
| 7 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `outbox_event_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `outbox_event_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `outbox_event_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `outbox_event_pkey` | `CREATE UNIQUE INDEX outbox_event_pkey ON orchestration.outbox_event USING btree (id)` |
| `outbox_event_unpublished_idx` | `CREATE INDEX outbox_event_unpublished_idx ON orchestration.outbox_event USING btree (created_at) WHERE (published_at IS NULL)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: orchestration
relation: agent_session
qualified_name: orchestration.agent_session
kind: table
---

# orchestration.agent_session

Database table orchestration.agent_session.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["agent_session"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration agent_session orchestration.agent_session id tenant_id eve_session_id mission_id agent_deployment compaction_count rotated_from_id status started_at ended_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `eve_session_id` | `text` | no | — | — |
| 4 | `mission_id` | `uuid` | yes | — | — |
| 5 | `agent_deployment` | `text` | no | — | — |
| 6 | `compaction_count` | `integer` | no | `0` | — |
| 7 | `rotated_from_id` | `uuid` | yes | — | — |
| 8 | `status` | `text` | no | `'active'::text` | — |
| 9 | `started_at` | `timestamp with time zone` | no | `now()` | — |
| 10 | `ended_at` | `timestamp with time zone` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `agent_session_status_check` | `check` | `CHECK (status = ANY (ARRAY['active'::text, 'rotated'::text, 'closed'::text, 'failed'::text]))` | — |
| `agent_session_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `agent_session_rotated_from_id_fkey` | `foreign_key` | `FOREIGN KEY (rotated_from_id) REFERENCES orchestration.agent_session(id)` | [`orchestration.agent_session`](../../orchestration/tables/agent_session.md) |
| `agent_session_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `agent_session_eve_session_id_key` | `unique` | `UNIQUE (eve_session_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `agent_session_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` |
| `agent_session_rotated_from_id_fkey` | [`orchestration.agent_session`](../../orchestration/tables/agent_session.md) | `FOREIGN KEY (rotated_from_id) REFERENCES orchestration.agent_session(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.agent_session`](../../orchestration/tables/agent_session.md) | `agent_session_rotated_from_id_fkey` | `FOREIGN KEY (rotated_from_id) REFERENCES orchestration.agent_session(id)` |
| [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `attempt_agent_session_id_fkey` | `FOREIGN KEY (agent_session_id) REFERENCES orchestration.agent_session(id)` |
| [`orchestration.continuation_checkpoint`](../../orchestration/tables/continuation_checkpoint.md) | `continuation_checkpoint_agent_session_id_fkey` | `FOREIGN KEY (agent_session_id) REFERENCES orchestration.agent_session(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `agent_session_eve_session_id_key` | `CREATE UNIQUE INDEX agent_session_eve_session_id_key ON orchestration.agent_session USING btree (eve_session_id)` |
| `agent_session_mission_idx` | `CREATE INDEX agent_session_mission_idx ON orchestration.agent_session USING btree (mission_id)` |
| `agent_session_pkey` | `CREATE UNIQUE INDEX agent_session_pkey ON orchestration.agent_session USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

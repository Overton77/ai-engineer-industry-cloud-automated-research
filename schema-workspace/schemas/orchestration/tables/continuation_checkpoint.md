---
schema: orchestration
relation: continuation_checkpoint
qualified_name: orchestration.continuation_checkpoint
kind: table
---

# orchestration.continuation_checkpoint

Database table orchestration.continuation_checkpoint.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["continuation_checkpoint"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration continuation_checkpoint orchestration.continuation_checkpoint id mission_id agent_session_id constraints_section decisions completed active blocked failed_approaches pending_approvals digests refs verification_status package_artifact_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mission_id` | `uuid` | no | — | — |
| 3 | `agent_session_id` | `uuid` | yes | — | — |
| 4 | `constraints_section` | `jsonb` | no | `'{}'::jsonb` | — |
| 5 | `decisions` | `jsonb` | no | `'{}'::jsonb` | — |
| 6 | `completed` | `jsonb` | no | `'{}'::jsonb` | — |
| 7 | `active` | `jsonb` | no | `'{}'::jsonb` | — |
| 8 | `blocked` | `jsonb` | no | `'{}'::jsonb` | — |
| 9 | `failed_approaches` | `jsonb` | no | `'{}'::jsonb` | — |
| 10 | `pending_approvals` | `jsonb` | no | `'{}'::jsonb` | — |
| 11 | `digests` | `jsonb` | no | `'{}'::jsonb` | — |
| 12 | `refs` | `jsonb` | no | `'{}'::jsonb` | — |
| 13 | `verification_status` | `text` | no | `'unverified'::text` | — |
| 14 | `package_artifact_id` | `uuid` | yes | — | — |
| 15 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `continuation_checkpoint_verification_status_check` | `check` | `CHECK (verification_status = ANY (ARRAY['unverified'::text, 'verified'::text, 'failed'::text]))` | — |
| `continuation_checkpoint_agent_session_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_session_id) REFERENCES orchestration.agent_session(id)` | [`orchestration.agent_session`](../../orchestration/tables/agent_session.md) |
| `continuation_checkpoint_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `continuation_checkpoint_package_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (package_artifact_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `continuation_checkpoint_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `continuation_checkpoint_agent_session_id_fkey` | [`orchestration.agent_session`](../../orchestration/tables/agent_session.md) | `FOREIGN KEY (agent_session_id) REFERENCES orchestration.agent_session(id)` |
| `continuation_checkpoint_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| `continuation_checkpoint_package_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (package_artifact_id) REFERENCES orchestration.artifact(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `continuation_checkpoint_mission_idx` | `CREATE INDEX continuation_checkpoint_mission_idx ON orchestration.continuation_checkpoint USING btree (mission_id, created_at DESC)` |
| `continuation_checkpoint_pkey` | `CREATE UNIQUE INDEX continuation_checkpoint_pkey ON orchestration.continuation_checkpoint USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: research
relation: downstream_handoff
qualified_name: research.downstream_handoff
kind: table
---

# research.downstream_handoff

Database table research.downstream_handoff.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["research"]["Tables"]["downstream_handoff"]["Row"]`
- Row-level security: enabled
- Search tokens: `research downstream_handoff research.downstream_handoff id mission_id target_pipeline payload_artifact_id consumed_by_work_item_id status created_at consumed_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mission_id` | `uuid` | no | — | — |
| 3 | `target_pipeline` | `text` | no | — | — |
| 4 | `payload_artifact_id` | `uuid` | yes | — | — |
| 5 | `consumed_by_work_item_id` | `uuid` | yes | — | — |
| 6 | `status` | `text` | no | `'pending'::text` | — |
| 7 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 8 | `consumed_at` | `timestamp with time zone` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `downstream_handoff_status_check` | `check` | `CHECK (status = ANY (ARRAY['pending'::text, 'consumed'::text, 'failed'::text, 'cancelled'::text]))` | — |
| `downstream_handoff_target_pipeline_check` | `check` | `CHECK (target_pipeline = ANY (ARRAY['curriculum'::text, 'challenge'::text, 'retrieval'::text, 'ranking'::text, 'publication'::text]))` | — |
| `downstream_handoff_consumed_by_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (consumed_by_work_item_id) REFERENCES orchestration.work_item(id)` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `downstream_handoff_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `downstream_handoff_payload_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (payload_artifact_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `downstream_handoff_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `downstream_handoff_consumed_by_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (consumed_by_work_item_id) REFERENCES orchestration.work_item(id)` |
| `downstream_handoff_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| `downstream_handoff_payload_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (payload_artifact_id) REFERENCES orchestration.artifact(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `downstream_handoff_pending_idx` | `CREATE INDEX downstream_handoff_pending_idx ON research.downstream_handoff USING btree (target_pipeline, created_at) WHERE (status = 'pending'::text)` |
| `downstream_handoff_pkey` | `CREATE UNIQUE INDEX downstream_handoff_pkey ON research.downstream_handoff USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

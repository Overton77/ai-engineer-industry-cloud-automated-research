---
schema: evidence
relation: revalidation_event
qualified_name: evidence.revalidation_event
kind: table
---

# evidence.revalidation_event

Database table evidence.revalidation_event.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["revalidation_event"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence revalidation_event evidence.revalidation_event id policy_id trigger_kind affected_refs work_item_id fired_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `policy_id` | `uuid` | yes | — | — |
| 3 | `trigger_kind` | `text` | no | — | — |
| 4 | `affected_refs` | `jsonb` | no | `'[]'::jsonb` | — |
| 5 | `work_item_id` | `uuid` | yes | — | — |
| 6 | `fired_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `revalidation_event_trigger_kind_check` | `check` | `CHECK (trigger_kind = ANY (ARRAY['time'::text, 'release'::text, 'source_change'::text, 'security'::text, 'retraction'::text, 'contradiction'::text, 'eval_failure'::text, 'downstream_use'::text, 'manual'::text]))` | — |
| `revalidation_event_policy_id_fkey` | `foreign_key` | `FOREIGN KEY (policy_id) REFERENCES evidence.revalidation_policy(id)` | [`evidence.revalidation_policy`](../../evidence/tables/revalidation_policy.md) |
| `revalidation_event_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id)` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `revalidation_event_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `revalidation_event_policy_id_fkey` | [`evidence.revalidation_policy`](../../evidence/tables/revalidation_policy.md) | `FOREIGN KEY (policy_id) REFERENCES evidence.revalidation_policy(id)` |
| `revalidation_event_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `revalidation_event_fired_idx` | `CREATE INDEX revalidation_event_fired_idx ON evidence.revalidation_event USING btree (fired_at DESC)` |
| `revalidation_event_pkey` | `CREATE UNIQUE INDEX revalidation_event_pkey ON evidence.revalidation_event USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

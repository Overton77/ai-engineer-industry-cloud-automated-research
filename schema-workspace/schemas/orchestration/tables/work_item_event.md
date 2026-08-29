---
schema: orchestration
relation: work_item_event
qualified_name: orchestration.work_item_event
kind: table
---

# orchestration.work_item_event

Append-only cross-agent progress ledger. Lease state remains on work_item; every transition and checkpoint is recorded here.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["work_item_event"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration work_item_event orchestration.work_item_event id tenant_id work_item_id attempt_id event_type actor message payload occurred_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `work_item_id` | `uuid` | no | — | — |
| 4 | `attempt_id` | `uuid` | yes | — | — |
| 5 | `event_type` | `text` | no | — | — |
| 6 | `actor` | `text` | no | — | — |
| 7 | `message` | `text` | yes | — | — |
| 8 | `payload` | `jsonb` | no | `'{}'::jsonb` | — |
| 9 | `occurred_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `work_item_event_event_type_check` | `check` | `CHECK (event_type = ANY (ARRAY['created'::text, 'ready'::text, 'claimed'::text, 'heartbeat'::text, 'checkpoint'::text, 'blocked'::text, 'released'::text, 'succeeded'::text, 'failed'::text, 'cancelled'::text, 'skipped'::text]))` | — |
| `work_item_event_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (attempt_id) REFERENCES orchestration.attempt(id) ON DELETE SET NULL` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `work_item_event_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `work_item_event_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `work_item_event_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (attempt_id) REFERENCES orchestration.attempt(id) ON DELETE SET NULL` |
| `work_item_event_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `work_item_event_attempt_idx` | `CREATE INDEX work_item_event_attempt_idx ON orchestration.work_item_event USING btree (attempt_id) WHERE (attempt_id IS NOT NULL)` |
| `work_item_event_item_idx` | `CREATE INDEX work_item_event_item_idx ON orchestration.work_item_event USING btree (work_item_id, occurred_at)` |
| `work_item_event_pkey` | `CREATE UNIQUE INDEX work_item_event_pkey ON orchestration.work_item_event USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

---
schema: orchestration
relation: operation_intent
qualified_name: orchestration.operation_intent
kind: table
---

# orchestration.operation_intent

Database table orchestration.operation_intent.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["operation_intent"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration operation_intent orchestration.operation_intent id tenant_id intent_type schema_version payload preconditions idempotency_key proposed_by_attempt mission_id approval_state policy_decision created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `intent_type` | `text` | no | — | — |
| 4 | `schema_version` | `integer` | no | `1` | — |
| 5 | `payload` | `jsonb` | no | — | — |
| 6 | `preconditions` | `jsonb` | no | `'{}'::jsonb` | — |
| 7 | `idempotency_key` | `text` | no | — | — |
| 8 | `proposed_by_attempt` | `uuid` | yes | — | — |
| 9 | `mission_id` | `uuid` | yes | — | — |
| 10 | `approval_state` | `text` | no | `'pending'::text` | — |
| 11 | `policy_decision` | `jsonb` | yes | — | — |
| 12 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `operation_intent_approval_state_check` | `check` | `CHECK (approval_state = ANY (ARRAY['pending'::text, 'approved'::text, 'budgeted'::text, 'denied'::text, 'escalated'::text]))` | — |
| `operation_intent_intent_type_fkey` | `foreign_key` | `FOREIGN KEY (intent_type) REFERENCES orchestration.intent_type(code)` | [`orchestration.intent_type`](../../orchestration/tables/intent_type.md) |
| `operation_intent_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `operation_intent_proposed_by_attempt_fkey` | `foreign_key` | `FOREIGN KEY (proposed_by_attempt) REFERENCES orchestration.attempt(id)` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `operation_intent_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `operation_intent_idempotency_key_key` | `unique` | `UNIQUE (idempotency_key)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `operation_intent_intent_type_fkey` | [`orchestration.intent_type`](../../orchestration/tables/intent_type.md) | `FOREIGN KEY (intent_type) REFERENCES orchestration.intent_type(code)` |
| `operation_intent_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` |
| `operation_intent_proposed_by_attempt_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (proposed_by_attempt) REFERENCES orchestration.attempt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `operation_receipt_intent_id_fkey` | `FOREIGN KEY (intent_id) REFERENCES orchestration.operation_intent(id)` |
| [`staging.resolution_decision`](../../staging/tables/resolution_decision.md) | `resolution_decision_intent_id_fkey` | `FOREIGN KEY (intent_id) REFERENCES orchestration.operation_intent(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `operation_intent_idempotency_key_key` | `CREATE UNIQUE INDEX operation_intent_idempotency_key_key ON orchestration.operation_intent USING btree (idempotency_key)` |
| `operation_intent_mission_idx` | `CREATE INDEX operation_intent_mission_idx ON orchestration.operation_intent USING btree (mission_id)` |
| `operation_intent_pkey` | `CREATE UNIQUE INDEX operation_intent_pkey ON orchestration.operation_intent USING btree (id)` |
| `operation_intent_state_idx` | `CREATE INDEX operation_intent_state_idx ON orchestration.operation_intent USING btree (approval_state, created_at)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

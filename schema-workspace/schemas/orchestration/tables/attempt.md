---
schema: orchestration
relation: attempt
qualified_name: orchestration.attempt
kind: table
---

# orchestration.attempt

Database table orchestration.attempt.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["attempt"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration attempt orchestration.attempt id tenant_id work_item_id attempt_no agent_deployment_id agent_session_id eve_turn_ids remote_child_ids outcome cost_usd latency_ms token_input token_output started_at ended_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `work_item_id` | `uuid` | no | — | — |
| 4 | `attempt_no` | `integer` | no | — | — |
| 5 | `agent_deployment_id` | `text` | no | — | — |
| 6 | `agent_session_id` | `uuid` | yes | — | — |
| 7 | `eve_turn_ids` | `text[]` | no | `'{}'::text[]` | — |
| 8 | `remote_child_ids` | `text[]` | no | `'{}'::text[]` | — |
| 9 | `outcome` | `orchestration.attempt_outcome` | yes | — | — |
| 10 | `cost_usd` | `numeric(12,4)` | yes | — | — |
| 11 | `latency_ms` | `bigint` | yes | — | — |
| 12 | `token_input` | `bigint` | yes | — | — |
| 13 | `token_output` | `bigint` | yes | — | — |
| 14 | `started_at` | `timestamp with time zone` | no | `now()` | — |
| 15 | `ended_at` | `timestamp with time zone` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `attempt_agent_session_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_session_id) REFERENCES orchestration.agent_session(id)` | [`orchestration.agent_session`](../../orchestration/tables/agent_session.md) |
| `attempt_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `attempt_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `attempt_work_item_id_attempt_no_key` | `unique` | `UNIQUE (work_item_id, attempt_no)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `attempt_agent_session_id_fkey` | [`orchestration.agent_session`](../../orchestration/tables/agent_session.md) | `FOREIGN KEY (agent_session_id) REFERENCES orchestration.agent_session(id)` |
| `attempt_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.claim`](../../evidence/tables/claim.md) | `claim_producer_attempt_id_fkey` | `FOREIGN KEY (producer_attempt_id) REFERENCES orchestration.attempt(id)` |
| [`evidence.extraction_signature`](../../evidence/tables/extraction_signature.md) | `extraction_signature_produced_by_attempt_id_fkey` | `FOREIGN KEY (produced_by_attempt_id) REFERENCES orchestration.attempt(id)` |
| [`evidence.source_capture`](../../evidence/tables/source_capture.md) | `source_capture_produced_by_attempt_id_fkey` | `FOREIGN KEY (produced_by_attempt_id) REFERENCES orchestration.attempt(id)` |
| [`evidence.verification_run`](../../evidence/tables/verification_run.md) | `verification_run_verifier_attempt_id_fkey` | `FOREIGN KEY (verifier_attempt_id) REFERENCES orchestration.attempt(id)` |
| [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `artifact_producer_attempt_id_fkey` | `FOREIGN KEY (producer_attempt_id) REFERENCES orchestration.attempt(id)` |
| [`orchestration.operation_intent`](../../orchestration/tables/operation_intent.md) | `operation_intent_proposed_by_attempt_fkey` | `FOREIGN KEY (proposed_by_attempt) REFERENCES orchestration.attempt(id)` |
| [`orchestration.work_item_event`](../../orchestration/tables/work_item_event.md) | `work_item_event_attempt_id_fkey` | `FOREIGN KEY (attempt_id) REFERENCES orchestration.attempt(id) ON DELETE SET NULL` |
| [`staging.candidate`](../../staging/tables/candidate.md) | `candidate_discovered_by_attempt_id_fkey` | `FOREIGN KEY (discovered_by_attempt_id) REFERENCES orchestration.attempt(id)` |
| [`staging.resolution_decision`](../../staging/tables/resolution_decision.md) | `resolution_decision_decided_by_attempt_id_fkey` | `FOREIGN KEY (decided_by_attempt_id) REFERENCES orchestration.attempt(id)` |
| [`staging.vetting_decision`](../../staging/tables/vetting_decision.md) | `vetting_decision_decided_by_attempt_id_fkey` | `FOREIGN KEY (decided_by_attempt_id) REFERENCES orchestration.attempt(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `attempt_deployment_idx` | `CREATE INDEX attempt_deployment_idx ON orchestration.attempt USING btree (agent_deployment_id)` |
| `attempt_pkey` | `CREATE UNIQUE INDEX attempt_pkey ON orchestration.attempt USING btree (id)` |
| `attempt_session_idx` | `CREATE INDEX attempt_session_idx ON orchestration.attempt USING btree (agent_session_id)` |
| `attempt_work_item_id_attempt_no_key` | `CREATE UNIQUE INDEX attempt_work_item_id_attempt_no_key ON orchestration.attempt USING btree (work_item_id, attempt_no)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

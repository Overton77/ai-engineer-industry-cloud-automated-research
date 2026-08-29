---
schema: staging
relation: vetting_decision
qualified_name: staging.vetting_decision
kind: table
---

# staging.vetting_decision

Database table staging.vetting_decision.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["vetting_decision"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging vetting_decision staging.vetting_decision id candidate_id outcome rationale review_task_id decided_by_attempt_id decided_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `candidate_id` | `uuid` | no | — | — |
| 3 | `outcome` | `staging.vetting_outcome` | no | — | — |
| 4 | `rationale` | `text` | no | — | — |
| 5 | `review_task_id` | `uuid` | yes | — | — |
| 6 | `decided_by_attempt_id` | `uuid` | yes | — | — |
| 7 | `decided_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `vetting_decision_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `vetting_decision_decided_by_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (decided_by_attempt_id) REFERENCES orchestration.attempt(id)` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `vetting_decision_review_task_fk` | `foreign_key` | `FOREIGN KEY (review_task_id) REFERENCES evaluation.review_task(id)` | `evaluation.review_task` |
| `vetting_decision_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `vetting_decision_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| `vetting_decision_decided_by_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (decided_by_attempt_id) REFERENCES orchestration.attempt(id)` |
| `vetting_decision_review_task_fk` | `evaluation.review_task` | `FOREIGN KEY (review_task_id) REFERENCES evaluation.review_task(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `vetting_decision_candidate_idx` | `CREATE INDEX vetting_decision_candidate_idx ON staging.vetting_decision USING btree (candidate_id)` |
| `vetting_decision_outcome_idx` | `CREATE INDEX vetting_decision_outcome_idx ON staging.vetting_decision USING btree (outcome, decided_at DESC)` |
| `vetting_decision_pkey` | `CREATE UNIQUE INDEX vetting_decision_pkey ON staging.vetting_decision USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

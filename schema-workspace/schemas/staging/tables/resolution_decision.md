---
schema: staging
relation: resolution_decision
qualified_name: staging.resolution_decision
kind: table
---

# staging.resolution_decision

Database table staging.resolution_decision.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["resolution_decision"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging resolution_decision staging.resolution_decision id candidate_id identity_match_id outcome rationale intent_id decided_by_attempt_id decided_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `candidate_id` | `uuid` | no | — | — |
| 3 | `identity_match_id` | `uuid` | yes | — | — |
| 4 | `outcome` | `staging.resolution_outcome` | no | — | — |
| 5 | `rationale` | `text` | yes | — | — |
| 6 | `intent_id` | `uuid` | yes | — | — |
| 7 | `decided_by_attempt_id` | `uuid` | yes | — | — |
| 8 | `decided_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `resolution_target_requires_match` | `check` | `CHECK ((outcome <> ALL (ARRAY['update'::staging.resolution_outcome, 'link'::staging.resolution_outcome, 'merge'::staging.resolution_outcome, 'supersede'::staging.resolution_outcome])) OR identity_match_id IS NOT NULL)` | — |
| `resolution_decision_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `resolution_decision_decided_by_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (decided_by_attempt_id) REFERENCES orchestration.attempt(id)` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `resolution_decision_identity_match_id_fkey` | `foreign_key` | `FOREIGN KEY (identity_match_id) REFERENCES staging.identity_match(id)` | [`staging.identity_match`](../../staging/tables/identity_match.md) |
| `resolution_decision_intent_id_fkey` | `foreign_key` | `FOREIGN KEY (intent_id) REFERENCES orchestration.operation_intent(id)` | [`orchestration.operation_intent`](../../orchestration/tables/operation_intent.md) |
| `resolution_decision_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `resolution_decision_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| `resolution_decision_decided_by_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (decided_by_attempt_id) REFERENCES orchestration.attempt(id)` |
| `resolution_decision_identity_match_id_fkey` | [`staging.identity_match`](../../staging/tables/identity_match.md) | `FOREIGN KEY (identity_match_id) REFERENCES staging.identity_match(id)` |
| `resolution_decision_intent_id_fkey` | [`orchestration.operation_intent`](../../orchestration/tables/operation_intent.md) | `FOREIGN KEY (intent_id) REFERENCES orchestration.operation_intent(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `resolution_decision_candidate_idx` | `CREATE INDEX resolution_decision_candidate_idx ON staging.resolution_decision USING btree (candidate_id)` |
| `resolution_decision_outcome_idx` | `CREATE INDEX resolution_decision_outcome_idx ON staging.resolution_decision USING btree (outcome, decided_at DESC)` |
| `resolution_decision_pkey` | `CREATE UNIQUE INDEX resolution_decision_pkey ON staging.resolution_decision USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

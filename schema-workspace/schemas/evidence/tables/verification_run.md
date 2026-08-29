---
schema: evidence
relation: verification_run
qualified_name: evidence.verification_run
kind: table
---

# evidence.verification_run

Database table evidence.verification_run.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["verification_run"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence verification_run evidence.verification_run id work_item_id verifier_attempt_id policy_version started_at ended_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `work_item_id` | `uuid` | yes | — | — |
| 3 | `verifier_attempt_id` | `uuid` | no | — | — |
| 4 | `policy_version` | `text` | no | — | — |
| 5 | `started_at` | `timestamp with time zone` | no | `now()` | — |
| 6 | `ended_at` | `timestamp with time zone` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `verification_run_verifier_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (verifier_attempt_id) REFERENCES orchestration.attempt(id)` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `verification_run_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id)` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `verification_run_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `verification_run_verifier_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (verifier_attempt_id) REFERENCES orchestration.attempt(id)` |
| `verification_run_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.claim_evidence_assessment`](../../evidence/tables/claim_evidence_assessment.md) | `claim_evidence_assessment_run_id_fkey` | `FOREIGN KEY (run_id) REFERENCES evidence.verification_run(id) ON DELETE CASCADE` |
| [`evidence.claim_evidence_link`](../../evidence/tables/claim_evidence_link.md) | `claim_evidence_link_verified_by_run_id_fkey` | `FOREIGN KEY (verified_by_run_id) REFERENCES evidence.verification_run(id)` |
| [`evidence.verification_finding`](../../evidence/tables/verification_finding.md) | `verification_finding_run_id_fkey` | `FOREIGN KEY (run_id) REFERENCES evidence.verification_run(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `verification_run_attempt_idx` | `CREATE INDEX verification_run_attempt_idx ON evidence.verification_run USING btree (verifier_attempt_id)` |
| `verification_run_pkey` | `CREATE UNIQUE INDEX verification_run_pkey ON evidence.verification_run USING btree (id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `verification_run_identity_immutable` | `evidence.enforce_verification_run_lifecycle` | `CREATE TRIGGER verification_run_identity_immutable BEFORE DELETE OR UPDATE ON evidence.verification_run FOR EACH ROW EXECUTE FUNCTION evidence.enforce_verification_run_lifecycle()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

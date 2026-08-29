---
schema: evidence
relation: conflict_reconciliation
qualified_name: evidence.conflict_reconciliation
kind: table
---

# evidence.conflict_reconciliation

Database table evidence.conflict_reconciliation.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["conflict_reconciliation"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence conflict_reconciliation evidence.conflict_reconciliation id conflict_id outcome rationale review_task_id decided_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `conflict_id` | `uuid` | no | — | — |
| 3 | `outcome` | `text` | no | — | — |
| 4 | `rationale` | `text` | no | — | — |
| 5 | `review_task_id` | `uuid` | yes | — | — |
| 6 | `decided_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `conflict_reconciliation_outcome_check` | `check` | `CHECK (outcome = ANY (ARRAY['reject'::text, 'supersede'::text, 'scope'::text, 'retain_dispute'::text, 'experiment'::text, 'review'::text]))` | — |
| `conflict_reconciliation_conflict_id_fkey` | `foreign_key` | `FOREIGN KEY (conflict_id) REFERENCES evidence.claim_conflict(id) ON DELETE CASCADE` | [`evidence.claim_conflict`](../../evidence/tables/claim_conflict.md) |
| `conflict_reconciliation_review_task_fk` | `foreign_key` | `FOREIGN KEY (review_task_id) REFERENCES evaluation.review_task(id)` | `evaluation.review_task` |
| `conflict_reconciliation_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `conflict_reconciliation_conflict_id_fkey` | [`evidence.claim_conflict`](../../evidence/tables/claim_conflict.md) | `FOREIGN KEY (conflict_id) REFERENCES evidence.claim_conflict(id) ON DELETE CASCADE` |
| `conflict_reconciliation_review_task_fk` | `evaluation.review_task` | `FOREIGN KEY (review_task_id) REFERENCES evaluation.review_task(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `conflict_reconciliation_pkey` | `CREATE UNIQUE INDEX conflict_reconciliation_pkey ON evidence.conflict_reconciliation USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

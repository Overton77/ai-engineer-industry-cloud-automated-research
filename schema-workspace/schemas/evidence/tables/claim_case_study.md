---
schema: evidence
relation: claim_case_study
qualified_name: evidence.claim_case_study
kind: table
---

# evidence.claim_case_study

Database table evidence.claim_case_study.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_case_study"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_case_study evidence.claim_case_study claim_id case_study_id role_in_claim`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `case_study_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_case_study_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'comparison'::text]))` | — |
| `claim_case_study_case_study_id_fkey` | `foreign_key` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` | [`corpus.case_study`](../../corpus/tables/case_study.md) |
| `claim_case_study_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_case_study_pkey` | `primary_key` | `PRIMARY KEY (claim_id, case_study_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_case_study_case_study_id_fkey` | [`corpus.case_study`](../../corpus/tables/case_study.md) | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` |
| `claim_case_study_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_case_study_pkey` | `CREATE UNIQUE INDEX claim_case_study_pkey ON evidence.claim_case_study USING btree (claim_id, case_study_id, role_in_claim)` |
| `claim_case_study_target_idx` | `CREATE INDEX claim_case_study_target_idx ON evidence.claim_case_study USING btree (case_study_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

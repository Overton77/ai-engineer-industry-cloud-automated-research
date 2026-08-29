---
schema: corpus
relation: case_study_uses_library
qualified_name: corpus.case_study_uses_library
kind: table
---

# corpus.case_study_uses_library

Database table corpus.case_study_uses_library.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["case_study_uses_library"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus case_study_uses_library corpus.case_study_uses_library case_study_id library_id usage_kind provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `case_study_id` | `uuid` | no | — | — |
| 2 | `library_id` | `uuid` | no | — | — |
| 3 | `usage_kind` | `text` | no | `'implementation'::text` | — |
| 4 | `provenance_claim_id` | `uuid` | yes | — | — |
| 5 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `case_study_uses_library_usage_kind_check` | `check` | `CHECK (usage_kind = ANY (ARRAY['implementation'::text, 'integration'::text, 'evaluation'::text, 'migration_source'::text, 'migration_target'::text, 'other'::text]))` | — |
| `case_study_uses_library_case_study_id_fkey` | `foreign_key` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` | [`corpus.case_study`](../../corpus/tables/case_study.md) |
| `case_study_uses_library_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `case_study_uses_library_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` | [`corpus.library`](../../corpus/tables/library.md) |
| `case_study_uses_library_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `case_study_uses_library_pkey` | `primary_key` | `PRIMARY KEY (case_study_id, library_id, usage_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `case_study_uses_library_case_study_id_fkey` | [`corpus.case_study`](../../corpus/tables/case_study.md) | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` |
| `case_study_uses_library_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `case_study_uses_library_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| `case_study_uses_library_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `case_study_library_idx` | `CREATE INDEX case_study_library_idx ON corpus.case_study_uses_library USING btree (library_id)` |
| `case_study_uses_library_pkey` | `CREATE UNIQUE INDEX case_study_uses_library_pkey ON corpus.case_study_uses_library USING btree (case_study_id, library_id, usage_kind)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

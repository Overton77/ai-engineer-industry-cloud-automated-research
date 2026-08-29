---
schema: corpus
relation: case_study_uses_model_version
qualified_name: corpus.case_study_uses_model_version
kind: table
---

# corpus.case_study_uses_model_version

Database table corpus.case_study_uses_model_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["case_study_uses_model_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus case_study_uses_model_version corpus.case_study_uses_model_version case_study_id ai_model_version_id usage_kind provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `case_study_id` | `uuid` | no | — | — |
| 2 | `ai_model_version_id` | `uuid` | no | — | — |
| 3 | `usage_kind` | `text` | no | `'production'::text` | — |
| 4 | `provenance_claim_id` | `uuid` | yes | — | — |
| 5 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `case_study_uses_model_version_usage_kind_check` | `check` | `CHECK (usage_kind = ANY (ARRAY['production'::text, 'pilot'::text, 'evaluation'::text, 'migration_source'::text, 'migration_target'::text, 'other'::text]))` | — |
| `case_study_uses_model_version_ai_model_version_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) |
| `case_study_uses_model_version_case_study_id_fkey` | `foreign_key` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` | [`corpus.case_study`](../../corpus/tables/case_study.md) |
| `case_study_uses_model_version_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `case_study_uses_model_version_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `case_study_uses_model_version_pkey` | `primary_key` | `PRIMARY KEY (case_study_id, ai_model_version_id, usage_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `case_study_uses_model_version_ai_model_version_id_fkey` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| `case_study_uses_model_version_case_study_id_fkey` | [`corpus.case_study`](../../corpus/tables/case_study.md) | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` |
| `case_study_uses_model_version_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `case_study_uses_model_version_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `case_study_model_version_idx` | `CREATE INDEX case_study_model_version_idx ON corpus.case_study_uses_model_version USING btree (ai_model_version_id)` |
| `case_study_uses_model_version_pkey` | `CREATE UNIQUE INDEX case_study_uses_model_version_pkey ON corpus.case_study_uses_model_version USING btree (case_study_id, ai_model_version_id, usage_kind)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

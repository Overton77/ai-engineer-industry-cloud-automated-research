---
schema: corpus
relation: case_study_references_benchmark
qualified_name: corpus.case_study_references_benchmark
kind: table
---

# corpus.case_study_references_benchmark

Database table corpus.case_study_references_benchmark.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["case_study_references_benchmark"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus case_study_references_benchmark corpus.case_study_references_benchmark case_study_id benchmark_id relationship_kind provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `case_study_id` | `uuid` | no | — | — |
| 2 | `benchmark_id` | `uuid` | no | — | — |
| 3 | `relationship_kind` | `text` | no | `'uses'::text` | — |
| 4 | `provenance_claim_id` | `uuid` | yes | — | — |
| 5 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `case_study_references_benchmark_relationship_kind_check` | `check` | `CHECK (relationship_kind = ANY (ARRAY['uses'::text, 'reports'::text, 'compares'::text, 'challenges'::text]))` | — |
| `case_study_references_benchmark_benchmark_id_fkey` | `foreign_key` | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) |
| `case_study_references_benchmark_case_study_id_fkey` | `foreign_key` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` | [`corpus.case_study`](../../corpus/tables/case_study.md) |
| `case_study_references_benchmark_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `case_study_references_benchmark_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `case_study_references_benchmark_pkey` | `primary_key` | `PRIMARY KEY (case_study_id, benchmark_id, relationship_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `case_study_references_benchmark_benchmark_id_fkey` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` |
| `case_study_references_benchmark_case_study_id_fkey` | [`corpus.case_study`](../../corpus/tables/case_study.md) | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` |
| `case_study_references_benchmark_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `case_study_references_benchmark_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `case_study_benchmark_idx` | `CREATE INDEX case_study_benchmark_idx ON corpus.case_study_references_benchmark USING btree (benchmark_id)` |
| `case_study_references_benchmark_pkey` | `CREATE UNIQUE INDEX case_study_references_benchmark_pkey ON corpus.case_study_references_benchmark USING btree (case_study_id, benchmark_id, relationship_kind)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

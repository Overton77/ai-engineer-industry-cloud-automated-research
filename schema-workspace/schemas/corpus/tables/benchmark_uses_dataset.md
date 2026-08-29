---
schema: corpus
relation: benchmark_uses_dataset
qualified_name: corpus.benchmark_uses_dataset
kind: table
---

# corpus.benchmark_uses_dataset

Database table corpus.benchmark_uses_dataset.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["benchmark_uses_dataset"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus benchmark_uses_dataset corpus.benchmark_uses_dataset benchmark_id dataset_id usage_kind provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `benchmark_id` | `uuid` | no | — | — |
| 2 | `dataset_id` | `uuid` | no | — | — |
| 3 | `usage_kind` | `text` | no | `'evaluation'::text` | — |
| 4 | `provenance_claim_id` | `uuid` | yes | — | — |
| 5 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `benchmark_uses_dataset_usage_kind_check` | `check` | `CHECK (usage_kind = ANY (ARRAY['evaluation'::text, 'training'::text, 'calibration'::text, 'reference'::text]))` | — |
| `benchmark_uses_dataset_benchmark_id_fkey` | `foreign_key` | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) |
| `benchmark_uses_dataset_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `benchmark_uses_dataset_dataset_id_fkey` | `foreign_key` | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id) ON DELETE CASCADE` | [`corpus.dataset`](../../corpus/tables/dataset.md) |
| `benchmark_uses_dataset_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `benchmark_uses_dataset_pkey` | `primary_key` | `PRIMARY KEY (benchmark_id, dataset_id, usage_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `benchmark_uses_dataset_benchmark_id_fkey` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` |
| `benchmark_uses_dataset_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `benchmark_uses_dataset_dataset_id_fkey` | [`corpus.dataset`](../../corpus/tables/dataset.md) | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id) ON DELETE CASCADE` |
| `benchmark_uses_dataset_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `benchmark_dataset_idx` | `CREATE INDEX benchmark_dataset_idx ON corpus.benchmark_uses_dataset USING btree (dataset_id)` |
| `benchmark_uses_dataset_pkey` | `CREATE UNIQUE INDEX benchmark_uses_dataset_pkey ON corpus.benchmark_uses_dataset USING btree (benchmark_id, dataset_id, usage_kind)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

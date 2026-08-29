---
schema: corpus
relation: dataset
qualified_name: corpus.dataset
kind: table
---

# corpus.dataset

Database table corpus.dataset.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["dataset"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus dataset corpus.dataset id tenant_id host external_id name modality license_spdx size_descriptor lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `host` | `text` | no | — | — |
| 4 | `external_id` | `text` | no | — | — |
| 5 | `name` | `text` | no | — | — |
| 6 | `modality` | `text[]` | yes | — | — |
| 7 | `license_spdx` | `text` | yes | — | — |
| 8 | `size_descriptor` | `text` | yes | — | — |
| 9 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 10 | `merged_into_id` | `uuid` | yes | — | — |
| 11 | `created_by_receipt_id` | `uuid` | no | — | — |
| 12 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 13 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 14 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `dataset_host_check` | `check` | `CHECK (host = ANY (ARRAY['huggingface'::text, 'kaggle'::text, 'zenodo'::text, 'openml'::text, 'github'::text, 'other'::text]))` | — |
| `dataset_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `dataset_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.dataset(id)` | [`corpus.dataset`](../../corpus/tables/dataset.md) |
| `dataset_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `dataset_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `dataset_host_external_id_key` | `unique` | `UNIQUE (host, external_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `dataset_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `dataset_merged_into_id_fkey` | [`corpus.dataset`](../../corpus/tables/dataset.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.dataset(id)` |
| `dataset_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.benchmark_uses_dataset`](../../corpus/tables/benchmark_uses_dataset.md) | `benchmark_uses_dataset_dataset_id_fkey` | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id) ON DELETE CASCADE` |
| [`corpus.dataset`](../../corpus/tables/dataset.md) | `dataset_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.dataset(id)` |
| [`evidence.claim_dataset`](../../evidence/tables/claim_dataset.md) | `claim_dataset_dataset_id_fkey` | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id) ON DELETE CASCADE` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_dataset_id_fkey` | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_dataset_id_fkey` | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_dataset_id_fkey` | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `dataset_host_external_id_key` | `CREATE UNIQUE INDEX dataset_host_external_id_key ON corpus.dataset USING btree (host, external_id)` |
| `dataset_pkey` | `CREATE UNIQUE INDEX dataset_pkey ON corpus.dataset USING btree (id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `dataset_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER dataset_set_updated_at BEFORE UPDATE ON corpus.dataset FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

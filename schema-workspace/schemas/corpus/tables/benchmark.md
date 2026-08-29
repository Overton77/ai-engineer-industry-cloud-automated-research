---
schema: corpus
relation: benchmark
qualified_name: corpus.benchmark
kind: table
---

# corpus.benchmark

Database table corpus.benchmark.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["benchmark"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus benchmark corpus.benchmark id tenant_id slug name measures task_domain homepage_url retired lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `name` | `text` | no | — | — |
| 5 | `measures` | `text` | yes | — | — |
| 6 | `task_domain` | `text` | yes | — | — |
| 7 | `homepage_url` | `text` | yes | — | — |
| 8 | `retired` | `boolean` | no | `false` | — |
| 9 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 10 | `merged_into_id` | `uuid` | yes | — | — |
| 11 | `created_by_receipt_id` | `uuid` | no | — | — |
| 12 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 13 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 14 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `benchmark_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `benchmark_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.benchmark(id)` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) |
| `benchmark_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `benchmark_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `benchmark_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `benchmark_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `benchmark_merged_into_id_fkey` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.benchmark(id)` |
| `benchmark_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `benchmark_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.benchmark(id)` |
| [`evidence.claim_benchmark`](../../evidence/tables/claim_benchmark.md) | `claim_benchmark_benchmark_id_fkey` | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_benchmark_id_fkey` | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_benchmark_id_fkey` | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `benchmark_pkey` | `CREATE UNIQUE INDEX benchmark_pkey ON corpus.benchmark USING btree (id)` |
| `benchmark_tenant_id_slug_key` | `CREATE UNIQUE INDEX benchmark_tenant_id_slug_key ON corpus.benchmark USING btree (tenant_id, slug)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

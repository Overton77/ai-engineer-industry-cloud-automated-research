---
schema: corpus
relation: benchmark_evaluates_model_version
qualified_name: corpus.benchmark_evaluates_model_version
kind: table
---

# corpus.benchmark_evaluates_model_version

Semantic benchmark/model link only; quantitative results belong in ranking.metric_observation.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["benchmark_evaluates_model_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus benchmark_evaluates_model_version corpus.benchmark_evaluates_model_version benchmark_id ai_model_version_id evaluation_role provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `benchmark_id` | `uuid` | no | — | — |
| 2 | `ai_model_version_id` | `uuid` | no | — | — |
| 3 | `evaluation_role` | `text` | no | `'evaluated'::text` | — |
| 4 | `provenance_claim_id` | `uuid` | yes | — | — |
| 5 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `benchmark_evaluates_model_version_evaluation_role_check` | `check` | `CHECK (evaluation_role = ANY (ARRAY['evaluated'::text, 'baseline'::text, 'judge'::text, 'reference'::text]))` | — |
| `benchmark_evaluates_model_version_ai_model_version_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) |
| `benchmark_evaluates_model_version_benchmark_id_fkey` | `foreign_key` | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) |
| `benchmark_evaluates_model_version_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `benchmark_evaluates_model_version_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `benchmark_evaluates_model_version_pkey` | `primary_key` | `PRIMARY KEY (benchmark_id, ai_model_version_id, evaluation_role)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `benchmark_evaluates_model_version_ai_model_version_id_fkey` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| `benchmark_evaluates_model_version_benchmark_id_fkey` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` |
| `benchmark_evaluates_model_version_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `benchmark_evaluates_model_version_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `benchmark_evaluates_model_version_pkey` | `CREATE UNIQUE INDEX benchmark_evaluates_model_version_pkey ON corpus.benchmark_evaluates_model_version USING btree (benchmark_id, ai_model_version_id, evaluation_role)` |
| `benchmark_model_version_idx` | `CREATE INDEX benchmark_model_version_idx ON corpus.benchmark_evaluates_model_version USING btree (ai_model_version_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

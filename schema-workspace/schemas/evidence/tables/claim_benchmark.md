---
schema: evidence
relation: claim_benchmark
qualified_name: evidence.claim_benchmark
kind: table
---

# evidence.claim_benchmark

Database table evidence.claim_benchmark.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_benchmark"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_benchmark evidence.claim_benchmark claim_id benchmark_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `benchmark_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_benchmark_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text]))` | — |
| `claim_benchmark_benchmark_id_fkey` | `foreign_key` | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) |
| `claim_benchmark_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_benchmark_pkey` | `primary_key` | `PRIMARY KEY (claim_id, benchmark_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_benchmark_benchmark_id_fkey` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` |
| `claim_benchmark_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_benchmark_pkey` | `CREATE UNIQUE INDEX claim_benchmark_pkey ON evidence.claim_benchmark USING btree (claim_id, benchmark_id, role_in_claim)` |
| `claim_benchmark_target_idx` | `CREATE INDEX claim_benchmark_target_idx ON evidence.claim_benchmark USING btree (benchmark_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

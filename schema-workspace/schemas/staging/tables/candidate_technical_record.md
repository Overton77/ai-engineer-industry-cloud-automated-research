---
schema: staging
relation: candidate_technical_record
qualified_name: staging.candidate_technical_record
kind: table
---

# staging.candidate_technical_record

Database table staging.candidate_technical_record.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["candidate_technical_record"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging candidate_technical_record staging.candidate_technical_record candidate_id candidate_kind record_kind title statement structured scope`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `candidate_id` | `uuid` | no | — | — |
| 2 | `candidate_kind` | `text` | no | `'technical_record'::text` | — |
| 3 | `record_kind` | `text` | no | — | — |
| 4 | `title` | `text` | yes | — | — |
| 5 | `statement` | `text` | yes | — | — |
| 6 | `structured` | `jsonb` | yes | — | — |
| 7 | `scope` | `jsonb` | no | `'{}'::jsonb` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `candidate_technical_record_candidate_kind_check` | `check` | `CHECK (candidate_kind = 'technical_record'::text)` | — |
| `candidate_technical_record_record_kind_check` | `check` | `CHECK (record_kind = ANY (ARRAY['technical_problem'::text, 'solution_pattern'::text, 'advanced_usage_pattern'::text, 'implementation_example'::text, 'failure_mode'::text, 'benchmark_result'::text, 'compatibility_constraint'::text, 'operational_practice'::text, 'security_consideration'::text]))` | — |
| `candidate_technical_record_candidate_id_candidate_kind_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_technical_record_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_technical_record_pkey` | `primary_key` | `PRIMARY KEY (candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `candidate_technical_record_candidate_id_candidate_kind_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| `candidate_technical_record_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `candidate_technical_record_pkey` | `CREATE UNIQUE INDEX candidate_technical_record_pkey ON staging.candidate_technical_record USING btree (candidate_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

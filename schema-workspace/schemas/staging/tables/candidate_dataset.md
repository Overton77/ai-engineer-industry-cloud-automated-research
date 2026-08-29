---
schema: staging
relation: candidate_dataset
qualified_name: staging.candidate_dataset
kind: table
---

# staging.candidate_dataset

Database table staging.candidate_dataset.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["candidate_dataset"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging candidate_dataset staging.candidate_dataset candidate_id candidate_kind host external_id name`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `candidate_id` | `uuid` | no | — | — |
| 2 | `candidate_kind` | `text` | no | `'dataset'::text` | — |
| 3 | `host` | `text` | yes | — | — |
| 4 | `external_id` | `text` | yes | — | — |
| 5 | `name` | `text` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `candidate_dataset_candidate_kind_check` | `check` | `CHECK (candidate_kind = 'dataset'::text)` | — |
| `candidate_dataset_candidate_id_candidate_kind_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_dataset_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_dataset_pkey` | `primary_key` | `PRIMARY KEY (candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `candidate_dataset_candidate_id_candidate_kind_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| `candidate_dataset_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `candidate_dataset_pkey` | `CREATE UNIQUE INDEX candidate_dataset_pkey ON staging.candidate_dataset USING btree (candidate_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

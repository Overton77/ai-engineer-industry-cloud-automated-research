---
schema: staging
relation: candidate_case_study
qualified_name: staging.candidate_case_study
kind: table
---

# staging.candidate_case_study

Database table staging.candidate_case_study.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["candidate_case_study"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging candidate_case_study staging.candidate_case_study candidate_id candidate_kind slug title organization_name product_name published_on source_url`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `candidate_id` | `uuid` | no | — | — |
| 2 | `candidate_kind` | `text` | no | `'case_study'::text` | — |
| 3 | `slug` | `text` | yes | — | — |
| 4 | `title` | `text` | yes | — | — |
| 5 | `organization_name` | `text` | yes | — | — |
| 6 | `product_name` | `text` | yes | — | — |
| 7 | `published_on` | `date` | yes | — | — |
| 8 | `source_url` | `text` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `candidate_case_study_candidate_kind_check` | `check` | `CHECK (candidate_kind = 'case_study'::text)` | — |
| `candidate_case_study_candidate_id_candidate_kind_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_case_study_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_case_study_pkey` | `primary_key` | `PRIMARY KEY (candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `candidate_case_study_candidate_id_candidate_kind_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| `candidate_case_study_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `candidate_case_study_kind_fk_idx` | `CREATE INDEX candidate_case_study_kind_fk_idx ON staging.candidate_case_study USING btree (candidate_id, candidate_kind)` |
| `candidate_case_study_pkey` | `CREATE UNIQUE INDEX candidate_case_study_pkey ON staging.candidate_case_study USING btree (candidate_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

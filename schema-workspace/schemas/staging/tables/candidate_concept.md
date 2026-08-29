---
schema: staging
relation: candidate_concept
qualified_name: staging.candidate_concept
kind: table
---

# staging.candidate_concept

Database table staging.candidate_concept.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["candidate_concept"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging candidate_concept staging.candidate_concept candidate_id candidate_kind preferred_label definition aliases`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `candidate_id` | `uuid` | no | — | — |
| 2 | `candidate_kind` | `text` | no | `'concept'::text` | — |
| 3 | `preferred_label` | `text` | yes | — | — |
| 4 | `definition` | `text` | yes | — | — |
| 5 | `aliases` | `text[]` | no | `'{}'::text[]` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `candidate_concept_candidate_kind_check` | `check` | `CHECK (candidate_kind = 'concept'::text)` | — |
| `candidate_concept_candidate_id_candidate_kind_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_concept_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_concept_pkey` | `primary_key` | `PRIMARY KEY (candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `candidate_concept_candidate_id_candidate_kind_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| `candidate_concept_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `candidate_concept_pkey` | `CREATE UNIQUE INDEX candidate_concept_pkey ON staging.candidate_concept USING btree (candidate_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

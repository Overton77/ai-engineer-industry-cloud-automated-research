---
schema: staging
relation: candidate_person
qualified_name: staging.candidate_person
kind: table
---

# staging.candidate_person

Database table staging.candidate_person.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["candidate_person"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging candidate_person staging.candidate_person candidate_id candidate_kind display_name given_name family_name headline identifiers`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `candidate_id` | `uuid` | no | — | — |
| 2 | `candidate_kind` | `text` | no | `'person'::text` | — |
| 3 | `display_name` | `text` | yes | — | — |
| 4 | `given_name` | `text` | yes | — | — |
| 5 | `family_name` | `text` | yes | — | — |
| 6 | `headline` | `text` | yes | — | — |
| 7 | `identifiers` | `jsonb` | no | `'{}'::jsonb` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `candidate_person_candidate_kind_check` | `check` | `CHECK (candidate_kind = 'person'::text)` | — |
| `candidate_person_candidate_id_candidate_kind_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_person_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_person_pkey` | `primary_key` | `PRIMARY KEY (candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `candidate_person_candidate_id_candidate_kind_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| `candidate_person_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `candidate_person_pkey` | `CREATE UNIQUE INDEX candidate_person_pkey ON staging.candidate_person USING btree (candidate_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

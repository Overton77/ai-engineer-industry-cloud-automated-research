---
schema: evidence
relation: claim_person
qualified_name: evidence.claim_person
kind: table
---

# evidence.claim_person

Database table evidence.claim_person.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_person"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_person evidence.claim_person claim_id person_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `person_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_person_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text]))` | — |
| `claim_person_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_person_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` | [`corpus.person`](../../corpus/tables/person.md) |
| `claim_person_pkey` | `primary_key` | `PRIMARY KEY (claim_id, person_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_person_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_person_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_person_pkey` | `CREATE UNIQUE INDEX claim_person_pkey ON evidence.claim_person USING btree (claim_id, person_id, role_in_claim)` |
| `claim_person_target_idx` | `CREATE INDEX claim_person_target_idx ON evidence.claim_person USING btree (person_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

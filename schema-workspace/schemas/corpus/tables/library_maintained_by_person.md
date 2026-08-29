---
schema: corpus
relation: library_maintained_by_person
qualified_name: corpus.library_maintained_by_person
kind: table
---

# corpus.library_maintained_by_person

Database table corpus.library_maintained_by_person.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["library_maintained_by_person"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus library_maintained_by_person corpus.library_maintained_by_person id library_id person_id role source valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `library_id` | `uuid` | no | — | — |
| 3 | `person_id` | `uuid` | no | — | — |
| 4 | `role` | `text` | no | `'maintainer'::text` | — |
| 5 | `source` | `text` | yes | — | — |
| 6 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 7 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 8 | `confidence` | `corpus.confidence` | yes | — | — |
| 9 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 10 | `provenance_claim_id` | `uuid` | yes | — | — |
| 11 | `created_by_receipt_id` | `uuid` | no | — | — |
| 12 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `library_maintained_by_person_role_check` | `check` | `CHECK (role = ANY (ARRAY['maintainer'::text, 'core'::text, 'triager'::text, 'author'::text, 'emeritus'::text]))` | — |
| `library_maintained_by_person_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `library_maintained_by_person_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` | [`corpus.library`](../../corpus/tables/library.md) |
| `library_maintained_by_person_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` | [`corpus.person`](../../corpus/tables/person.md) |
| `library_maintained_by_person_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `library_maintained_by_person_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `library_maintained_by_person_library_id_person_id_role_vali_key` | `unique` | `UNIQUE (library_id, person_id, role, valid_from)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `library_maintained_by_person_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `library_maintained_by_person_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| `library_maintained_by_person_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| `library_maintained_by_person_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `library_maintained_by_person_library_id_person_id_role_vali_key` | `CREATE UNIQUE INDEX library_maintained_by_person_library_id_person_id_role_vali_key ON corpus.library_maintained_by_person USING btree (library_id, person_id, role, valid_from)` |
| `library_maintained_by_person_pkey` | `CREATE UNIQUE INDEX library_maintained_by_person_pkey ON corpus.library_maintained_by_person USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

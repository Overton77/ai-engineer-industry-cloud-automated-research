---
schema: corpus
relation: paper_authored_by_person
qualified_name: corpus.paper_authored_by_person
kind: table
---

# corpus.paper_authored_by_person

Database table corpus.paper_authored_by_person.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["paper_authored_by_person"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus paper_authored_by_person corpus.paper_authored_by_person id paper_id person_id author_position corresponding affiliation_organization_id valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `paper_id` | `uuid` | no | — | — |
| 3 | `person_id` | `uuid` | no | — | — |
| 4 | `author_position` | `integer` | yes | — | — |
| 5 | `corresponding` | `boolean` | no | `false` | — |
| 6 | `affiliation_organization_id` | `uuid` | yes | — | — |
| 7 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 8 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 9 | `confidence` | `corpus.confidence` | yes | — | — |
| 10 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 11 | `provenance_claim_id` | `uuid` | yes | — | — |
| 12 | `created_by_receipt_id` | `uuid` | no | — | — |
| 13 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `paper_authored_by_person_affiliation_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (affiliation_organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `paper_authored_by_person_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `paper_authored_by_person_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `paper_authored_by_person_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` | [`corpus.person`](../../corpus/tables/person.md) |
| `paper_authored_by_person_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `paper_authored_by_person_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `paper_authored_by_person_paper_id_person_id_key` | `unique` | `UNIQUE (paper_id, person_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `paper_authored_by_person_affiliation_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (affiliation_organization_id) REFERENCES corpus.organization(id)` |
| `paper_authored_by_person_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `paper_authored_by_person_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| `paper_authored_by_person_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| `paper_authored_by_person_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `paper_authored_by_person_paper_id_person_id_key` | `CREATE UNIQUE INDEX paper_authored_by_person_paper_id_person_id_key ON corpus.paper_authored_by_person USING btree (paper_id, person_id)` |
| `paper_authored_by_person_pkey` | `CREATE UNIQUE INDEX paper_authored_by_person_pkey ON corpus.paper_authored_by_person USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

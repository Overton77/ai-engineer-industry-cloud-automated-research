---
schema: corpus
relation: person_employed_by_organization
qualified_name: corpus.person_employed_by_organization
kind: table
---

# corpus.person_employed_by_organization

Database table corpus.person_employed_by_organization.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["person_employed_by_organization"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus person_employed_by_organization corpus.person_employed_by_organization id person_id organization_id title seniority employment_kind valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `person_id` | `uuid` | no | — | — |
| 3 | `organization_id` | `uuid` | no | — | — |
| 4 | `title` | `text` | yes | — | — |
| 5 | `seniority` | `text` | yes | — | — |
| 6 | `employment_kind` | `text` | yes | — | — |
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
| `person_employed_by_organization_employment_kind_check` | `check` | `CHECK (employment_kind = ANY (ARRAY['full_time'::text, 'part_time'::text, 'contract'::text, 'advisor'::text, 'founder'::text, 'executive'::text, 'intern'::text]))` | — |
| `person_employed_by_organization_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `person_employed_by_organization_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `person_employed_by_organization_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` | [`corpus.person`](../../corpus/tables/person.md) |
| `person_employed_by_organization_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `person_employed_by_organization_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `person_employed_by_organizati_person_id_organization_id_tit_key` | `unique` | `UNIQUE (person_id, organization_id, title, valid_from)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `person_employed_by_organization_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `person_employed_by_organization_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| `person_employed_by_organization_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| `person_employed_by_organization_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `person_employed_by_organizati_person_id_organization_id_tit_key` | `CREATE UNIQUE INDEX person_employed_by_organizati_person_id_organization_id_tit_key ON corpus.person_employed_by_organization USING btree (person_id, organization_id, title, valid_from)` |
| `person_employed_by_organization_pkey` | `CREATE UNIQUE INDEX person_employed_by_organization_pkey ON corpus.person_employed_by_organization USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

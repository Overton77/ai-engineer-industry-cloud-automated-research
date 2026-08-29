---
schema: corpus
relation: repository_archival_fact
qualified_name: corpus.repository_archival_fact
kind: table
---

# corpus.repository_archival_fact

Database table corpus.repository_archival_fact.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["repository_archival_fact"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus repository_archival_fact corpus.repository_archival_fact id repository_id archived valid_from valid_to validity confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `repository_id` | `uuid` | no | — | — |
| 3 | `archived` | `boolean` | no | — | — |
| 4 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 5 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 6 | `validity` | `tstzrange` | yes | `tstzrange(valid_from, valid_to, '[)'::text)` | — |
| 7 | `confidence` | `corpus.confidence` | yes | — | — |
| 8 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 9 | `provenance_claim_id` | `uuid` | yes | — | — |
| 10 | `created_by_receipt_id` | `uuid` | no | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `repository_archival_fact_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `repository_archival_fact_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `repository_archival_fact_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `repository_archival_fact_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `repository_archival_no_overlap` | `exclusion` | `EXCLUDE USING gist (repository_id WITH =, validity WITH &&) WHERE (lifecycle_state::text = 'active'::text)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `repository_archival_fact_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `repository_archival_fact_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `repository_archival_fact_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `repository_archival_fact_pkey` | `CREATE UNIQUE INDEX repository_archival_fact_pkey ON corpus.repository_archival_fact USING btree (id)` |
| `repository_archival_no_overlap` | `CREATE INDEX repository_archival_no_overlap ON corpus.repository_archival_fact USING gist (repository_id, validity) WHERE ((lifecycle_state)::text = 'active'::text)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

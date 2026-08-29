---
schema: corpus
relation: library_maintenance_status_fact
qualified_name: corpus.library_maintenance_status_fact
kind: table
---

# corpus.library_maintenance_status_fact

Database table corpus.library_maintenance_status_fact.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["library_maintenance_status_fact"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus library_maintenance_status_fact corpus.library_maintenance_status_fact id library_id status valid_from valid_to validity confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `library_id` | `uuid` | no | — | — |
| 3 | `status` | `text` | no | — | — |
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
| `library_maintenance_status_fact_status_check` | `check` | `CHECK (status = ANY (ARRAY['active'::text, 'lts'::text, 'maintenance'::text, 'deprecated'::text, 'abandoned'::text]))` | — |
| `library_maintenance_status_fact_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `library_maintenance_status_fact_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` | [`corpus.library`](../../corpus/tables/library.md) |
| `library_maintenance_status_fact_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `library_maintenance_status_fact_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `library_maintenance_no_overlap` | `exclusion` | `EXCLUDE USING gist (library_id WITH =, validity WITH &&) WHERE (lifecycle_state::text = 'active'::text)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `library_maintenance_status_fact_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `library_maintenance_status_fact_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| `library_maintenance_status_fact_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `library_maintenance_no_overlap` | `CREATE INDEX library_maintenance_no_overlap ON corpus.library_maintenance_status_fact USING gist (library_id, validity) WHERE ((lifecycle_state)::text = 'active'::text)` |
| `library_maintenance_status_fact_pkey` | `CREATE UNIQUE INDEX library_maintenance_status_fact_pkey ON corpus.library_maintenance_status_fact USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

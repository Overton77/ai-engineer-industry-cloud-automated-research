---
schema: corpus
relation: mcp_server_registry_status_fact
qualified_name: corpus.mcp_server_registry_status_fact
kind: table
---

# corpus.mcp_server_registry_status_fact

Database table corpus.mcp_server_registry_status_fact.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["mcp_server_registry_status_fact"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus mcp_server_registry_status_fact corpus.mcp_server_registry_status_fact id mcp_server_id status valid_from valid_to validity confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mcp_server_id` | `uuid` | no | — | — |
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
| `mcp_server_registry_status_fact_status_check` | `check` | `CHECK (status = ANY (ARRAY['listed'::text, 'delisted'::text, 'flagged'::text]))` | — |
| `mcp_server_registry_status_fact_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `mcp_server_registry_status_fact_mcp_server_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `mcp_server_registry_status_fact_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `mcp_server_registry_status_fact_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `mcp_server_registry_no_overlap` | `exclusion` | `EXCLUDE USING gist (mcp_server_id WITH =, validity WITH &&) WHERE (lifecycle_state::text = 'active'::text)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `mcp_server_registry_status_fact_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `mcp_server_registry_status_fact_mcp_server_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| `mcp_server_registry_status_fact_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `mcp_server_registry_no_overlap` | `CREATE INDEX mcp_server_registry_no_overlap ON corpus.mcp_server_registry_status_fact USING gist (mcp_server_id, validity) WHERE ((lifecycle_state)::text = 'active'::text)` |
| `mcp_server_registry_status_fact_pkey` | `CREATE UNIQUE INDEX mcp_server_registry_status_fact_pkey ON corpus.mcp_server_registry_status_fact USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: corpus
relation: person_created_mcp_server
qualified_name: corpus.person_created_mcp_server
kind: table
---

# corpus.person_created_mcp_server

Database table corpus.person_created_mcp_server.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["person_created_mcp_server"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus person_created_mcp_server corpus.person_created_mcp_server id person_id mcp_server_id role since valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `person_id` | `uuid` | no | — | — |
| 3 | `mcp_server_id` | `uuid` | no | — | — |
| 4 | `role` | `text` | no | `'creator'::text` | — |
| 5 | `since` | `date` | yes | — | — |
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
| `person_created_mcp_server_role_check` | `check` | `CHECK (role = ANY (ARRAY['creator'::text, 'maintainer'::text, 'contributor'::text]))` | — |
| `person_created_mcp_server_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `person_created_mcp_server_mcp_server_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `person_created_mcp_server_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` | [`corpus.person`](../../corpus/tables/person.md) |
| `person_created_mcp_server_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `person_created_mcp_server_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `person_created_mcp_server_person_id_mcp_server_id_role_key` | `unique` | `UNIQUE (person_id, mcp_server_id, role)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `person_created_mcp_server_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `person_created_mcp_server_mcp_server_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| `person_created_mcp_server_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| `person_created_mcp_server_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `person_created_mcp_server_person_id_mcp_server_id_role_key` | `CREATE UNIQUE INDEX person_created_mcp_server_person_id_mcp_server_id_role_key ON corpus.person_created_mcp_server USING btree (person_id, mcp_server_id, role)` |
| `person_created_mcp_server_pkey` | `CREATE UNIQUE INDEX person_created_mcp_server_pkey ON corpus.person_created_mcp_server USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

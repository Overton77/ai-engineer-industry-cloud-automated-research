---
schema: corpus
relation: mcp_server_backed_by_repository
qualified_name: corpus.mcp_server_backed_by_repository
kind: table
---

# corpus.mcp_server_backed_by_repository

Database table corpus.mcp_server_backed_by_repository.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["mcp_server_backed_by_repository"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus mcp_server_backed_by_repository corpus.mcp_server_backed_by_repository id mcp_server_id repository_id relationship_kind valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mcp_server_id` | `uuid` | no | — | — |
| 3 | `repository_id` | `uuid` | no | — | — |
| 4 | `relationship_kind` | `text` | no | `'source'::text` | — |
| 5 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 6 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 7 | `confidence` | `corpus.confidence` | yes | — | — |
| 8 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 9 | `provenance_claim_id` | `uuid` | yes | — | — |
| 10 | `created_by_receipt_id` | `uuid` | no | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `mcp_server_backed_by_repository_relationship_kind_check` | `check` | `CHECK (relationship_kind = ANY (ARRAY['source'::text, 'mirror'::text, 'fork'::text]))` | — |
| `mcp_server_backed_by_repository_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `mcp_server_backed_by_repository_mcp_server_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `mcp_server_backed_by_repository_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `mcp_server_backed_by_repository_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `mcp_server_backed_by_repository_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `mcp_server_backed_by_reposito_mcp_server_id_repository_id_r_key` | `unique` | `UNIQUE (mcp_server_id, repository_id, relationship_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `mcp_server_backed_by_repository_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `mcp_server_backed_by_repository_mcp_server_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| `mcp_server_backed_by_repository_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `mcp_server_backed_by_repository_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `mcp_server_backed_by_reposito_mcp_server_id_repository_id_r_key` | `CREATE UNIQUE INDEX mcp_server_backed_by_reposito_mcp_server_id_repository_id_r_key ON corpus.mcp_server_backed_by_repository USING btree (mcp_server_id, repository_id, relationship_kind)` |
| `mcp_server_backed_by_repository_pkey` | `CREATE UNIQUE INDEX mcp_server_backed_by_repository_pkey ON corpus.mcp_server_backed_by_repository USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

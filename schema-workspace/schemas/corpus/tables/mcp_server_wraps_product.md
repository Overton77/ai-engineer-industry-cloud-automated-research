---
schema: corpus
relation: mcp_server_wraps_product
qualified_name: corpus.mcp_server_wraps_product
kind: table
---

# corpus.mcp_server_wraps_product

Database table corpus.mcp_server_wraps_product.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["mcp_server_wraps_product"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus mcp_server_wraps_product corpus.mcp_server_wraps_product id mcp_server_id product_id coverage valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mcp_server_id` | `uuid` | no | — | — |
| 3 | `product_id` | `uuid` | no | — | — |
| 4 | `coverage` | `text` | yes | — | — |
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
| `mcp_server_wraps_product_coverage_check` | `check` | `CHECK (coverage = ANY (ARRAY['full'::text, 'partial'::text, 'read_only'::text]))` | — |
| `mcp_server_wraps_product_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `mcp_server_wraps_product_mcp_server_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `mcp_server_wraps_product_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `mcp_server_wraps_product_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `mcp_server_wraps_product_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `mcp_server_wraps_product_mcp_server_id_product_id_key` | `unique` | `UNIQUE (mcp_server_id, product_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `mcp_server_wraps_product_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `mcp_server_wraps_product_mcp_server_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| `mcp_server_wraps_product_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| `mcp_server_wraps_product_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `mcp_server_wraps_product_mcp_server_id_product_id_key` | `CREATE UNIQUE INDEX mcp_server_wraps_product_mcp_server_id_product_id_key ON corpus.mcp_server_wraps_product USING btree (mcp_server_id, product_id)` |
| `mcp_server_wraps_product_pkey` | `CREATE UNIQUE INDEX mcp_server_wraps_product_pkey ON corpus.mcp_server_wraps_product USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

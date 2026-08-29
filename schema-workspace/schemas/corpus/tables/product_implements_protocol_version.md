---
schema: corpus
relation: product_implements_protocol_version
qualified_name: corpus.product_implements_protocol_version
kind: table
---

# corpus.product_implements_protocol_version

Database table corpus.product_implements_protocol_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["product_implements_protocol_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus product_implements_protocol_version corpus.product_implements_protocol_version id product_id ai_protocol_version_id conformance client_or_server valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `product_id` | `uuid` | no | — | — |
| 3 | `ai_protocol_version_id` | `uuid` | no | — | — |
| 4 | `conformance` | `text` | no | — | — |
| 5 | `client_or_server` | `text` | yes | — | — |
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
| `product_implements_protocol_version_client_or_server_check` | `check` | `CHECK (client_or_server = ANY (ARRAY['client'::text, 'server'::text, 'both'::text]))` | — |
| `product_implements_protocol_version_conformance_check` | `check` | `CHECK (conformance = ANY (ARRAY['full'::text, 'partial'::text, 'experimental'::text]))` | — |
| `product_implements_protocol_version_ai_protocol_version_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_protocol_version_id) REFERENCES corpus.ai_protocol_version(id) ON DELETE CASCADE` | [`corpus.ai_protocol_version`](../../corpus/tables/ai_protocol_version.md) |
| `product_implements_protocol_version_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_implements_protocol_version_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `product_implements_protocol_version_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `product_implements_protocol_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `product_implements_protocol_v_product_id_ai_protocol_versio_key` | `unique` | `UNIQUE (product_id, ai_protocol_version_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `product_implements_protocol_version_ai_protocol_version_id_fkey` | [`corpus.ai_protocol_version`](../../corpus/tables/ai_protocol_version.md) | `FOREIGN KEY (ai_protocol_version_id) REFERENCES corpus.ai_protocol_version(id) ON DELETE CASCADE` |
| `product_implements_protocol_version_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_implements_protocol_version_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| `product_implements_protocol_version_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `product_implements_protocol_v_product_id_ai_protocol_versio_key` | `CREATE UNIQUE INDEX product_implements_protocol_v_product_id_ai_protocol_versio_key ON corpus.product_implements_protocol_version USING btree (product_id, ai_protocol_version_id)` |
| `product_implements_protocol_version_pkey` | `CREATE UNIQUE INDEX product_implements_protocol_version_pkey ON corpus.product_implements_protocol_version USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

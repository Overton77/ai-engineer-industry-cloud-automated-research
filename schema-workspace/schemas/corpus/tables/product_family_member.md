---
schema: corpus
relation: product_family_member
qualified_name: corpus.product_family_member
kind: table
---

# corpus.product_family_member

Database table corpus.product_family_member.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["product_family_member"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus product_family_member corpus.product_family_member product_family_id product_id member_kind sort_order provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `product_family_id` | `uuid` | no | — | — |
| 2 | `product_id` | `uuid` | no | — | — |
| 3 | `member_kind` | `text` | no | `'product'::text` | — |
| 4 | `sort_order` | `integer` | no | `0` | — |
| 5 | `provenance_claim_id` | `uuid` | yes | — | — |
| 6 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 7 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `product_family_member_member_kind_check` | `check` | `CHECK (member_kind = ANY (ARRAY['product'::text, 'edition'::text, 'module'::text, 'service'::text]))` | — |
| `product_family_member_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_family_member_product_family_id_fkey` | `foreign_key` | `FOREIGN KEY (product_family_id) REFERENCES corpus.product_family(id) ON DELETE CASCADE` | [`corpus.product_family`](../../corpus/tables/product_family.md) |
| `product_family_member_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `product_family_member_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `product_family_member_pkey` | `primary_key` | `PRIMARY KEY (product_family_id, product_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `product_family_member_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_family_member_product_family_id_fkey` | [`corpus.product_family`](../../corpus/tables/product_family.md) | `FOREIGN KEY (product_family_id) REFERENCES corpus.product_family(id) ON DELETE CASCADE` |
| `product_family_member_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| `product_family_member_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `product_family_member_pkey` | `CREATE UNIQUE INDEX product_family_member_pkey ON corpus.product_family_member USING btree (product_family_id, product_id)` |
| `product_family_member_product_idx` | `CREATE INDEX product_family_member_product_idx ON corpus.product_family_member USING btree (product_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: evidence
relation: claim_product
qualified_name: evidence.claim_product
kind: table
---

# evidence.claim_product

Database table evidence.claim_product.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_product"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_product evidence.claim_product claim_id product_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `product_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_product_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text]))` | — |
| `claim_product_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_product_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `claim_product_pkey` | `primary_key` | `PRIMARY KEY (claim_id, product_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_product_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_product_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_product_pkey` | `CREATE UNIQUE INDEX claim_product_pkey ON evidence.claim_product USING btree (claim_id, product_id, role_in_claim)` |
| `claim_product_target_idx` | `CREATE INDEX claim_product_target_idx ON evidence.claim_product USING btree (product_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

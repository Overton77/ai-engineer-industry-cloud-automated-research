---
schema: corpus
relation: organization_product_relationship
qualified_name: corpus.organization_product_relationship
kind: table
---

# corpus.organization_product_relationship

Many-to-many organization roles for products; product.vendor_organization_id remains the primary vendor shortcut.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["organization_product_relationship"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus organization_product_relationship corpus.organization_product_relationship organization_id product_id relationship_kind is_primary valid_from valid_to provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `organization_id` | `uuid` | no | — | — |
| 2 | `product_id` | `uuid` | no | — | — |
| 3 | `relationship_kind` | `text` | no | — | — |
| 4 | `is_primary` | `boolean` | no | `false` | — |
| 5 | `valid_from` | `date` | yes | — | — |
| 6 | `valid_to` | `date` | yes | — | — |
| 7 | `provenance_claim_id` | `uuid` | yes | — | — |
| 8 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 9 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `organization_product_relationship_relationship_kind_check` | `check` | `CHECK (relationship_kind = ANY (ARRAY['developer'::text, 'vendor'::text, 'owner'::text, 'operator'::text, 'distributor'::text, 'implementation_partner'::text, 'customer'::text, 'other'::text]))` | — |
| `organization_product_validity` | `check` | `CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to >= valid_from)` | — |
| `organization_product_relationship_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `organization_product_relationship_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `organization_product_relationship_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `organization_product_relationship_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `organization_product_relationship_pkey` | `primary_key` | `PRIMARY KEY (organization_id, product_id, relationship_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `organization_product_relationship_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `organization_product_relationship_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| `organization_product_relationship_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| `organization_product_relationship_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `organization_product_product_idx` | `CREATE INDEX organization_product_product_idx ON corpus.organization_product_relationship USING btree (product_id)` |
| `organization_product_relationship_pkey` | `CREATE UNIQUE INDEX organization_product_relationship_pkey ON corpus.organization_product_relationship USING btree (organization_id, product_id, relationship_kind)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

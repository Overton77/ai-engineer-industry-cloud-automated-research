---
schema: corpus
relation: product_family
qualified_name: corpus.product_family
kind: table
---

# corpus.product_family

Database table corpus.product_family.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["product_family"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus product_family corpus.product_family id tenant_id vendor_organization_id slug display_name description lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `vendor_organization_id` | `uuid` | yes | — | — |
| 4 | `slug` | `text` | no | — | — |
| 5 | `display_name` | `text` | no | — | — |
| 6 | `description` | `text` | yes | — | — |
| 7 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 8 | `merged_into_id` | `uuid` | yes | — | — |
| 9 | `created_by_receipt_id` | `uuid` | no | — | — |
| 10 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 12 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `product_family_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_family_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.product_family(id)` | [`corpus.product_family`](../../corpus/tables/product_family.md) |
| `product_family_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_family_vendor_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (vendor_organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `product_family_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `product_family_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `product_family_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_family_merged_into_id_fkey` | [`corpus.product_family`](../../corpus/tables/product_family.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.product_family(id)` |
| `product_family_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_family_vendor_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (vendor_organization_id) REFERENCES corpus.organization(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.product_family`](../../corpus/tables/product_family.md) | `product_family_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.product_family(id)` |
| [`corpus.product_family_member`](../../corpus/tables/product_family_member.md) | `product_family_member_product_family_id_fkey` | `FOREIGN KEY (product_family_id) REFERENCES corpus.product_family(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `product_family_pkey` | `CREATE UNIQUE INDEX product_family_pkey ON corpus.product_family USING btree (id)` |
| `product_family_tenant_id_slug_key` | `CREATE UNIQUE INDEX product_family_tenant_id_slug_key ON corpus.product_family USING btree (tenant_id, slug)` |
| `product_family_vendor_idx` | `CREATE INDEX product_family_vendor_idx ON corpus.product_family USING btree (vendor_organization_id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `product_family_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER product_family_set_updated_at BEFORE UPDATE ON corpus.product_family FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

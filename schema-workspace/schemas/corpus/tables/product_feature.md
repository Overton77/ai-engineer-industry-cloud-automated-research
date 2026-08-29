---
schema: corpus
relation: product_feature
qualified_name: corpus.product_feature
kind: table
---

# corpus.product_feature

Database table corpus.product_feature.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["product_feature"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus product_feature corpus.product_feature id product_id slug name description introduced_in_version_id retired_in_version_id lifecycle_state provenance_claim_id created_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `product_id` | `uuid` | no | — | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `name` | `text` | no | — | — |
| 5 | `description` | `text` | yes | — | — |
| 6 | `introduced_in_version_id` | `uuid` | yes | — | — |
| 7 | `retired_in_version_id` | `uuid` | yes | — | — |
| 8 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 9 | `provenance_claim_id` | `uuid` | yes | — | — |
| 10 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 12 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `product_feature_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_feature_introduced_in_version_id_fkey` | `foreign_key` | `FOREIGN KEY (introduced_in_version_id) REFERENCES corpus.product_version(id)` | [`corpus.product_version`](../../corpus/tables/product_version.md) |
| `product_feature_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `product_feature_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `product_feature_retired_in_version_id_fkey` | `foreign_key` | `FOREIGN KEY (retired_in_version_id) REFERENCES corpus.product_version(id)` | [`corpus.product_version`](../../corpus/tables/product_version.md) |
| `product_feature_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `product_feature_product_id_slug_key` | `unique` | `UNIQUE (product_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `product_feature_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_feature_introduced_in_version_id_fkey` | [`corpus.product_version`](../../corpus/tables/product_version.md) | `FOREIGN KEY (introduced_in_version_id) REFERENCES corpus.product_version(id)` |
| `product_feature_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| `product_feature_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `product_feature_retired_in_version_id_fkey` | [`corpus.product_version`](../../corpus/tables/product_version.md) | `FOREIGN KEY (retired_in_version_id) REFERENCES corpus.product_version(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `product_feature_pkey` | `CREATE UNIQUE INDEX product_feature_pkey ON corpus.product_feature USING btree (id)` |
| `product_feature_product_id_slug_key` | `CREATE UNIQUE INDEX product_feature_product_id_slug_key ON corpus.product_feature USING btree (product_id, slug)` |
| `product_feature_product_idx` | `CREATE INDEX product_feature_product_idx ON corpus.product_feature USING btree (product_id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `product_feature_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER product_feature_set_updated_at BEFORE UPDATE ON corpus.product_feature FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

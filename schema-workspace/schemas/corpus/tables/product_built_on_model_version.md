---
schema: corpus
relation: product_built_on_model_version
qualified_name: corpus.product_built_on_model_version
kind: table
---

# corpus.product_built_on_model_version

Database table corpus.product_built_on_model_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["product_built_on_model_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus product_built_on_model_version corpus.product_built_on_model_version id product_id ai_model_version_id usage_kind valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `product_id` | `uuid` | no | — | — |
| 3 | `ai_model_version_id` | `uuid` | no | — | — |
| 4 | `usage_kind` | `text` | no | — | — |
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
| `product_built_on_model_version_usage_kind_check` | `check` | `CHECK (usage_kind = ANY (ARRAY['default'::text, 'selectable'::text, 'fine_tuned_base'::text, 'fallback'::text]))` | — |
| `product_built_on_model_version_ai_model_version_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) |
| `product_built_on_model_version_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_built_on_model_version_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `product_built_on_model_version_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `product_built_on_model_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `product_built_on_model_versio_product_id_ai_model_version_i_key` | `unique` | `UNIQUE (product_id, ai_model_version_id, usage_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `product_built_on_model_version_ai_model_version_id_fkey` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| `product_built_on_model_version_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_built_on_model_version_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| `product_built_on_model_version_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `product_built_on_model_versio_product_id_ai_model_version_i_key` | `CREATE UNIQUE INDEX product_built_on_model_versio_product_id_ai_model_version_i_key ON corpus.product_built_on_model_version USING btree (product_id, ai_model_version_id, usage_kind)` |
| `product_built_on_model_version_pkey` | `CREATE UNIQUE INDEX product_built_on_model_version_pkey ON corpus.product_built_on_model_version USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

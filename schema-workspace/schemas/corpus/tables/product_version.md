---
schema: corpus
relation: product_version
qualified_name: corpus.product_version
kind: table
---

# corpus.product_version

Database table corpus.product_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["product_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus product_version corpus.product_version id product_id version_label release_channel released_on ended_on release_url notes created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `product_id` | `uuid` | no | — | — |
| 3 | `version_label` | `text` | no | — | — |
| 4 | `release_channel` | `text` | yes | — | — |
| 5 | `released_on` | `date` | yes | — | — |
| 6 | `ended_on` | `date` | yes | — | — |
| 7 | `release_url` | `text` | yes | — | — |
| 8 | `notes` | `text` | yes | — | — |
| 9 | `created_by_receipt_id` | `uuid` | no | — | — |
| 10 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `product_version_release_channel_check` | `check` | `CHECK (release_channel = ANY (ARRAY['preview'::text, 'beta'::text, 'stable'::text, 'lts'::text, 'deprecated'::text, 'retired'::text]))` | — |
| `product_version_validity` | `check` | `CHECK (ended_on IS NULL OR released_on IS NULL OR ended_on >= released_on)` | — |
| `product_version_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_version_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `product_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `product_version_product_id_version_label_key` | `unique` | `UNIQUE (product_id, version_label)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `product_version_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_version_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.product_feature`](../../corpus/tables/product_feature.md) | `product_feature_introduced_in_version_id_fkey` | `FOREIGN KEY (introduced_in_version_id) REFERENCES corpus.product_version(id)` |
| [`corpus.product_feature`](../../corpus/tables/product_feature.md) | `product_feature_retired_in_version_id_fkey` | `FOREIGN KEY (retired_in_version_id) REFERENCES corpus.product_version(id)` |
| [`evidence.claim_product_version`](../../evidence/tables/claim_product_version.md) | `claim_product_version_product_version_id_fkey` | `FOREIGN KEY (product_version_id) REFERENCES corpus.product_version(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `product_version_pkey` | `CREATE UNIQUE INDEX product_version_pkey ON corpus.product_version USING btree (id)` |
| `product_version_product_id_version_label_key` | `CREATE UNIQUE INDEX product_version_product_id_version_label_key ON corpus.product_version USING btree (product_id, version_label)` |
| `product_version_product_idx` | `CREATE INDEX product_version_product_idx ON corpus.product_version USING btree (product_id, released_on DESC)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

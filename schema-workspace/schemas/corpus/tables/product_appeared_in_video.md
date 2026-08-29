---
schema: corpus
relation: product_appeared_in_video
qualified_name: corpus.product_appeared_in_video
kind: table
---

# corpus.product_appeared_in_video

Database table corpus.product_appeared_in_video.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["product_appeared_in_video"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus product_appeared_in_video corpus.product_appeared_in_video id product_id video_id prominence locator_id valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `product_id` | `uuid` | no | — | — |
| 3 | `video_id` | `uuid` | no | — | — |
| 4 | `prominence` | `text` | yes | — | — |
| 5 | `locator_id` | `uuid` | yes | — | — |
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
| `product_appeared_in_video_prominence_check` | `check` | `CHECK (prominence = ANY (ARRAY['primary'::text, 'secondary'::text, 'mention'::text]))` | — |
| `product_appeared_in_video_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_appeared_in_video_locator_id_fkey` | `foreign_key` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` | [`evidence.locator`](../../evidence/tables/locator.md) |
| `product_appeared_in_video_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `product_appeared_in_video_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `product_appeared_in_video_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` | [`corpus.video`](../../corpus/tables/video.md) |
| `product_appeared_in_video_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `product_appeared_in_video_product_id_video_id_key` | `unique` | `UNIQUE (product_id, video_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `product_appeared_in_video_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_appeared_in_video_locator_id_fkey` | [`evidence.locator`](../../evidence/tables/locator.md) | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| `product_appeared_in_video_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| `product_appeared_in_video_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `product_appeared_in_video_video_id_fkey` | [`corpus.video`](../../corpus/tables/video.md) | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `product_appeared_in_video_pkey` | `CREATE UNIQUE INDEX product_appeared_in_video_pkey ON corpus.product_appeared_in_video USING btree (id)` |
| `product_appeared_in_video_product_id_video_id_key` | `CREATE UNIQUE INDEX product_appeared_in_video_product_id_video_id_key ON corpus.product_appeared_in_video USING btree (product_id, video_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

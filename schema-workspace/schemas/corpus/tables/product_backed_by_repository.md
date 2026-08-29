---
schema: corpus
relation: product_backed_by_repository
qualified_name: corpus.product_backed_by_repository
kind: table
---

# corpus.product_backed_by_repository

Database table corpus.product_backed_by_repository.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["product_backed_by_repository"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus product_backed_by_repository corpus.product_backed_by_repository product_id repository_id relationship_kind official provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `product_id` | `uuid` | no | — | — |
| 2 | `repository_id` | `uuid` | no | — | — |
| 3 | `relationship_kind` | `text` | no | `'source'::text` | — |
| 4 | `official` | `boolean` | no | `false` | — |
| 5 | `provenance_claim_id` | `uuid` | yes | — | — |
| 6 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 7 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `product_backed_by_repository_relationship_kind_check` | `check` | `CHECK (relationship_kind = ANY (ARRAY['source'::text, 'sdk'::text, 'plugin'::text, 'examples'::text, 'documentation'::text, 'mirror'::text, 'other'::text]))` | — |
| `product_backed_by_repository_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_backed_by_repository_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `product_backed_by_repository_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `product_backed_by_repository_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `product_backed_by_repository_pkey` | `primary_key` | `PRIMARY KEY (product_id, repository_id, relationship_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `product_backed_by_repository_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_backed_by_repository_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| `product_backed_by_repository_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `product_backed_by_repository_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `product_backed_by_repository_pkey` | `CREATE UNIQUE INDEX product_backed_by_repository_pkey ON corpus.product_backed_by_repository USING btree (product_id, repository_id, relationship_kind)` |
| `product_repository_idx` | `CREATE INDEX product_repository_idx ON corpus.product_backed_by_repository USING btree (repository_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

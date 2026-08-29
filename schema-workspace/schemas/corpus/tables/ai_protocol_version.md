---
schema: corpus
relation: ai_protocol_version
qualified_name: corpus.ai_protocol_version
kind: table
---

# corpus.ai_protocol_version

Database table corpus.ai_protocol_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["ai_protocol_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus ai_protocol_version corpus.ai_protocol_version id ai_protocol_id version_label spec_url released_on breaking_changes summary created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `ai_protocol_id` | `uuid` | no | — | — |
| 3 | `version_label` | `text` | no | — | — |
| 4 | `spec_url` | `text` | yes | — | — |
| 5 | `released_on` | `date` | yes | — | — |
| 6 | `breaking_changes` | `boolean` | no | `false` | — |
| 7 | `summary` | `text` | yes | — | — |
| 8 | `created_by_receipt_id` | `uuid` | no | — | — |
| 9 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ai_protocol_version_ai_protocol_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_protocol_id) REFERENCES corpus.ai_protocol(id) ON DELETE CASCADE` | [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) |
| `ai_protocol_version_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `ai_protocol_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `ai_protocol_version_ai_protocol_id_version_label_key` | `unique` | `UNIQUE (ai_protocol_id, version_label)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `ai_protocol_version_ai_protocol_id_fkey` | [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) | `FOREIGN KEY (ai_protocol_id) REFERENCES corpus.ai_protocol(id) ON DELETE CASCADE` |
| `ai_protocol_version_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.library_implements_protocol_version`](../../corpus/tables/library_implements_protocol_version.md) | `library_implements_protocol_version_ai_protocol_version_id_fkey` | `FOREIGN KEY (ai_protocol_version_id) REFERENCES corpus.ai_protocol_version(id) ON DELETE CASCADE` |
| [`corpus.mcp_server_version`](../../corpus/tables/mcp_server_version.md) | `mcp_server_version_protocol_version_id_fkey` | `FOREIGN KEY (protocol_version_id) REFERENCES corpus.ai_protocol_version(id)` |
| [`corpus.product_implements_protocol_version`](../../corpus/tables/product_implements_protocol_version.md) | `product_implements_protocol_version_ai_protocol_version_id_fkey` | `FOREIGN KEY (ai_protocol_version_id) REFERENCES corpus.ai_protocol_version(id) ON DELETE CASCADE` |
| [`evidence.claim_protocol_version`](../../evidence/tables/claim_protocol_version.md) | `claim_protocol_version_ai_protocol_version_id_fkey` | `FOREIGN KEY (ai_protocol_version_id) REFERENCES corpus.ai_protocol_version(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `ai_protocol_version_ai_protocol_id_version_label_key` | `CREATE UNIQUE INDEX ai_protocol_version_ai_protocol_id_version_label_key ON corpus.ai_protocol_version USING btree (ai_protocol_id, version_label)` |
| `ai_protocol_version_pkey` | `CREATE UNIQUE INDEX ai_protocol_version_pkey ON corpus.ai_protocol_version USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

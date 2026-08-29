---
schema: corpus
relation: mcp_server_version
qualified_name: corpus.mcp_server_version
kind: table
---

# corpus.mcp_server_version

Database table corpus.mcp_server_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["mcp_server_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus mcp_server_version corpus.mcp_server_version id mcp_server_id version_label released_on protocol_version_id auth_model packaging_hash created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mcp_server_id` | `uuid` | no | — | — |
| 3 | `version_label` | `text` | no | — | — |
| 4 | `released_on` | `date` | yes | — | — |
| 5 | `protocol_version_id` | `uuid` | yes | — | — |
| 6 | `auth_model` | `text` | yes | — | — |
| 7 | `packaging_hash` | `text` | yes | — | — |
| 8 | `created_by_receipt_id` | `uuid` | no | — | — |
| 9 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `mcp_server_version_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `mcp_server_version_mcp_server_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `mcp_server_version_protocol_version_id_fkey` | `foreign_key` | `FOREIGN KEY (protocol_version_id) REFERENCES corpus.ai_protocol_version(id)` | [`corpus.ai_protocol_version`](../../corpus/tables/ai_protocol_version.md) |
| `mcp_server_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `mcp_server_version_mcp_server_id_version_label_key` | `unique` | `UNIQUE (mcp_server_id, version_label)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `mcp_server_version_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `mcp_server_version_mcp_server_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| `mcp_server_version_protocol_version_id_fkey` | [`corpus.ai_protocol_version`](../../corpus/tables/ai_protocol_version.md) | `FOREIGN KEY (protocol_version_id) REFERENCES corpus.ai_protocol_version(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.mcp_server_prompt`](../../corpus/tables/mcp_server_prompt.md) | `mcp_server_prompt_mcp_server_version_id_fkey` | `FOREIGN KEY (mcp_server_version_id) REFERENCES corpus.mcp_server_version(id) ON DELETE CASCADE` |
| [`corpus.mcp_server_resource`](../../corpus/tables/mcp_server_resource.md) | `mcp_server_resource_mcp_server_version_id_fkey` | `FOREIGN KEY (mcp_server_version_id) REFERENCES corpus.mcp_server_version(id) ON DELETE CASCADE` |
| [`corpus.mcp_server_tool`](../../corpus/tables/mcp_server_tool.md) | `mcp_server_tool_mcp_server_version_id_fkey` | `FOREIGN KEY (mcp_server_version_id) REFERENCES corpus.mcp_server_version(id) ON DELETE CASCADE` |
| [`evidence.claim_mcp_server_version`](../../evidence/tables/claim_mcp_server_version.md) | `claim_mcp_server_version_mcp_server_version_id_fkey` | `FOREIGN KEY (mcp_server_version_id) REFERENCES corpus.mcp_server_version(id) ON DELETE CASCADE` |
| [`orchestration.capability`](../../orchestration/tables/capability.md) | `capability_packages_mcp_server_version_fk` | `FOREIGN KEY (packages_mcp_server_version_id) REFERENCES corpus.mcp_server_version(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `mcp_server_version_mcp_server_id_version_label_key` | `CREATE UNIQUE INDEX mcp_server_version_mcp_server_id_version_label_key ON corpus.mcp_server_version USING btree (mcp_server_id, version_label)` |
| `mcp_server_version_pkey` | `CREATE UNIQUE INDEX mcp_server_version_pkey ON corpus.mcp_server_version USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

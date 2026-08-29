---
schema: corpus
relation: mcp_server_prompt
qualified_name: corpus.mcp_server_prompt
kind: table
---

# corpus.mcp_server_prompt

Database table corpus.mcp_server_prompt.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["mcp_server_prompt"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus mcp_server_prompt corpus.mcp_server_prompt id mcp_server_version_id name arguments description created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mcp_server_version_id` | `uuid` | no | — | — |
| 3 | `name` | `text` | no | — | — |
| 4 | `arguments` | `jsonb` | yes | — | — |
| 5 | `description` | `text` | yes | — | — |
| 6 | `created_by_receipt_id` | `uuid` | no | — | — |
| 7 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `mcp_server_prompt_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `mcp_server_prompt_mcp_server_version_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_version_id) REFERENCES corpus.mcp_server_version(id) ON DELETE CASCADE` | [`corpus.mcp_server_version`](../../corpus/tables/mcp_server_version.md) |
| `mcp_server_prompt_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `mcp_server_prompt_mcp_server_version_id_name_key` | `unique` | `UNIQUE (mcp_server_version_id, name)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `mcp_server_prompt_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `mcp_server_prompt_mcp_server_version_id_fkey` | [`corpus.mcp_server_version`](../../corpus/tables/mcp_server_version.md) | `FOREIGN KEY (mcp_server_version_id) REFERENCES corpus.mcp_server_version(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `mcp_server_prompt_mcp_server_version_id_name_key` | `CREATE UNIQUE INDEX mcp_server_prompt_mcp_server_version_id_name_key ON corpus.mcp_server_prompt USING btree (mcp_server_version_id, name)` |
| `mcp_server_prompt_pkey` | `CREATE UNIQUE INDEX mcp_server_prompt_pkey ON corpus.mcp_server_prompt USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

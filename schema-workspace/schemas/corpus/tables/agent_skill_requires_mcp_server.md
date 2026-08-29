---
schema: corpus
relation: agent_skill_requires_mcp_server
qualified_name: corpus.agent_skill_requires_mcp_server
kind: table
---

# corpus.agent_skill_requires_mcp_server

Database table corpus.agent_skill_requires_mcp_server.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["agent_skill_requires_mcp_server"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus agent_skill_requires_mcp_server corpus.agent_skill_requires_mcp_server id agent_skill_id mcp_server_id min_server_version optionality valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `agent_skill_id` | `uuid` | no | — | — |
| 3 | `mcp_server_id` | `uuid` | no | — | — |
| 4 | `min_server_version` | `text` | yes | — | — |
| 5 | `optionality` | `text` | no | `'required'::text` | — |
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
| `agent_skill_requires_mcp_server_optionality_check` | `check` | `CHECK (optionality = ANY (ARRAY['required'::text, 'optional'::text, 'recommended'::text]))` | — |
| `agent_skill_requires_mcp_server_agent_skill_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) |
| `agent_skill_requires_mcp_server_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `agent_skill_requires_mcp_server_mcp_server_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `agent_skill_requires_mcp_server_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `agent_skill_requires_mcp_server_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `agent_skill_requires_mcp_serve_agent_skill_id_mcp_server_id_key` | `unique` | `UNIQUE (agent_skill_id, mcp_server_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `agent_skill_requires_mcp_server_agent_skill_id_fkey` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` |
| `agent_skill_requires_mcp_server_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `agent_skill_requires_mcp_server_mcp_server_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| `agent_skill_requires_mcp_server_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `agent_skill_requires_mcp_serve_agent_skill_id_mcp_server_id_key` | `CREATE UNIQUE INDEX agent_skill_requires_mcp_serve_agent_skill_id_mcp_server_id_key ON corpus.agent_skill_requires_mcp_server USING btree (agent_skill_id, mcp_server_id)` |
| `agent_skill_requires_mcp_server_pkey` | `CREATE UNIQUE INDEX agent_skill_requires_mcp_server_pkey ON corpus.agent_skill_requires_mcp_server USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

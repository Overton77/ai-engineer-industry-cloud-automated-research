---
schema: evidence
relation: claim_mcp_server_version
qualified_name: evidence.claim_mcp_server_version
kind: table
---

# evidence.claim_mcp_server_version

Database table evidence.claim_mcp_server_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_mcp_server_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_mcp_server_version evidence.claim_mcp_server_version claim_id mcp_server_version_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `mcp_server_version_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_mcp_server_version_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text]))` | — |
| `claim_mcp_server_version_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_mcp_server_version_mcp_server_version_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_version_id) REFERENCES corpus.mcp_server_version(id) ON DELETE CASCADE` | [`corpus.mcp_server_version`](../../corpus/tables/mcp_server_version.md) |
| `claim_mcp_server_version_pkey` | `primary_key` | `PRIMARY KEY (claim_id, mcp_server_version_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_mcp_server_version_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_mcp_server_version_mcp_server_version_id_fkey` | [`corpus.mcp_server_version`](../../corpus/tables/mcp_server_version.md) | `FOREIGN KEY (mcp_server_version_id) REFERENCES corpus.mcp_server_version(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_mcp_server_version_pkey` | `CREATE UNIQUE INDEX claim_mcp_server_version_pkey ON evidence.claim_mcp_server_version USING btree (claim_id, mcp_server_version_id, role_in_claim)` |
| `claim_mcp_server_version_target_idx` | `CREATE INDEX claim_mcp_server_version_target_idx ON evidence.claim_mcp_server_version USING btree (mcp_server_version_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: staging
relation: candidate_mcp_server
qualified_name: staging.candidate_mcp_server
kind: table
---

# staging.candidate_mcp_server

Database table staging.candidate_mcp_server.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["candidate_mcp_server"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging candidate_mcp_server staging.candidate_mcp_server candidate_id candidate_kind name registry_id ecosystem package_name repository_url transport_kinds`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `candidate_id` | `uuid` | no | — | — |
| 2 | `candidate_kind` | `text` | no | `'mcp_server'::text` | — |
| 3 | `name` | `text` | yes | — | — |
| 4 | `registry_id` | `text` | yes | — | — |
| 5 | `ecosystem` | `text` | yes | — | — |
| 6 | `package_name` | `text` | yes | — | — |
| 7 | `repository_url` | `text` | yes | — | — |
| 8 | `transport_kinds` | `text[]` | no | `'{}'::text[]` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `candidate_mcp_server_candidate_kind_check` | `check` | `CHECK (candidate_kind = 'mcp_server'::text)` | — |
| `candidate_mcp_server_candidate_id_candidate_kind_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_mcp_server_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_mcp_server_pkey` | `primary_key` | `PRIMARY KEY (candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `candidate_mcp_server_candidate_id_candidate_kind_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| `candidate_mcp_server_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `candidate_mcp_server_pkey` | `CREATE UNIQUE INDEX candidate_mcp_server_pkey ON staging.candidate_mcp_server USING btree (candidate_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

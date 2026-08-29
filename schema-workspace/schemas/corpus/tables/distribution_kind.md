---
schema: corpus
relation: distribution_kind
qualified_name: corpus.distribution_kind
kind: table
---

# corpus.distribution_kind

Database table corpus.distribution_kind.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["distribution_kind"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus distribution_kind corpus.distribution_kind code description`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `code` | `text` | no | — | — |
| 2 | `description` | `text` | no | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `distribution_kind_pkey` | `primary_key` | `PRIMARY KEY (code)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.library`](../../corpus/tables/library.md) | `library_ecosystem_fkey` | `FOREIGN KEY (ecosystem) REFERENCES corpus.distribution_kind(code)` |
| [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `mcp_server_distribution_kind_fkey` | `FOREIGN KEY (distribution_kind) REFERENCES corpus.distribution_kind(code)` |
| [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `mcp_server_ecosystem_fkey` | `FOREIGN KEY (ecosystem) REFERENCES corpus.distribution_kind(code)` |

## Indexes

| Name | Definition |
| --- | --- |
| `distribution_kind_pkey` | `CREATE UNIQUE INDEX distribution_kind_pkey ON corpus.distribution_kind USING btree (code)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

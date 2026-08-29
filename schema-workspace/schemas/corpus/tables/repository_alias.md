---
schema: corpus
relation: repository_alias
qualified_name: corpus.repository_alias
kind: table
---

# corpus.repository_alias

Database table corpus.repository_alias.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["repository_alias"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus repository_alias corpus.repository_alias id repository_id host owner name observed_at created_by_receipt_id`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `repository_id` | `uuid` | no | — | — |
| 3 | `host` | `text` | no | — | — |
| 4 | `owner` | `text` | no | — | — |
| 5 | `name` | `text` | no | — | — |
| 6 | `observed_at` | `timestamp with time zone` | no | `now()` | — |
| 7 | `created_by_receipt_id` | `uuid` | no | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `repository_alias_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `repository_alias_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `repository_alias_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `repository_alias_host_owner_name_key` | `unique` | `UNIQUE (host, owner, name)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `repository_alias_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `repository_alias_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `repository_alias_host_owner_name_key` | `CREATE UNIQUE INDEX repository_alias_host_owner_name_key ON corpus.repository_alias USING btree (host, owner, name)` |
| `repository_alias_pkey` | `CREATE UNIQUE INDEX repository_alias_pkey ON corpus.repository_alias USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

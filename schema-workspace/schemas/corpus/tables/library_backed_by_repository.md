---
schema: corpus
relation: library_backed_by_repository
qualified_name: corpus.library_backed_by_repository
kind: table
---

# corpus.library_backed_by_repository

Database table corpus.library_backed_by_repository.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["library_backed_by_repository"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus library_backed_by_repository corpus.library_backed_by_repository id library_id repository_id relationship_kind path_in_repo valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `library_id` | `uuid` | no | — | — |
| 3 | `repository_id` | `uuid` | no | — | — |
| 4 | `relationship_kind` | `text` | no | `'source'::text` | — |
| 5 | `path_in_repo` | `text` | yes | — | — |
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
| `library_backed_by_repository_relationship_kind_check` | `check` | `CHECK (relationship_kind = ANY (ARRAY['source'::text, 'mirror'::text, 'fork'::text, 'monorepo_path'::text]))` | — |
| `library_backed_by_repository_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `library_backed_by_repository_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` | [`corpus.library`](../../corpus/tables/library.md) |
| `library_backed_by_repository_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `library_backed_by_repository_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `library_backed_by_repository_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `library_backed_by_repository_library_id_repository_id_relat_key` | `unique` | `UNIQUE (library_id, repository_id, relationship_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `library_backed_by_repository_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `library_backed_by_repository_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| `library_backed_by_repository_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `library_backed_by_repository_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `library_backed_by_repository_library_id_repository_id_relat_key` | `CREATE UNIQUE INDEX library_backed_by_repository_library_id_repository_id_relat_key ON corpus.library_backed_by_repository USING btree (library_id, repository_id, relationship_kind)` |
| `library_backed_by_repository_pkey` | `CREATE UNIQUE INDEX library_backed_by_repository_pkey ON corpus.library_backed_by_repository USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

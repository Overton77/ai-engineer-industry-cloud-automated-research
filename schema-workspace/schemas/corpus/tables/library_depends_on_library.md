---
schema: corpus
relation: library_depends_on_library
qualified_name: corpus.library_depends_on_library
kind: table
---

# corpus.library_depends_on_library

Database table corpus.library_depends_on_library.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["library_depends_on_library"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus library_depends_on_library corpus.library_depends_on_library id library_id depends_on_id dependency_kind version_range valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `library_id` | `uuid` | no | — | — |
| 3 | `depends_on_id` | `uuid` | no | — | — |
| 4 | `dependency_kind` | `text` | no | — | — |
| 5 | `version_range` | `text` | yes | — | — |
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
| `library_depends_no_self` | `check` | `CHECK (library_id <> depends_on_id)` | — |
| `library_depends_on_library_dependency_kind_check` | `check` | `CHECK (dependency_kind = ANY (ARRAY['runtime'::text, 'dev'::text, 'peer'::text, 'optional'::text, 'build'::text]))` | — |
| `library_depends_on_library_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `library_depends_on_library_depends_on_id_fkey` | `foreign_key` | `FOREIGN KEY (depends_on_id) REFERENCES corpus.library(id) ON DELETE CASCADE` | [`corpus.library`](../../corpus/tables/library.md) |
| `library_depends_on_library_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` | [`corpus.library`](../../corpus/tables/library.md) |
| `library_depends_on_library_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `library_depends_on_library_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `library_depends_on_library_library_id_depends_on_id_depende_key` | `unique` | `UNIQUE (library_id, depends_on_id, dependency_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `library_depends_on_library_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `library_depends_on_library_depends_on_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (depends_on_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| `library_depends_on_library_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| `library_depends_on_library_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `library_depends_on_library_library_id_depends_on_id_depende_key` | `CREATE UNIQUE INDEX library_depends_on_library_library_id_depends_on_id_depende_key ON corpus.library_depends_on_library USING btree (library_id, depends_on_id, dependency_kind)` |
| `library_depends_on_library_pkey` | `CREATE UNIQUE INDEX library_depends_on_library_pkey ON corpus.library_depends_on_library USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

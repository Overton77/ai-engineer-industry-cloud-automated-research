---
schema: corpus
relation: library_supports_model_version
qualified_name: corpus.library_supports_model_version
kind: table
---

# corpus.library_supports_model_version

Database table corpus.library_supports_model_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["library_supports_model_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus library_supports_model_version corpus.library_supports_model_version id library_id ai_model_version_id integration_kind valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `library_id` | `uuid` | no | — | — |
| 3 | `ai_model_version_id` | `uuid` | no | — | — |
| 4 | `integration_kind` | `text` | no | — | — |
| 5 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 6 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 7 | `confidence` | `corpus.confidence` | yes | — | — |
| 8 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 9 | `provenance_claim_id` | `uuid` | yes | — | — |
| 10 | `created_by_receipt_id` | `uuid` | no | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `library_supports_model_version_integration_kind_check` | `check` | `CHECK (integration_kind = ANY (ARRAY['sdk'::text, 'adapter'::text, 'native'::text, 'community'::text]))` | — |
| `library_supports_model_version_ai_model_version_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) |
| `library_supports_model_version_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `library_supports_model_version_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` | [`corpus.library`](../../corpus/tables/library.md) |
| `library_supports_model_version_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `library_supports_model_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `library_supports_model_versio_library_id_ai_model_version_i_key` | `unique` | `UNIQUE (library_id, ai_model_version_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `library_supports_model_version_ai_model_version_id_fkey` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| `library_supports_model_version_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `library_supports_model_version_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| `library_supports_model_version_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `library_supports_model_versio_library_id_ai_model_version_i_key` | `CREATE UNIQUE INDEX library_supports_model_versio_library_id_ai_model_version_i_key ON corpus.library_supports_model_version USING btree (library_id, ai_model_version_id)` |
| `library_supports_model_version_pkey` | `CREATE UNIQUE INDEX library_supports_model_version_pkey ON corpus.library_supports_model_version USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

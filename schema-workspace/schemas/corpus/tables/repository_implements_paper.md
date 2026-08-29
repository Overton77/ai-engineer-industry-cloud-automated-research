---
schema: corpus
relation: repository_implements_paper
qualified_name: corpus.repository_implements_paper
kind: table
---

# corpus.repository_implements_paper

Database table corpus.repository_implements_paper.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["repository_implements_paper"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus repository_implements_paper corpus.repository_implements_paper id repository_id paper_id fidelity notes valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `repository_id` | `uuid` | no | — | — |
| 3 | `paper_id` | `uuid` | no | — | — |
| 4 | `fidelity` | `text` | no | — | — |
| 5 | `notes` | `text` | yes | — | — |
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
| `repository_implements_paper_fidelity_check` | `check` | `CHECK (fidelity = ANY (ARRAY['official'::text, 'reference'::text, 'reimplementation'::text, 'partial'::text]))` | — |
| `repository_implements_paper_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `repository_implements_paper_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `repository_implements_paper_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `repository_implements_paper_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `repository_implements_paper_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `repository_implements_paper_repository_id_paper_id_key` | `unique` | `UNIQUE (repository_id, paper_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `repository_implements_paper_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `repository_implements_paper_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| `repository_implements_paper_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `repository_implements_paper_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `repository_implements_paper_pkey` | `CREATE UNIQUE INDEX repository_implements_paper_pkey ON corpus.repository_implements_paper USING btree (id)` |
| `repository_implements_paper_repository_id_paper_id_key` | `CREATE UNIQUE INDEX repository_implements_paper_repository_id_paper_id_key ON corpus.repository_implements_paper USING btree (repository_id, paper_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

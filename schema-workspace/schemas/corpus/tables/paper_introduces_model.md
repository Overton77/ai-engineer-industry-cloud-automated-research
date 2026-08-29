---
schema: corpus
relation: paper_introduces_model
qualified_name: corpus.paper_introduces_model
kind: table
---

# corpus.paper_introduces_model

Database table corpus.paper_introduces_model.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["paper_introduces_model"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus paper_introduces_model corpus.paper_introduces_model paper_id ai_model_id relationship_kind provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `paper_id` | `uuid` | no | — | — |
| 2 | `ai_model_id` | `uuid` | no | — | — |
| 3 | `relationship_kind` | `text` | no | `'introduces'::text` | — |
| 4 | `provenance_claim_id` | `uuid` | yes | — | — |
| 5 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `paper_introduces_model_relationship_kind_check` | `check` | `CHECK (relationship_kind = ANY (ARRAY['introduces'::text, 'describes'::text, 'evaluates'::text, 'compares'::text, 'extends'::text]))` | — |
| `paper_introduces_model_ai_model_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) |
| `paper_introduces_model_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `paper_introduces_model_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `paper_introduces_model_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `paper_introduces_model_pkey` | `primary_key` | `PRIMARY KEY (paper_id, ai_model_id, relationship_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `paper_introduces_model_ai_model_id_fkey` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` |
| `paper_introduces_model_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `paper_introduces_model_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| `paper_introduces_model_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `paper_introduces_model_idx` | `CREATE INDEX paper_introduces_model_idx ON corpus.paper_introduces_model USING btree (ai_model_id)` |
| `paper_introduces_model_pkey` | `CREATE UNIQUE INDEX paper_introduces_model_pkey ON corpus.paper_introduces_model USING btree (paper_id, ai_model_id, relationship_kind)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

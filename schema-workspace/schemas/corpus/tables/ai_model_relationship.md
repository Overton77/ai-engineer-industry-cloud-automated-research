---
schema: corpus
relation: ai_model_relationship
qualified_name: corpus.ai_model_relationship
kind: table
---

# corpus.ai_model_relationship

Database table corpus.ai_model_relationship.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["ai_model_relationship"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus ai_model_relationship corpus.ai_model_relationship from_ai_model_id to_ai_model_id relationship_kind provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `from_ai_model_id` | `uuid` | no | — | — |
| 2 | `to_ai_model_id` | `uuid` | no | — | — |
| 3 | `relationship_kind` | `text` | no | — | — |
| 4 | `provenance_claim_id` | `uuid` | yes | — | — |
| 5 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ai_model_relationship_no_self` | `check` | `CHECK (from_ai_model_id <> to_ai_model_id)` | — |
| `ai_model_relationship_relationship_kind_check` | `check` | `CHECK (relationship_kind = ANY (ARRAY['derived_from'::text, 'fine_tuned_from'::text, 'distilled_from'::text, 'quantized_from'::text, 'adapter_for'::text, 'supersedes'::text, 'component_of'::text, 'other'::text]))` | — |
| `ai_model_relationship_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `ai_model_relationship_from_ai_model_id_fkey` | `foreign_key` | `FOREIGN KEY (from_ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) |
| `ai_model_relationship_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `ai_model_relationship_to_ai_model_id_fkey` | `foreign_key` | `FOREIGN KEY (to_ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) |
| `ai_model_relationship_pkey` | `primary_key` | `PRIMARY KEY (from_ai_model_id, to_ai_model_id, relationship_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `ai_model_relationship_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `ai_model_relationship_from_ai_model_id_fkey` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `FOREIGN KEY (from_ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` |
| `ai_model_relationship_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `ai_model_relationship_to_ai_model_id_fkey` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `FOREIGN KEY (to_ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `ai_model_relationship_pkey` | `CREATE UNIQUE INDEX ai_model_relationship_pkey ON corpus.ai_model_relationship USING btree (from_ai_model_id, to_ai_model_id, relationship_kind)` |
| `ai_model_relationship_to_idx` | `CREATE INDEX ai_model_relationship_to_idx ON corpus.ai_model_relationship USING btree (to_ai_model_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

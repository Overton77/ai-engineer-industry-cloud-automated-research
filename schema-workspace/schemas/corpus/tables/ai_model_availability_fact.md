---
schema: corpus
relation: ai_model_availability_fact
qualified_name: corpus.ai_model_availability_fact
kind: table
---

# corpus.ai_model_availability_fact

Database table corpus.ai_model_availability_fact.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["ai_model_availability_fact"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus ai_model_availability_fact corpus.ai_model_availability_fact id ai_model_version_id availability valid_from valid_to validity confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `ai_model_version_id` | `uuid` | no | — | — |
| 3 | `availability` | `text` | no | — | — |
| 4 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 5 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 6 | `validity` | `tstzrange` | yes | `tstzrange(valid_from, valid_to, '[)'::text)` | — |
| 7 | `confidence` | `corpus.confidence` | yes | — | — |
| 8 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 9 | `provenance_claim_id` | `uuid` | yes | — | — |
| 10 | `created_by_receipt_id` | `uuid` | no | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ai_model_availability_fact_availability_check` | `check` | `CHECK (availability = ANY (ARRAY['ga'::text, 'preview'::text, 'deprecated'::text, 'retired'::text]))` | — |
| `ai_model_availability_fact_ai_model_version_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) |
| `ai_model_availability_fact_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `ai_model_availability_fact_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `ai_model_availability_fact_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `ai_model_availability_no_overlap` | `exclusion` | `EXCLUDE USING gist (ai_model_version_id WITH =, validity WITH &&) WHERE (lifecycle_state::text = 'active'::text)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `ai_model_availability_fact_ai_model_version_id_fkey` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| `ai_model_availability_fact_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `ai_model_availability_fact_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `ai_model_availability_fact_pkey` | `CREATE UNIQUE INDEX ai_model_availability_fact_pkey ON corpus.ai_model_availability_fact USING btree (id)` |
| `ai_model_availability_no_overlap` | `CREATE INDEX ai_model_availability_no_overlap ON corpus.ai_model_availability_fact USING gist (ai_model_version_id, validity) WHERE ((lifecycle_state)::text = 'active'::text)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

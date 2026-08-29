---
schema: corpus
relation: paper_retraction_fact
qualified_name: corpus.paper_retraction_fact
kind: table
---

# corpus.paper_retraction_fact

Database table corpus.paper_retraction_fact.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["paper_retraction_fact"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus paper_retraction_fact corpus.paper_retraction_fact id paper_id state notice_url valid_from valid_to validity confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `paper_id` | `uuid` | no | — | — |
| 3 | `state` | `text` | no | — | — |
| 4 | `notice_url` | `text` | yes | — | — |
| 5 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 6 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 7 | `validity` | `tstzrange` | yes | `tstzrange(valid_from, valid_to, '[)'::text)` | — |
| 8 | `confidence` | `corpus.confidence` | yes | — | — |
| 9 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 10 | `provenance_claim_id` | `uuid` | yes | — | — |
| 11 | `created_by_receipt_id` | `uuid` | no | — | — |
| 12 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `paper_retraction_fact_state_check` | `check` | `CHECK (state = ANY (ARRAY['none'::text, 'correction'::text, 'expression_of_concern'::text, 'retracted'::text]))` | — |
| `paper_retraction_fact_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `paper_retraction_fact_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `paper_retraction_fact_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `paper_retraction_fact_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `paper_retraction_no_overlap` | `exclusion` | `EXCLUDE USING gist (paper_id WITH =, validity WITH &&) WHERE (lifecycle_state::text = 'active'::text)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `paper_retraction_fact_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `paper_retraction_fact_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| `paper_retraction_fact_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `paper_retraction_fact_pkey` | `CREATE UNIQUE INDEX paper_retraction_fact_pkey ON corpus.paper_retraction_fact USING btree (id)` |
| `paper_retraction_no_overlap` | `CREATE INDEX paper_retraction_no_overlap ON corpus.paper_retraction_fact USING gist (paper_id, validity) WHERE ((lifecycle_state)::text = 'active'::text)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

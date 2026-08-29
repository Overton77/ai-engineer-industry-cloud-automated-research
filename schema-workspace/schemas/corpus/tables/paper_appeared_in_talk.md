---
schema: corpus
relation: paper_appeared_in_talk
qualified_name: corpus.paper_appeared_in_talk
kind: table
---

# corpus.paper_appeared_in_talk

Database table corpus.paper_appeared_in_talk.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["paper_appeared_in_talk"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus paper_appeared_in_talk corpus.paper_appeared_in_talk id paper_id talk_id treatment valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `paper_id` | `uuid` | no | — | — |
| 3 | `talk_id` | `uuid` | no | — | — |
| 4 | `treatment` | `text` | yes | — | — |
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
| `paper_appeared_in_talk_treatment_check` | `check` | `CHECK (treatment = ANY (ARRAY['cited'::text, 'summarized'::text, 'critiqued'::text, 'presented'::text]))` | — |
| `paper_appeared_in_talk_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `paper_appeared_in_talk_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `paper_appeared_in_talk_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `paper_appeared_in_talk_talk_id_fkey` | `foreign_key` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` | [`corpus.talk`](../../corpus/tables/talk.md) |
| `paper_appeared_in_talk_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `paper_appeared_in_talk_paper_id_talk_id_key` | `unique` | `UNIQUE (paper_id, talk_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `paper_appeared_in_talk_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `paper_appeared_in_talk_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| `paper_appeared_in_talk_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `paper_appeared_in_talk_talk_id_fkey` | [`corpus.talk`](../../corpus/tables/talk.md) | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `paper_appeared_in_talk_paper_id_talk_id_key` | `CREATE UNIQUE INDEX paper_appeared_in_talk_paper_id_talk_id_key ON corpus.paper_appeared_in_talk USING btree (paper_id, talk_id)` |
| `paper_appeared_in_talk_pkey` | `CREATE UNIQUE INDEX paper_appeared_in_talk_pkey ON corpus.paper_appeared_in_talk USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

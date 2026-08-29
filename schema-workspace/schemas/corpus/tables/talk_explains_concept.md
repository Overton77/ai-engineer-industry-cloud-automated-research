---
schema: corpus
relation: talk_explains_concept
qualified_name: corpus.talk_explains_concept
kind: table
---

# corpus.talk_explains_concept

Database table corpus.talk_explains_concept.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["talk_explains_concept"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus talk_explains_concept corpus.talk_explains_concept id talk_id concept_id depth valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `talk_id` | `uuid` | no | — | — |
| 3 | `concept_id` | `uuid` | no | — | — |
| 4 | `depth` | `text` | no | `'mention'::text` | — |
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
| `talk_explains_concept_depth_check` | `check` | `CHECK (depth = ANY (ARRAY['mention'::text, 'section'::text, 'dedicated'::text]))` | — |
| `talk_explains_concept_concept_id_fkey` | `foreign_key` | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` | [`corpus.concept`](../../corpus/tables/concept.md) |
| `talk_explains_concept_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `talk_explains_concept_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `talk_explains_concept_talk_id_fkey` | `foreign_key` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` | [`corpus.talk`](../../corpus/tables/talk.md) |
| `talk_explains_concept_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `talk_explains_concept_talk_id_concept_id_key` | `unique` | `UNIQUE (talk_id, concept_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `talk_explains_concept_concept_id_fkey` | [`corpus.concept`](../../corpus/tables/concept.md) | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` |
| `talk_explains_concept_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `talk_explains_concept_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `talk_explains_concept_talk_id_fkey` | [`corpus.talk`](../../corpus/tables/talk.md) | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `talk_explains_concept_pkey` | `CREATE UNIQUE INDEX talk_explains_concept_pkey ON corpus.talk_explains_concept USING btree (id)` |
| `talk_explains_concept_talk_id_concept_id_key` | `CREATE UNIQUE INDEX talk_explains_concept_talk_id_concept_id_key ON corpus.talk_explains_concept USING btree (talk_id, concept_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: corpus
relation: person_presented_at_talk
qualified_name: corpus.person_presented_at_talk
kind: table
---

# corpus.person_presented_at_talk

Database table corpus.person_presented_at_talk.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["person_presented_at_talk"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus person_presented_at_talk corpus.person_presented_at_talk id person_id talk_id speaker_role speaker_position valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `person_id` | `uuid` | no | — | — |
| 3 | `talk_id` | `uuid` | no | — | — |
| 4 | `speaker_role` | `text` | no | `'speaker'::text` | — |
| 5 | `speaker_position` | `integer` | yes | — | — |
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
| `person_presented_at_talk_speaker_role_check` | `check` | `CHECK (speaker_role = ANY (ARRAY['speaker'::text, 'co_speaker'::text, 'panelist'::text, 'moderator'::text, 'host'::text]))` | — |
| `person_presented_at_talk_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `person_presented_at_talk_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` | [`corpus.person`](../../corpus/tables/person.md) |
| `person_presented_at_talk_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `person_presented_at_talk_talk_id_fkey` | `foreign_key` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` | [`corpus.talk`](../../corpus/tables/talk.md) |
| `person_presented_at_talk_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `person_presented_at_talk_person_id_talk_id_speaker_role_key` | `unique` | `UNIQUE (person_id, talk_id, speaker_role)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `person_presented_at_talk_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `person_presented_at_talk_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| `person_presented_at_talk_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `person_presented_at_talk_talk_id_fkey` | [`corpus.talk`](../../corpus/tables/talk.md) | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `person_presented_at_talk_person_id_talk_id_speaker_role_key` | `CREATE UNIQUE INDEX person_presented_at_talk_person_id_talk_id_speaker_role_key ON corpus.person_presented_at_talk USING btree (person_id, talk_id, speaker_role)` |
| `person_presented_at_talk_pkey` | `CREATE UNIQUE INDEX person_presented_at_talk_pkey ON corpus.person_presented_at_talk USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

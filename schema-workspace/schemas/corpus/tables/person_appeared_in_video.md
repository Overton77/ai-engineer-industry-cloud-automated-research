---
schema: corpus
relation: person_appeared_in_video
qualified_name: corpus.person_appeared_in_video
kind: table
---

# corpus.person_appeared_in_video

Database table corpus.person_appeared_in_video.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["person_appeared_in_video"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus person_appeared_in_video corpus.person_appeared_in_video id person_id video_id appearance_role locator_id valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `person_id` | `uuid` | no | — | — |
| 3 | `video_id` | `uuid` | no | — | — |
| 4 | `appearance_role` | `text` | yes | — | — |
| 5 | `locator_id` | `uuid` | yes | — | — |
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
| `person_appeared_in_video_appearance_role_check` | `check` | `CHECK (appearance_role = ANY (ARRAY['speaker'::text, 'interviewee'::text, 'interviewer'::text, 'panelist'::text, 'mentioned'::text]))` | — |
| `person_appeared_in_video_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `person_appeared_in_video_locator_id_fkey` | `foreign_key` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` | [`evidence.locator`](../../evidence/tables/locator.md) |
| `person_appeared_in_video_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` | [`corpus.person`](../../corpus/tables/person.md) |
| `person_appeared_in_video_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `person_appeared_in_video_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` | [`corpus.video`](../../corpus/tables/video.md) |
| `person_appeared_in_video_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `person_appeared_in_video_person_id_video_id_key` | `unique` | `UNIQUE (person_id, video_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `person_appeared_in_video_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `person_appeared_in_video_locator_id_fkey` | [`evidence.locator`](../../evidence/tables/locator.md) | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| `person_appeared_in_video_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| `person_appeared_in_video_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `person_appeared_in_video_video_id_fkey` | [`corpus.video`](../../corpus/tables/video.md) | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `person_appeared_in_video_person_id_video_id_key` | `CREATE UNIQUE INDEX person_appeared_in_video_person_id_video_id_key ON corpus.person_appeared_in_video USING btree (person_id, video_id)` |
| `person_appeared_in_video_pkey` | `CREATE UNIQUE INDEX person_appeared_in_video_pkey ON corpus.person_appeared_in_video USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: corpus
relation: talk
qualified_name: corpus.talk
kind: table
---

# corpus.talk

Database table corpus.talk.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["talk"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus talk corpus.talk id tenant_id title event_slug event_name event_edition delivered_on recording_video_id abstract lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `title` | `text` | no | — | — |
| 4 | `event_slug` | `text` | yes | — | — |
| 5 | `event_name` | `text` | yes | — | — |
| 6 | `event_edition` | `text` | yes | — | — |
| 7 | `delivered_on` | `date` | yes | — | — |
| 8 | `recording_video_id` | `uuid` | yes | — | — |
| 9 | `abstract` | `text` | yes | — | — |
| 10 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 11 | `merged_into_id` | `uuid` | yes | — | — |
| 12 | `created_by_receipt_id` | `uuid` | no | — | — |
| 13 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 14 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 15 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `talk_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `talk_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.talk(id)` | [`corpus.talk`](../../corpus/tables/talk.md) |
| `talk_recording_video_id_fkey` | `foreign_key` | `FOREIGN KEY (recording_video_id) REFERENCES corpus.video(id)` | [`corpus.video`](../../corpus/tables/video.md) |
| `talk_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `talk_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `talk_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `talk_merged_into_id_fkey` | [`corpus.talk`](../../corpus/tables/talk.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.talk(id)` |
| `talk_recording_video_id_fkey` | [`corpus.video`](../../corpus/tables/video.md) | `FOREIGN KEY (recording_video_id) REFERENCES corpus.video(id)` |
| `talk_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.paper_appeared_in_talk`](../../corpus/tables/paper_appeared_in_talk.md) | `paper_appeared_in_talk_talk_id_fkey` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` |
| [`corpus.person_presented_at_talk`](../../corpus/tables/person_presented_at_talk.md) | `person_presented_at_talk_talk_id_fkey` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` |
| [`corpus.talk`](../../corpus/tables/talk.md) | `talk_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.talk(id)` |
| [`corpus.talk_explains_concept`](../../corpus/tables/talk_explains_concept.md) | `talk_explains_concept_talk_id_fkey` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` |
| [`evidence.claim_talk`](../../evidence/tables/claim_talk.md) | `claim_talk_talk_id_fkey` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_talk_id_fkey` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_talk_id_fkey` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_talk_id_fkey` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `talk_event_title_uq` | `CREATE UNIQUE INDEX talk_event_title_uq ON corpus.talk USING btree (event_slug, title, delivered_on) WHERE ((event_slug IS NOT NULL) AND (delivered_on IS NOT NULL))` |
| `talk_pkey` | `CREATE UNIQUE INDEX talk_pkey ON corpus.talk USING btree (id)` |
| `talk_recording_idx` | `CREATE INDEX talk_recording_idx ON corpus.talk USING btree (recording_video_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

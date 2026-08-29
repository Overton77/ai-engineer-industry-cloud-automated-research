---
schema: corpus
relation: video
qualified_name: corpus.video
kind: table
---

# corpus.video

Database table corpus.video.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["video"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus video corpus.video id tenant_id platform external_id title channel channel_external_id published_at duration_seconds url transcript_artifact_id lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `platform` | `text` | no | — | — |
| 4 | `external_id` | `text` | no | — | — |
| 5 | `title` | `text` | no | — | — |
| 6 | `channel` | `text` | yes | — | — |
| 7 | `channel_external_id` | `text` | yes | — | — |
| 8 | `published_at` | `timestamp with time zone` | yes | — | — |
| 9 | `duration_seconds` | `integer` | yes | — | — |
| 10 | `url` | `text` | yes | — | — |
| 11 | `transcript_artifact_id` | `uuid` | yes | — | — |
| 12 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 13 | `merged_into_id` | `uuid` | yes | — | — |
| 14 | `created_by_receipt_id` | `uuid` | no | — | — |
| 15 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 16 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 17 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `video_duration_seconds_check` | `check` | `CHECK (duration_seconds IS NULL OR duration_seconds >= 0)` | — |
| `video_platform_check` | `check` | `CHECK (platform = ANY (ARRAY['youtube'::text, 'vimeo'::text, 'twitch'::text, 'x'::text, 'self_hosted'::text, 'other'::text]))` | — |
| `video_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `video_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.video(id)` | [`corpus.video`](../../corpus/tables/video.md) |
| `video_transcript_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (transcript_artifact_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `video_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `video_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `video_platform_external_id_key` | `unique` | `UNIQUE (platform, external_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `video_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `video_merged_into_id_fkey` | [`corpus.video`](../../corpus/tables/video.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.video(id)` |
| `video_transcript_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (transcript_artifact_id) REFERENCES orchestration.artifact(id)` |
| `video_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.library_appeared_in_video`](../../corpus/tables/library_appeared_in_video.md) | `library_appeared_in_video_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |
| [`corpus.paper_appeared_in_video`](../../corpus/tables/paper_appeared_in_video.md) | `paper_appeared_in_video_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |
| [`corpus.person_appeared_in_video`](../../corpus/tables/person_appeared_in_video.md) | `person_appeared_in_video_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |
| [`corpus.product_appeared_in_video`](../../corpus/tables/product_appeared_in_video.md) | `product_appeared_in_video_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |
| [`corpus.talk`](../../corpus/tables/talk.md) | `talk_recording_video_id_fkey` | `FOREIGN KEY (recording_video_id) REFERENCES corpus.video(id)` |
| [`corpus.video`](../../corpus/tables/video.md) | `video_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.video(id)` |
| [`evidence.claim_video`](../../evidence/tables/claim_video.md) | `claim_video_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_video_id_fkey` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `video_pkey` | `CREATE UNIQUE INDEX video_pkey ON corpus.video USING btree (id)` |
| `video_platform_external_id_key` | `CREATE UNIQUE INDEX video_platform_external_id_key ON corpus.video USING btree (platform, external_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

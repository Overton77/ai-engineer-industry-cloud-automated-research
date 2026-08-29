---
schema: orchestration
relation: artifact
qualified_name: orchestration.artifact
kind: table
---

# orchestration.artifact

Database table orchestration.artifact.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["artifact"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration artifact orchestration.artifact id tenant_id artifact_type schema_version sha256 bucket_class storage_bucket object_path media_type size_bytes producer_attempt_id mission_id superseded_by_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `artifact_type` | `text` | no | — | — |
| 4 | `schema_version` | `integer` | no | `1` | — |
| 5 | `sha256` | `text` | no | — | — |
| 6 | `bucket_class` | `orchestration.bucket_class` | no | — | — |
| 7 | `storage_bucket` | `text` | no | — | — |
| 8 | `object_path` | `text` | no | — | — |
| 9 | `media_type` | `text` | yes | — | — |
| 10 | `size_bytes` | `bigint` | yes | — | — |
| 11 | `producer_attempt_id` | `uuid` | yes | — | — |
| 12 | `mission_id` | `uuid` | yes | — | — |
| 13 | `superseded_by_id` | `uuid` | yes | — | — |
| 14 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `artifact_sha256_check` | `check` | `CHECK (sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `artifact_size_bytes_check` | `check` | `CHECK (size_bytes >= 0)` | — |
| `artifact_artifact_type_fkey` | `foreign_key` | `FOREIGN KEY (artifact_type) REFERENCES orchestration.artifact_type(code)` | [`orchestration.artifact_type`](../../orchestration/tables/artifact_type.md) |
| `artifact_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `artifact_producer_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (producer_attempt_id) REFERENCES orchestration.attempt(id)` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `artifact_superseded_by_id_fkey` | `foreign_key` | `FOREIGN KEY (superseded_by_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `artifact_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `artifact_sha256_artifact_type_key` | `unique` | `UNIQUE (sha256, artifact_type)` | — |
| `artifact_storage_bucket_object_path_key` | `unique` | `UNIQUE (storage_bucket, object_path)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `artifact_artifact_type_fkey` | [`orchestration.artifact_type`](../../orchestration/tables/artifact_type.md) | `FOREIGN KEY (artifact_type) REFERENCES orchestration.artifact_type(code)` |
| `artifact_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` |
| `artifact_producer_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (producer_attempt_id) REFERENCES orchestration.attempt(id)` |
| `artifact_superseded_by_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (superseded_by_id) REFERENCES orchestration.artifact(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.video`](../../corpus/tables/video.md) | `video_transcript_artifact_id_fkey` | `FOREIGN KEY (transcript_artifact_id) REFERENCES orchestration.artifact(id)` |
| [`evidence.executable_verification`](../../evidence/tables/executable_verification.md) | `executable_verification_log_artifact_id_fkey` | `FOREIGN KEY (log_artifact_id) REFERENCES orchestration.artifact(id)` |
| [`evidence.source_capture`](../../evidence/tables/source_capture.md) | `source_capture_artifact_id_fkey` | `FOREIGN KEY (artifact_id) REFERENCES orchestration.artifact(id)` |
| [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `artifact_superseded_by_id_fkey` | `FOREIGN KEY (superseded_by_id) REFERENCES orchestration.artifact(id)` |
| [`orchestration.continuation_checkpoint`](../../orchestration/tables/continuation_checkpoint.md) | `continuation_checkpoint_package_artifact_id_fkey` | `FOREIGN KEY (package_artifact_id) REFERENCES orchestration.artifact(id)` |
| [`orchestration.work_item_artifact`](../../orchestration/tables/work_item_artifact.md) | `work_item_artifact_artifact_id_fkey` | `FOREIGN KEY (artifact_id) REFERENCES orchestration.artifact(id) ON DELETE CASCADE` |
| [`research.bundle_artifact`](../../research/tables/bundle_artifact.md) | `bundle_artifact_artifact_id_fkey` | `FOREIGN KEY (artifact_id) REFERENCES orchestration.artifact(id)` |
| [`research.downstream_handoff`](../../research/tables/downstream_handoff.md) | `downstream_handoff_payload_artifact_id_fkey` | `FOREIGN KEY (payload_artifact_id) REFERENCES orchestration.artifact(id)` |
| [`research.report_version`](../../research/tables/report_version.md) | `report_version_json_artifact_id_fkey` | `FOREIGN KEY (json_artifact_id) REFERENCES orchestration.artifact(id)` |
| [`research.report_version`](../../research/tables/report_version.md) | `report_version_markdown_artifact_id_fkey` | `FOREIGN KEY (markdown_artifact_id) REFERENCES orchestration.artifact(id)` |
| [`research.research_bundle`](../../research/tables/research_bundle.md) | `research_bundle_manifest_artifact_id_fkey` | `FOREIGN KEY (manifest_artifact_id) REFERENCES orchestration.artifact(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `artifact_mission_idx` | `CREATE INDEX artifact_mission_idx ON orchestration.artifact USING btree (mission_id)` |
| `artifact_pkey` | `CREATE UNIQUE INDEX artifact_pkey ON orchestration.artifact USING btree (id)` |
| `artifact_sha256_artifact_type_key` | `CREATE UNIQUE INDEX artifact_sha256_artifact_type_key ON orchestration.artifact USING btree (sha256, artifact_type)` |
| `artifact_storage_bucket_object_path_key` | `CREATE UNIQUE INDEX artifact_storage_bucket_object_path_key ON orchestration.artifact USING btree (storage_bucket, object_path)` |
| `artifact_type_idx` | `CREATE INDEX artifact_type_idx ON orchestration.artifact USING btree (artifact_type, created_at DESC)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

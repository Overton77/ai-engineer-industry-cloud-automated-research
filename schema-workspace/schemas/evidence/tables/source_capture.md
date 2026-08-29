---
schema: evidence
relation: source_capture
qualified_name: evidence.source_capture
kind: table
---

# evidence.source_capture

Database table evidence.source_capture.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["source_capture"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence source_capture evidence.source_capture id tenant_id source_id artifact_id content_sha256 media_type captured_at capture_method capture_method_version request_url http_status http_headers context produced_by_attempt_id`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `source_id` | `uuid` | no | — | — |
| 4 | `artifact_id` | `uuid` | no | — | — |
| 5 | `content_sha256` | `text` | no | — | — |
| 6 | `media_type` | `text` | no | — | — |
| 7 | `captured_at` | `timestamp with time zone` | no | `now()` | — |
| 8 | `capture_method` | `text` | no | — | — |
| 9 | `capture_method_version` | `text` | no | — | — |
| 10 | `request_url` | `text` | yes | — | — |
| 11 | `http_status` | `integer` | yes | — | — |
| 12 | `http_headers` | `jsonb` | yes | — | — |
| 13 | `context` | `jsonb` | no | `'{}'::jsonb` | — |
| 14 | `produced_by_attempt_id` | `uuid` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `source_capture_content_sha256_check` | `check` | `CHECK (content_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `source_capture_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (artifact_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `source_capture_produced_by_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (produced_by_attempt_id) REFERENCES orchestration.attempt(id)` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `source_capture_source_id_fkey` | `foreign_key` | `FOREIGN KEY (source_id) REFERENCES evidence.source(id)` | [`evidence.source`](../../evidence/tables/source.md) |
| `source_capture_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `source_capture_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (artifact_id) REFERENCES orchestration.artifact(id)` |
| `source_capture_produced_by_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (produced_by_attempt_id) REFERENCES orchestration.attempt(id)` |
| `source_capture_source_id_fkey` | [`evidence.source`](../../evidence/tables/source.md) | `FOREIGN KEY (source_id) REFERENCES evidence.source(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.locator`](../../evidence/tables/locator.md) | `locator_capture_id_fkey` | `FOREIGN KEY (capture_id) REFERENCES evidence.source_capture(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_raw_capture_id_fkey` | `FOREIGN KEY (raw_capture_id) REFERENCES evidence.source_capture(id)` |
| [`staging.candidate`](../../staging/tables/candidate.md) | `candidate_capture_id_fkey` | `FOREIGN KEY (capture_id) REFERENCES evidence.source_capture(id)` |
| [`staging.mention`](../../staging/tables/mention.md) | `mention_appeared_in_capture_id_fkey` | `FOREIGN KEY (appeared_in_capture_id) REFERENCES evidence.source_capture(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `source_capture_pkey` | `CREATE UNIQUE INDEX source_capture_pkey ON evidence.source_capture USING btree (id)` |
| `source_capture_sha_idx` | `CREATE INDEX source_capture_sha_idx ON evidence.source_capture USING btree (content_sha256)` |
| `source_capture_source_idx` | `CREATE INDEX source_capture_source_idx ON evidence.source_capture USING btree (source_id, captured_at DESC)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

---
schema: evidence
relation: source_query
qualified_name: evidence.source_query
kind: table
---

# evidence.source_query

Operational source intelligence: exact query, provider parameters, raw response artifact, and intended work-item purpose.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["source_query"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence source_query evidence.source_query id tenant_id mission_id work_item_id attempt_id provider query_text purpose request_parameters response_artifact_id query_sha256 queried_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `mission_id` | `uuid` | no | — | — |
| 4 | `work_item_id` | `uuid` | no | — | — |
| 5 | `attempt_id` | `uuid` | no | — | — |
| 6 | `provider` | `text` | no | — | — |
| 7 | `query_text` | `text` | no | — | — |
| 8 | `purpose` | `text` | no | — | — |
| 9 | `request_parameters` | `jsonb` | no | `'{}'::jsonb` | — |
| 10 | `response_artifact_id` | `uuid` | yes | — | — |
| 11 | `query_sha256` | `text` | no | — | — |
| 12 | `queried_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `source_query_nonempty` | `check` | `CHECK (btrim(provider) <> ''::text AND btrim(query_text) <> ''::text AND btrim(purpose) <> ''::text)` | — |
| `source_query_query_sha256_check` | `check` | `CHECK (query_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `source_query_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (attempt_id) REFERENCES orchestration.attempt(id) ON DELETE CASCADE` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `source_query_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `source_query_response_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (response_artifact_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `source_query_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `source_query_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `source_query_attempt_id_provider_query_sha256_key` | `unique` | `UNIQUE (attempt_id, provider, query_sha256)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `source_query_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (attempt_id) REFERENCES orchestration.attempt(id) ON DELETE CASCADE` |
| `source_query_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| `source_query_response_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (response_artifact_id) REFERENCES orchestration.artifact(id)` |
| `source_query_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.source_retrieval`](../../evidence/tables/source_retrieval.md) | `source_retrieval_query_id_fkey` | `FOREIGN KEY (query_id) REFERENCES evidence.source_query(id) ON DELETE SET NULL` |

## Indexes

| Name | Definition |
| --- | --- |
| `source_query_attempt_id_provider_query_sha256_key` | `CREATE UNIQUE INDEX source_query_attempt_id_provider_query_sha256_key ON evidence.source_query USING btree (attempt_id, provider, query_sha256)` |
| `source_query_mission_idx` | `CREATE INDEX source_query_mission_idx ON evidence.source_query USING btree (mission_id, queried_at DESC)` |
| `source_query_pkey` | `CREATE UNIQUE INDEX source_query_pkey ON evidence.source_query USING btree (id)` |
| `source_query_response_artifact_idx` | `CREATE INDEX source_query_response_artifact_idx ON evidence.source_query USING btree (response_artifact_id) WHERE (response_artifact_id IS NOT NULL)` |
| `source_query_work_item_idx` | `CREATE INDEX source_query_work_item_idx ON evidence.source_query USING btree (work_item_id, queried_at DESC)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `source_query_immutable` | `util.reject_mutation` | `CREATE TRIGGER source_query_immutable BEFORE DELETE OR UPDATE ON evidence.source_query FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

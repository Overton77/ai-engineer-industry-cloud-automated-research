---
schema: evidence
relation: source_retrieval
qualified_name: evidence.source_retrieval
kind: table
---

# evidence.source_retrieval

A query result or direct fetch, including cache outcome and the immutable capture when bytes were obtained.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["source_retrieval"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence source_retrieval evidence.source_retrieval id tenant_id query_id source_id capture_id work_item_id attempt_id requested_url provider_result_id result_rank retrieval_status provider_metadata retrieved_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `query_id` | `uuid` | yes | — | — |
| 4 | `source_id` | `uuid` | no | — | — |
| 5 | `capture_id` | `uuid` | yes | — | — |
| 6 | `work_item_id` | `uuid` | no | — | — |
| 7 | `attempt_id` | `uuid` | no | — | — |
| 8 | `requested_url` | `text` | no | — | — |
| 9 | `provider_result_id` | `text` | yes | — | — |
| 10 | `result_rank` | `integer` | yes | — | — |
| 11 | `retrieval_status` | `text` | no | — | — |
| 12 | `provider_metadata` | `jsonb` | no | `'{}'::jsonb` | — |
| 13 | `retrieved_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `source_retrieval_capture_consistent` | `check` | `CHECK ((retrieval_status = ANY (ARRAY['cache_hit'::text, 'captured'::text])) AND capture_id IS NOT NULL OR (retrieval_status <> ALL (ARRAY['cache_hit'::text, 'captured'::text])))` | — |
| `source_retrieval_result_rank_check` | `check` | `CHECK (result_rank IS NULL OR result_rank > 0)` | — |
| `source_retrieval_retrieval_status_check` | `check` | `CHECK (retrieval_status = ANY (ARRAY['discovered'::text, 'cache_hit'::text, 'captured'::text, 'failed'::text, 'skipped'::text]))` | — |
| `source_retrieval_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (attempt_id) REFERENCES orchestration.attempt(id) ON DELETE CASCADE` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `source_retrieval_capture_id_fkey` | `foreign_key` | `FOREIGN KEY (capture_id) REFERENCES evidence.source_capture(id)` | [`evidence.source_capture`](../../evidence/tables/source_capture.md) |
| `source_retrieval_query_id_fkey` | `foreign_key` | `FOREIGN KEY (query_id) REFERENCES evidence.source_query(id) ON DELETE SET NULL` | [`evidence.source_query`](../../evidence/tables/source_query.md) |
| `source_retrieval_source_id_fkey` | `foreign_key` | `FOREIGN KEY (source_id) REFERENCES evidence.source(id)` | [`evidence.source`](../../evidence/tables/source.md) |
| `source_retrieval_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `source_retrieval_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `source_retrieval_attempt_id_query_id_capture_id_key` | `unique` | `UNIQUE NULLS NOT DISTINCT (attempt_id, query_id, capture_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `source_retrieval_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (attempt_id) REFERENCES orchestration.attempt(id) ON DELETE CASCADE` |
| `source_retrieval_capture_id_fkey` | [`evidence.source_capture`](../../evidence/tables/source_capture.md) | `FOREIGN KEY (capture_id) REFERENCES evidence.source_capture(id)` |
| `source_retrieval_query_id_fkey` | [`evidence.source_query`](../../evidence/tables/source_query.md) | `FOREIGN KEY (query_id) REFERENCES evidence.source_query(id) ON DELETE SET NULL` |
| `source_retrieval_source_id_fkey` | [`evidence.source`](../../evidence/tables/source.md) | `FOREIGN KEY (source_id) REFERENCES evidence.source(id)` |
| `source_retrieval_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.source_support`](../../evidence/tables/source_support.md) | `source_support_retrieval_id_fkey` | `FOREIGN KEY (retrieval_id) REFERENCES evidence.source_retrieval(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `source_retrieval_attempt_id_query_id_capture_id_key` | `CREATE UNIQUE INDEX source_retrieval_attempt_id_query_id_capture_id_key ON evidence.source_retrieval USING btree (attempt_id, query_id, capture_id) NULLS NOT DISTINCT` |
| `source_retrieval_capture_idx` | `CREATE INDEX source_retrieval_capture_idx ON evidence.source_retrieval USING btree (capture_id) WHERE (capture_id IS NOT NULL)` |
| `source_retrieval_pkey` | `CREATE UNIQUE INDEX source_retrieval_pkey ON evidence.source_retrieval USING btree (id)` |
| `source_retrieval_query_idx` | `CREATE INDEX source_retrieval_query_idx ON evidence.source_retrieval USING btree (query_id, result_rank, retrieved_at)` |
| `source_retrieval_source_idx` | `CREATE INDEX source_retrieval_source_idx ON evidence.source_retrieval USING btree (source_id, retrieved_at DESC)` |
| `source_retrieval_work_item_idx` | `CREATE INDEX source_retrieval_work_item_idx ON evidence.source_retrieval USING btree (work_item_id, retrieved_at DESC)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `source_retrieval_immutable` | `util.reject_mutation` | `CREATE TRIGGER source_retrieval_immutable BEFORE DELETE OR UPDATE ON evidence.source_retrieval FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

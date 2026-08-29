---
schema: orchestration
relation: work_item
qualified_name: orchestration.work_item
kind: table
---

# orchestration.work_item

Database table orchestration.work_item.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["work_item"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration work_item orchestration.work_item id tenant_id mission_id kind spec status capability_profile_id budget_cost_usd budget_wall_seconds max_attempts attempt_count terminal_evidence created_at updated_at idempotency_key lease_owner lease_expires_at heartbeat_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `mission_id` | `uuid` | no | — | — |
| 4 | `kind` | `text` | no | — | — |
| 5 | `spec` | `jsonb` | no | `'{}'::jsonb` | — |
| 6 | `status` | `orchestration.work_item_status` | no | `'pending'::orchestration.work_item_status` | — |
| 7 | `capability_profile_id` | `uuid` | yes | — | — |
| 8 | `budget_cost_usd` | `numeric(12,4)` | yes | — | — |
| 9 | `budget_wall_seconds` | `integer` | yes | — | — |
| 10 | `max_attempts` | `integer` | no | `3` | — |
| 11 | `attempt_count` | `integer` | no | `0` | — |
| 12 | `terminal_evidence` | `jsonb` | yes | — | — |
| 13 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 14 | `updated_at` | `timestamp with time zone` | no | `now()` | — |
| 15 | `idempotency_key` | `text` | yes | — | — |
| 16 | `lease_owner` | `text` | yes | — | — |
| 17 | `lease_expires_at` | `timestamp with time zone` | yes | — | — |
| 18 | `heartbeat_at` | `timestamp with time zone` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `work_item_attempts_sane` | `check` | `CHECK (attempt_count >= 0 AND max_attempts > 0)` | — |
| `work_item_lease_consistent` | `check` | `CHECK (status = 'running'::orchestration.work_item_status AND lease_owner IS NOT NULL AND lease_expires_at IS NOT NULL OR status <> 'running'::orchestration.work_item_status AND lease_owner IS NULL AND lease_expires_at IS NULL)` | — |
| `work_item_capability_profile_fk` | `foreign_key` | `FOREIGN KEY (capability_profile_id) REFERENCES orchestration.capability_profile(id)` | [`orchestration.capability_profile`](../../orchestration/tables/capability_profile.md) |
| `work_item_kind_fkey` | `foreign_key` | `FOREIGN KEY (kind) REFERENCES orchestration.work_item_kind(code)` | [`orchestration.work_item_kind`](../../orchestration/tables/work_item_kind.md) |
| `work_item_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `work_item_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `work_item_capability_profile_fk` | [`orchestration.capability_profile`](../../orchestration/tables/capability_profile.md) | `FOREIGN KEY (capability_profile_id) REFERENCES orchestration.capability_profile(id)` |
| `work_item_kind_fkey` | [`orchestration.work_item_kind`](../../orchestration/tables/work_item_kind.md) | `FOREIGN KEY (kind) REFERENCES orchestration.work_item_kind(code)` |
| `work_item_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.revalidation_event`](../../evidence/tables/revalidation_event.md) | `revalidation_event_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id)` |
| [`evidence.source_query`](../../evidence/tables/source_query.md) | `source_query_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |
| [`evidence.source_retrieval`](../../evidence/tables/source_retrieval.md) | `source_retrieval_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |
| [`evidence.source_support`](../../evidence/tables/source_support.md) | `source_support_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |
| [`evidence.verification_run`](../../evidence/tables/verification_run.md) | `verification_run_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id)` |
| [`orchestration.artifact_manifest`](../../orchestration/tables/artifact_manifest.md) | `artifact_manifest_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |
| [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `attempt_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |
| [`orchestration.work_item_artifact`](../../orchestration/tables/work_item_artifact.md) | `work_item_artifact_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |
| [`orchestration.work_item_dependency`](../../orchestration/tables/work_item_dependency.md) | `work_item_dependency_depends_on_id_fkey` | `FOREIGN KEY (depends_on_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |
| [`orchestration.work_item_dependency`](../../orchestration/tables/work_item_dependency.md) | `work_item_dependency_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |
| [`orchestration.work_item_event`](../../orchestration/tables/work_item_event.md) | `work_item_event_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |
| [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) | `ranking_run_work_item_id_fkey` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id)` |
| [`research.downstream_handoff`](../../research/tables/downstream_handoff.md) | `downstream_handoff_consumed_by_work_item_id_fkey` | `FOREIGN KEY (consumed_by_work_item_id) REFERENCES orchestration.work_item(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `work_item_idempotency_uq` | `CREATE UNIQUE INDEX work_item_idempotency_uq ON orchestration.work_item USING btree (tenant_id, idempotency_key) WHERE (idempotency_key IS NOT NULL)` |
| `work_item_lease_idx` | `CREATE INDEX work_item_lease_idx ON orchestration.work_item USING btree (status, lease_expires_at, created_at) WHERE (status = ANY (ARRAY['pending'::orchestration.work_item_status, 'ready'::orchestration.work_item_status, 'running'::orchestration.work_item_status]))` |
| `work_item_mission_idx` | `CREATE INDEX work_item_mission_idx ON orchestration.work_item USING btree (mission_id, status)` |
| `work_item_pkey` | `CREATE UNIQUE INDEX work_item_pkey ON orchestration.work_item USING btree (id)` |
| `work_item_ready_idx` | `CREATE INDEX work_item_ready_idx ON orchestration.work_item USING btree (status, created_at) WHERE (status = ANY (ARRAY['pending'::orchestration.work_item_status, 'ready'::orchestration.work_item_status]))` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `work_item_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER work_item_set_updated_at BEFORE UPDATE ON orchestration.work_item FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

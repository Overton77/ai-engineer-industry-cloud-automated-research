---
schema: orchestration
relation: mission
qualified_name: orchestration.mission
kind: table
---

# orchestration.mission

Database table orchestration.mission.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["mission"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration mission orchestration.mission id tenant_id slug goal research_questions acceptance_criteria selection_id capability_profile_id budget_cost_usd budget_wall_seconds budget_max_fanout budget_max_depth budget_max_retries status terminal_reason started_at ended_at created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | yes | — | — |
| 4 | `goal` | `text` | no | — | — |
| 5 | `research_questions` | `jsonb` | no | `'[]'::jsonb` | — |
| 6 | `acceptance_criteria` | `jsonb` | no | `'[]'::jsonb` | — |
| 7 | `selection_id` | `uuid` | yes | — | — |
| 8 | `capability_profile_id` | `uuid` | yes | — | — |
| 9 | `budget_cost_usd` | `numeric(12,4)` | yes | — | — |
| 10 | `budget_wall_seconds` | `integer` | yes | — | — |
| 11 | `budget_max_fanout` | `integer` | yes | — | — |
| 12 | `budget_max_depth` | `integer` | yes | — | — |
| 13 | `budget_max_retries` | `integer` | yes | — | — |
| 14 | `status` | `orchestration.mission_status` | no | `'created'::orchestration.mission_status` | — |
| 15 | `terminal_reason` | `text` | yes | — | — |
| 16 | `started_at` | `timestamp with time zone` | yes | — | — |
| 17 | `ended_at` | `timestamp with time zone` | yes | — | — |
| 18 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 19 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `mission_terminal_has_end` | `check` | `CHECK ((status = ANY (ARRAY['succeeded'::orchestration.mission_status, 'failed'::orchestration.mission_status, 'cancelled'::orchestration.mission_status, 'superseded'::orchestration.mission_status])) = (ended_at IS NOT NULL))` | — |
| `mission_capability_profile_fk` | `foreign_key` | `FOREIGN KEY (capability_profile_id) REFERENCES orchestration.capability_profile(id)` | [`orchestration.capability_profile`](../../orchestration/tables/capability_profile.md) |
| `mission_selection_fk` | `foreign_key` | `FOREIGN KEY (selection_id) REFERENCES ranking.selection(id)` | [`ranking.selection`](../../ranking/tables/selection.md) |
| `mission_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `mission_slug_uq` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `mission_capability_profile_fk` | [`orchestration.capability_profile`](../../orchestration/tables/capability_profile.md) | `FOREIGN KEY (capability_profile_id) REFERENCES orchestration.capability_profile(id)` |
| `mission_selection_fk` | [`ranking.selection`](../../ranking/tables/selection.md) | `FOREIGN KEY (selection_id) REFERENCES ranking.selection(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.agent_session`](../../orchestration/tables/agent_session.md) | `agent_session_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` |
| [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `artifact_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` |
| [`orchestration.artifact_manifest`](../../orchestration/tables/artifact_manifest.md) | `artifact_manifest_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| [`orchestration.continuation_checkpoint`](../../orchestration/tables/continuation_checkpoint.md) | `continuation_checkpoint_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| [`orchestration.mission_event`](../../orchestration/tables/mission_event.md) | `mission_event_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| [`orchestration.operation_intent`](../../orchestration/tables/operation_intent.md) | `operation_intent_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` |
| [`orchestration.outbox_event`](../../orchestration/tables/outbox_event.md) | `outbox_event_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `work_item_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| [`research.comparison`](../../research/tables/comparison.md) | `comparison_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| [`research.downstream_handoff`](../../research/tables/downstream_handoff.md) | `downstream_handoff_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| [`research.finding`](../../research/tables/finding.md) | `finding_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| [`research.report`](../../research/tables/report.md) | `report_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` |
| [`research.research_bundle`](../../research/tables/research_bundle.md) | `research_bundle_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| [`staging.candidate`](../../staging/tables/candidate.md) | `candidate_mission_id_fkey` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` |

## Indexes

| Name | Definition |
| --- | --- |
| `mission_pkey` | `CREATE UNIQUE INDEX mission_pkey ON orchestration.mission USING btree (id)` |
| `mission_slug_uq` | `CREATE UNIQUE INDEX mission_slug_uq ON orchestration.mission USING btree (tenant_id, slug)` |
| `mission_status_idx` | `CREATE INDEX mission_status_idx ON orchestration.mission USING btree (status, created_at DESC)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

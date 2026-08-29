---
schema: ranking
relation: ranking_run
qualified_name: ranking.ranking_run
kind: table
---

# ranking.ranking_run

Database table ranking.ranking_run.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["ranking_run"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking ranking_run ranking.ranking_run id policy_version_id snapshot_id feature_set_hash code_ref work_item_id executed_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `policy_version_id` | `uuid` | no | — | — |
| 3 | `snapshot_id` | `uuid` | yes | — | — |
| 4 | `feature_set_hash` | `text` | yes | — | — |
| 5 | `code_ref` | `text` | yes | — | — |
| 6 | `work_item_id` | `uuid` | yes | — | — |
| 7 | `executed_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ranking_run_policy_version_id_fkey` | `foreign_key` | `FOREIGN KEY (policy_version_id) REFERENCES ranking.ranking_policy_version(id)` | [`ranking.ranking_policy_version`](../../ranking/tables/ranking_policy_version.md) |
| `ranking_run_snapshot_id_fkey` | `foreign_key` | `FOREIGN KEY (snapshot_id) REFERENCES ranking.membership_snapshot(id)` | [`ranking.membership_snapshot`](../../ranking/tables/membership_snapshot.md) |
| `ranking_run_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id)` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `ranking_run_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `ranking_run_policy_version_id_fkey` | [`ranking.ranking_policy_version`](../../ranking/tables/ranking_policy_version.md) | `FOREIGN KEY (policy_version_id) REFERENCES ranking.ranking_policy_version(id)` |
| `ranking_run_snapshot_id_fkey` | [`ranking.membership_snapshot`](../../ranking/tables/membership_snapshot.md) | `FOREIGN KEY (snapshot_id) REFERENCES ranking.membership_snapshot(id)` |
| `ranking_run_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`ranking.leaderboard_edition`](../../ranking/tables/leaderboard_edition.md) | `leaderboard_edition_ranking_run_id_fkey` | `FOREIGN KEY (ranking_run_id) REFERENCES ranking.ranking_run(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_run_fk` | `FOREIGN KEY (run_id) REFERENCES ranking.ranking_run(id)` |
| [`ranking.ranking_result`](../../ranking/tables/ranking_result.md) | `ranking_result_run_id_fkey` | `FOREIGN KEY (run_id) REFERENCES ranking.ranking_run(id) ON DELETE CASCADE` |
| [`ranking.selection`](../../ranking/tables/selection.md) | `selection_run_id_fkey` | `FOREIGN KEY (run_id) REFERENCES ranking.ranking_run(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `ranking_run_pkey` | `CREATE UNIQUE INDEX ranking_run_pkey ON ranking.ranking_run USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

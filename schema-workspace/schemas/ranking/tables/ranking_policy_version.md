---
schema: ranking
relation: ranking_policy_version
qualified_name: ranking.ranking_policy_version
kind: table
---

# ranking.ranking_policy_version

Database table ranking.ranking_policy_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["ranking_policy_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking ranking_policy_version ranking.ranking_policy_version id ranking_policy_id version weights penalties approval_state created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `ranking_policy_id` | `uuid` | no | — | — |
| 3 | `version` | `integer` | no | — | — |
| 4 | `weights` | `jsonb` | no | `'{}'::jsonb` | — |
| 5 | `penalties` | `jsonb` | no | `'{}'::jsonb` | — |
| 6 | `approval_state` | `ranking.approval_state` | no | `'draft'::ranking.approval_state` | — |
| 7 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ranking_policy_version_ranking_policy_id_fkey` | `foreign_key` | `FOREIGN KEY (ranking_policy_id) REFERENCES ranking.ranking_policy(id) ON DELETE CASCADE` | [`ranking.ranking_policy`](../../ranking/tables/ranking_policy.md) |
| `ranking_policy_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `ranking_policy_version_ranking_policy_id_version_key` | `unique` | `UNIQUE (ranking_policy_id, version)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `ranking_policy_version_ranking_policy_id_fkey` | [`ranking.ranking_policy`](../../ranking/tables/ranking_policy.md) | `FOREIGN KEY (ranking_policy_id) REFERENCES ranking.ranking_policy(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`ranking.leaderboard`](../../ranking/tables/leaderboard.md) | `leaderboard_policy_version_id_fkey` | `FOREIGN KEY (policy_version_id) REFERENCES ranking.ranking_policy_version(id)` |
| [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) | `ranking_run_policy_version_id_fkey` | `FOREIGN KEY (policy_version_id) REFERENCES ranking.ranking_policy_version(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `ranking_policy_version_pkey` | `CREATE UNIQUE INDEX ranking_policy_version_pkey ON ranking.ranking_policy_version USING btree (id)` |
| `ranking_policy_version_ranking_policy_id_version_key` | `CREATE UNIQUE INDEX ranking_policy_version_ranking_policy_id_version_key ON ranking.ranking_policy_version USING btree (ranking_policy_id, version)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

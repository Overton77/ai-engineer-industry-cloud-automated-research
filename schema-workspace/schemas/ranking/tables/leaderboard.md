---
schema: ranking
relation: leaderboard
qualified_name: ranking.leaderboard
kind: table
---

# ranking.leaderboard

Database table ranking.leaderboard.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["leaderboard"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking leaderboard ranking.leaderboard id tenant_id slug group_version_id policy_version_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `group_version_id` | `uuid` | no | — | — |
| 5 | `policy_version_id` | `uuid` | no | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `leaderboard_group_version_id_fkey` | `foreign_key` | `FOREIGN KEY (group_version_id) REFERENCES ranking.entity_group_version(id)` | [`ranking.entity_group_version`](../../ranking/tables/entity_group_version.md) |
| `leaderboard_policy_version_id_fkey` | `foreign_key` | `FOREIGN KEY (policy_version_id) REFERENCES ranking.ranking_policy_version(id)` | [`ranking.ranking_policy_version`](../../ranking/tables/ranking_policy_version.md) |
| `leaderboard_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `leaderboard_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `leaderboard_group_version_id_fkey` | [`ranking.entity_group_version`](../../ranking/tables/entity_group_version.md) | `FOREIGN KEY (group_version_id) REFERENCES ranking.entity_group_version(id)` |
| `leaderboard_policy_version_id_fkey` | [`ranking.ranking_policy_version`](../../ranking/tables/ranking_policy_version.md) | `FOREIGN KEY (policy_version_id) REFERENCES ranking.ranking_policy_version(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`ranking.leaderboard_edition`](../../ranking/tables/leaderboard_edition.md) | `leaderboard_edition_leaderboard_id_fkey` | `FOREIGN KEY (leaderboard_id) REFERENCES ranking.leaderboard(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `leaderboard_pkey` | `CREATE UNIQUE INDEX leaderboard_pkey ON ranking.leaderboard USING btree (id)` |
| `leaderboard_tenant_id_slug_key` | `CREATE UNIQUE INDEX leaderboard_tenant_id_slug_key ON ranking.leaderboard USING btree (tenant_id, slug)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

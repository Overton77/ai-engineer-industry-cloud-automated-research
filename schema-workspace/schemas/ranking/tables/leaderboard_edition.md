---
schema: ranking
relation: leaderboard_edition
qualified_name: ranking.leaderboard_edition
kind: table
---

# ranking.leaderboard_edition

Database table ranking.leaderboard_edition.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["leaderboard_edition"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking leaderboard_edition ranking.leaderboard_edition id leaderboard_id ranking_run_id edition_no published_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `leaderboard_id` | `uuid` | no | — | — |
| 3 | `ranking_run_id` | `uuid` | no | — | — |
| 4 | `edition_no` | `integer` | no | — | — |
| 5 | `published_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `leaderboard_edition_leaderboard_id_fkey` | `foreign_key` | `FOREIGN KEY (leaderboard_id) REFERENCES ranking.leaderboard(id) ON DELETE CASCADE` | [`ranking.leaderboard`](../../ranking/tables/leaderboard.md) |
| `leaderboard_edition_ranking_run_id_fkey` | `foreign_key` | `FOREIGN KEY (ranking_run_id) REFERENCES ranking.ranking_run(id)` | [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) |
| `leaderboard_edition_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `leaderboard_edition_leaderboard_id_edition_no_key` | `unique` | `UNIQUE (leaderboard_id, edition_no)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `leaderboard_edition_leaderboard_id_fkey` | [`ranking.leaderboard`](../../ranking/tables/leaderboard.md) | `FOREIGN KEY (leaderboard_id) REFERENCES ranking.leaderboard(id) ON DELETE CASCADE` |
| `leaderboard_edition_ranking_run_id_fkey` | [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) | `FOREIGN KEY (ranking_run_id) REFERENCES ranking.ranking_run(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `leaderboard_edition_leaderboard_id_edition_no_key` | `CREATE UNIQUE INDEX leaderboard_edition_leaderboard_id_edition_no_key ON ranking.leaderboard_edition USING btree (leaderboard_id, edition_no)` |
| `leaderboard_edition_pkey` | `CREATE UNIQUE INDEX leaderboard_edition_pkey ON ranking.leaderboard_edition USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

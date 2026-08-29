---
schema: ranking
relation: ranking_result
qualified_name: ranking.ranking_result
kind: table
---

# ranking.ranking_result

Database table ranking.ranking_result.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["ranking_result"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking ranking_result ranking.ranking_result id run_id entity_kind entity_id rank score contributions penalties uncertainty explanation`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `run_id` | `uuid` | no | — | — |
| 3 | `entity_kind` | `text` | no | — | — |
| 4 | `entity_id` | `uuid` | no | — | — |
| 5 | `rank` | `integer` | no | — | — |
| 6 | `score` | `numeric` | no | — | — |
| 7 | `contributions` | `jsonb` | no | `'{}'::jsonb` | — |
| 8 | `penalties` | `jsonb` | no | `'{}'::jsonb` | — |
| 9 | `uncertainty` | `numeric` | yes | — | — |
| 10 | `explanation` | `text` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ranking_result_run_id_fkey` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES ranking.ranking_run(id) ON DELETE CASCADE` | [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) |
| `ranking_result_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `ranking_result_run_id_entity_kind_entity_id_key` | `unique` | `UNIQUE (run_id, entity_kind, entity_id)` | — |
| `ranking_result_run_id_rank_key` | `unique` | `UNIQUE (run_id, rank)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `ranking_result_run_id_fkey` | [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) | `FOREIGN KEY (run_id) REFERENCES ranking.ranking_run(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `ranking_result_entity_idx` | `CREATE INDEX ranking_result_entity_idx ON ranking.ranking_result USING btree (entity_kind, entity_id)` |
| `ranking_result_pkey` | `CREATE UNIQUE INDEX ranking_result_pkey ON ranking.ranking_result USING btree (id)` |
| `ranking_result_run_id_entity_kind_entity_id_key` | `CREATE UNIQUE INDEX ranking_result_run_id_entity_kind_entity_id_key ON ranking.ranking_result USING btree (run_id, entity_kind, entity_id)` |
| `ranking_result_run_id_rank_key` | `CREATE UNIQUE INDEX ranking_result_run_id_rank_key ON ranking.ranking_result USING btree (run_id, rank)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: ranking
relation: metric_definition_version
qualified_name: ranking.metric_definition_version
kind: table
---

# ranking.metric_definition_version

Database table ranking.metric_definition_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["metric_definition_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking metric_definition_version ranking.metric_definition_version id metric_definition_id version semantics unit source_field acquisition locator_method cadence missingness_policy gaming_risk decay_policy permitted_ranking_purposes approval_state created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `metric_definition_id` | `uuid` | no | — | — |
| 3 | `version` | `integer` | no | — | — |
| 4 | `semantics` | `text` | no | — | — |
| 5 | `unit` | `text` | yes | — | — |
| 6 | `source_field` | `text` | yes | — | — |
| 7 | `acquisition` | `text` | yes | — | — |
| 8 | `locator_method` | `text` | yes | — | — |
| 9 | `cadence` | `interval` | yes | — | — |
| 10 | `missingness_policy` | `text` | yes | — | — |
| 11 | `gaming_risk` | `text` | yes | — | — |
| 12 | `decay_policy` | `jsonb` | no | `'{}'::jsonb` | — |
| 13 | `permitted_ranking_purposes` | `text[]` | no | `'{}'::text[]` | — |
| 14 | `approval_state` | `ranking.approval_state` | no | `'draft'::ranking.approval_state` | — |
| 15 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `metric_definition_version_metric_definition_id_fkey` | `foreign_key` | `FOREIGN KEY (metric_definition_id) REFERENCES ranking.metric_definition(id) ON DELETE CASCADE` | [`ranking.metric_definition`](../../ranking/tables/metric_definition.md) |
| `metric_definition_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `metric_definition_version_metric_definition_id_version_key` | `unique` | `UNIQUE (metric_definition_id, version)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `metric_definition_version_metric_definition_id_fkey` | [`ranking.metric_definition`](../../ranking/tables/metric_definition.md) | `FOREIGN KEY (metric_definition_id) REFERENCES ranking.metric_definition(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_definition_version_id_fkey` | `FOREIGN KEY (definition_version_id) REFERENCES ranking.metric_definition_version(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `metric_definition_one_approved` | `CREATE UNIQUE INDEX metric_definition_one_approved ON ranking.metric_definition_version USING btree (metric_definition_id) WHERE (approval_state = 'approved'::ranking.approval_state)` |
| `metric_definition_version_metric_definition_id_version_key` | `CREATE UNIQUE INDEX metric_definition_version_metric_definition_id_version_key ON ranking.metric_definition_version USING btree (metric_definition_id, version)` |
| `metric_definition_version_pkey` | `CREATE UNIQUE INDEX metric_definition_version_pkey ON ranking.metric_definition_version USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

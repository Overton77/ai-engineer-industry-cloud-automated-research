---
schema: ranking
relation: feature_value
qualified_name: ranking.feature_value
kind: table
---

# ranking.feature_value

Database table ranking.feature_value.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["feature_value"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking feature_value ranking.feature_value id feature_definition_id entity_kind entity_id value_numeric value_jsonb input_lineage computed_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `feature_definition_id` | `uuid` | no | — | — |
| 3 | `entity_kind` | `text` | no | — | — |
| 4 | `entity_id` | `uuid` | no | — | — |
| 5 | `value_numeric` | `numeric` | yes | — | — |
| 6 | `value_jsonb` | `jsonb` | yes | — | — |
| 7 | `input_lineage` | `jsonb` | no | `'[]'::jsonb` | — |
| 8 | `computed_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `feature_value_feature_definition_id_fkey` | `foreign_key` | `FOREIGN KEY (feature_definition_id) REFERENCES ranking.feature_definition(id)` | [`ranking.feature_definition`](../../ranking/tables/feature_definition.md) |
| `feature_value_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `feature_value_feature_definition_id_entity_kind_entity_id_c_key` | `unique` | `UNIQUE (feature_definition_id, entity_kind, entity_id, computed_at)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `feature_value_feature_definition_id_fkey` | [`ranking.feature_definition`](../../ranking/tables/feature_definition.md) | `FOREIGN KEY (feature_definition_id) REFERENCES ranking.feature_definition(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `feature_value_entity_idx` | `CREATE INDEX feature_value_entity_idx ON ranking.feature_value USING btree (entity_kind, entity_id)` |
| `feature_value_feature_definition_id_entity_kind_entity_id_c_key` | `CREATE UNIQUE INDEX feature_value_feature_definition_id_entity_kind_entity_id_c_key ON ranking.feature_value USING btree (feature_definition_id, entity_kind, entity_id, computed_at)` |
| `feature_value_pkey` | `CREATE UNIQUE INDEX feature_value_pkey ON ranking.feature_value USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: taxonomy
relation: entity_kind
qualified_name: taxonomy.entity_kind
kind: table
---

# taxonomy.entity_kind

Primary canonical AI knowledge entity divisions and their typed corpus tables.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["taxonomy"]["Tables"]["entity_kind"]["Row"]`
- Row-level security: enabled
- Search tokens: `taxonomy entity_kind taxonomy.entity_kind code label canonical_schema canonical_table description`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `code` | `text` | no | — | — |
| 2 | `label` | `text` | no | — | — |
| 3 | `canonical_schema` | `text` | no | `'corpus'::text` | — |
| 4 | `canonical_table` | `text` | no | — | — |
| 5 | `description` | `text` | no | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `entity_kind_pkey` | `primary_key` | `PRIMARY KEY (code)` | — |
| `entity_kind_canonical_schema_canonical_table_key` | `unique` | `UNIQUE (canonical_schema, canonical_table)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`taxonomy.term_target_kind`](../../taxonomy/tables/term_target_kind.md) | `term_target_kind_entity_kind_code_fkey` | `FOREIGN KEY (entity_kind_code) REFERENCES taxonomy.entity_kind(code) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `entity_kind_canonical_schema_canonical_table_key` | `CREATE UNIQUE INDEX entity_kind_canonical_schema_canonical_table_key ON taxonomy.entity_kind USING btree (canonical_schema, canonical_table)` |
| `entity_kind_pkey` | `CREATE UNIQUE INDEX entity_kind_pkey ON taxonomy.entity_kind USING btree (code)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

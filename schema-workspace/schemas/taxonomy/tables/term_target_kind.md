---
schema: taxonomy
relation: term_target_kind
qualified_name: taxonomy.term_target_kind
kind: table
---

# taxonomy.term_target_kind

Restricts secondary taxonomy terms to compatible primary entity kinds.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["taxonomy"]["Tables"]["term_target_kind"]["Row"]`
- Row-level security: enabled
- Search tokens: `taxonomy term_target_kind taxonomy.term_target_kind term_id entity_kind_code created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `term_id` | `uuid` | no | — | — |
| 2 | `entity_kind_code` | `text` | no | — | — |
| 3 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `term_target_kind_entity_kind_code_fkey` | `foreign_key` | `FOREIGN KEY (entity_kind_code) REFERENCES taxonomy.entity_kind(code) ON DELETE CASCADE` | [`taxonomy.entity_kind`](../../taxonomy/tables/entity_kind.md) |
| `term_target_kind_term_id_fkey` | `foreign_key` | `FOREIGN KEY (term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` | [`taxonomy.term`](../../taxonomy/tables/term.md) |
| `term_target_kind_pkey` | `primary_key` | `PRIMARY KEY (term_id, entity_kind_code)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `term_target_kind_entity_kind_code_fkey` | [`taxonomy.entity_kind`](../../taxonomy/tables/entity_kind.md) | `FOREIGN KEY (entity_kind_code) REFERENCES taxonomy.entity_kind(code) ON DELETE CASCADE` |
| `term_target_kind_term_id_fkey` | [`taxonomy.term`](../../taxonomy/tables/term.md) | `FOREIGN KEY (term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `term_target_kind_pkey` | `CREATE UNIQUE INDEX term_target_kind_pkey ON taxonomy.term_target_kind USING btree (term_id, entity_kind_code)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

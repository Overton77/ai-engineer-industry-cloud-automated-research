---
schema: taxonomy
relation: term_relation
qualified_name: taxonomy.term_relation
kind: table
---

# taxonomy.term_relation

Database table taxonomy.term_relation.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["taxonomy"]["Tables"]["term_relation"]["Row"]`
- Row-level security: enabled
- Search tokens: `taxonomy term_relation taxonomy.term_relation from_term_id to_term_id relation_kind created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `from_term_id` | `uuid` | no | — | — |
| 2 | `to_term_id` | `uuid` | no | — | — |
| 3 | `relation_kind` | `text` | no | — | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `term_relation_no_self` | `check` | `CHECK (from_term_id <> to_term_id)` | — |
| `term_relation_relation_kind_check` | `check` | `CHECK (relation_kind = ANY (ARRAY['broader'::text, 'narrower'::text, 'related'::text, 'replaced_by'::text]))` | — |
| `term_relation_from_term_id_fkey` | `foreign_key` | `FOREIGN KEY (from_term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` | [`taxonomy.term`](../../taxonomy/tables/term.md) |
| `term_relation_to_term_id_fkey` | `foreign_key` | `FOREIGN KEY (to_term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` | [`taxonomy.term`](../../taxonomy/tables/term.md) |
| `term_relation_pkey` | `primary_key` | `PRIMARY KEY (from_term_id, to_term_id, relation_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `term_relation_from_term_id_fkey` | [`taxonomy.term`](../../taxonomy/tables/term.md) | `FOREIGN KEY (from_term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` |
| `term_relation_to_term_id_fkey` | [`taxonomy.term`](../../taxonomy/tables/term.md) | `FOREIGN KEY (to_term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `term_relation_pkey` | `CREATE UNIQUE INDEX term_relation_pkey ON taxonomy.term_relation USING btree (from_term_id, to_term_id, relation_kind)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

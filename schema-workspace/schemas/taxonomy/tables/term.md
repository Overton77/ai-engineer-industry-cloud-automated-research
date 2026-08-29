---
schema: taxonomy
relation: term
qualified_name: taxonomy.term
kind: table
---

# taxonomy.term

Database table taxonomy.term.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["taxonomy"]["Tables"]["term"]["Row"]`
- Row-level security: enabled
- Search tokens: `taxonomy term taxonomy.term id facet_version_id slug label definition parent_term_id sort_order created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `facet_version_id` | `uuid` | no | — | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `label` | `text` | no | — | — |
| 5 | `definition` | `text` | yes | — | — |
| 6 | `parent_term_id` | `uuid` | yes | — | — |
| 7 | `sort_order` | `integer` | no | `0` | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `term_facet_version_id_fkey` | `foreign_key` | `FOREIGN KEY (facet_version_id) REFERENCES taxonomy.facet_version(id) ON DELETE CASCADE` | [`taxonomy.facet_version`](../../taxonomy/tables/facet_version.md) |
| `term_parent_term_id_fkey` | `foreign_key` | `FOREIGN KEY (parent_term_id) REFERENCES taxonomy.term(id)` | [`taxonomy.term`](../../taxonomy/tables/term.md) |
| `term_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `term_facet_version_id_slug_key` | `unique` | `UNIQUE (facet_version_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `term_facet_version_id_fkey` | [`taxonomy.facet_version`](../../taxonomy/tables/facet_version.md) | `FOREIGN KEY (facet_version_id) REFERENCES taxonomy.facet_version(id) ON DELETE CASCADE` |
| `term_parent_term_id_fkey` | [`taxonomy.term`](../../taxonomy/tables/term.md) | `FOREIGN KEY (parent_term_id) REFERENCES taxonomy.term(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_term_id_fkey` | `FOREIGN KEY (term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` |
| [`taxonomy.term`](../../taxonomy/tables/term.md) | `term_parent_term_id_fkey` | `FOREIGN KEY (parent_term_id) REFERENCES taxonomy.term(id)` |
| [`taxonomy.term_relation`](../../taxonomy/tables/term_relation.md) | `term_relation_from_term_id_fkey` | `FOREIGN KEY (from_term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` |
| [`taxonomy.term_relation`](../../taxonomy/tables/term_relation.md) | `term_relation_to_term_id_fkey` | `FOREIGN KEY (to_term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `term_facet_version_id_slug_key` | `CREATE UNIQUE INDEX term_facet_version_id_slug_key ON taxonomy.term USING btree (facet_version_id, slug)` |
| `term_parent_idx` | `CREATE INDEX term_parent_idx ON taxonomy.term USING btree (parent_term_id)` |
| `term_pkey` | `CREATE UNIQUE INDEX term_pkey ON taxonomy.term USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

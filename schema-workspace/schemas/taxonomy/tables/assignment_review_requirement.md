---
schema: taxonomy
relation: assignment_review_requirement
qualified_name: taxonomy.assignment_review_requirement
kind: table
---

# taxonomy.assignment_review_requirement

Database table taxonomy.assignment_review_requirement.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["taxonomy"]["Tables"]["assignment_review_requirement"]["Row"]`
- Row-level security: enabled
- Search tokens: `taxonomy assignment_review_requirement taxonomy.assignment_review_requirement facet_id requires_review rule created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `facet_id` | `uuid` | no | — | — |
| 2 | `requires_review` | `boolean` | no | `true` | — |
| 3 | `rule` | `jsonb` | no | `'{}'::jsonb` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `assignment_review_requirement_facet_id_fkey` | `foreign_key` | `FOREIGN KEY (facet_id) REFERENCES taxonomy.facet(id) ON DELETE CASCADE` | [`taxonomy.facet`](../../taxonomy/tables/facet.md) |
| `assignment_review_requirement_pkey` | `primary_key` | `PRIMARY KEY (facet_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `assignment_review_requirement_facet_id_fkey` | [`taxonomy.facet`](../../taxonomy/tables/facet.md) | `FOREIGN KEY (facet_id) REFERENCES taxonomy.facet(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `assignment_review_requirement_pkey` | `CREATE UNIQUE INDEX assignment_review_requirement_pkey ON taxonomy.assignment_review_requirement USING btree (facet_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

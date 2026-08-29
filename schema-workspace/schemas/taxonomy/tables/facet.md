---
schema: taxonomy
relation: facet
qualified_name: taxonomy.facet
kind: table
---

# taxonomy.facet

Database table taxonomy.facet.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["taxonomy"]["Tables"]["facet"]["Row"]`
- Row-level security: enabled
- Search tokens: `taxonomy facet taxonomy.facet id tenant_id slug label description cardinality created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `label` | `text` | no | — | — |
| 5 | `description` | `text` | yes | — | — |
| 6 | `cardinality` | `text` | no | `'multi'::text` | — |
| 7 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 8 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `facet_cardinality_check` | `check` | `CHECK (cardinality = ANY (ARRAY['single'::text, 'multi'::text]))` | — |
| `facet_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `facet_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`taxonomy.assignment_review_requirement`](../../taxonomy/tables/assignment_review_requirement.md) | `assignment_review_requirement_facet_id_fkey` | `FOREIGN KEY (facet_id) REFERENCES taxonomy.facet(id) ON DELETE CASCADE` |
| [`taxonomy.facet_version`](../../taxonomy/tables/facet_version.md) | `facet_version_facet_id_fkey` | `FOREIGN KEY (facet_id) REFERENCES taxonomy.facet(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `facet_pkey` | `CREATE UNIQUE INDEX facet_pkey ON taxonomy.facet USING btree (id)` |
| `facet_tenant_id_slug_key` | `CREATE UNIQUE INDEX facet_tenant_id_slug_key ON taxonomy.facet USING btree (tenant_id, slug)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

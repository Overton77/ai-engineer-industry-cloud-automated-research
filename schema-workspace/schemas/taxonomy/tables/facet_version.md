---
schema: taxonomy
relation: facet_version
qualified_name: taxonomy.facet_version
kind: table
---

# taxonomy.facet_version

Database table taxonomy.facet_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["taxonomy"]["Tables"]["facet_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `taxonomy facet_version taxonomy.facet_version id facet_id version status notes approved_by_review_task_id approved_at created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `facet_id` | `uuid` | no | — | — |
| 3 | `version` | `integer` | no | — | — |
| 4 | `status` | `taxonomy.facet_status` | no | `'draft'::taxonomy.facet_status` | — |
| 5 | `notes` | `text` | yes | — | — |
| 6 | `approved_by_review_task_id` | `uuid` | yes | — | — |
| 7 | `approved_at` | `timestamp with time zone` | yes | — | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `facet_version_positive` | `check` | `CHECK (version > 0)` | — |
| `facet_version_facet_id_fkey` | `foreign_key` | `FOREIGN KEY (facet_id) REFERENCES taxonomy.facet(id) ON DELETE CASCADE` | [`taxonomy.facet`](../../taxonomy/tables/facet.md) |
| `facet_version_review_task_fk` | `foreign_key` | `FOREIGN KEY (approved_by_review_task_id) REFERENCES evaluation.review_task(id)` | `evaluation.review_task` |
| `facet_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `facet_version_facet_id_version_key` | `unique` | `UNIQUE (facet_id, version)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `facet_version_facet_id_fkey` | [`taxonomy.facet`](../../taxonomy/tables/facet.md) | `FOREIGN KEY (facet_id) REFERENCES taxonomy.facet(id) ON DELETE CASCADE` |
| `facet_version_review_task_fk` | `evaluation.review_task` | `FOREIGN KEY (approved_by_review_task_id) REFERENCES evaluation.review_task(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`taxonomy.term`](../../taxonomy/tables/term.md) | `term_facet_version_id_fkey` | `FOREIGN KEY (facet_version_id) REFERENCES taxonomy.facet_version(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `facet_version_facet_id_version_key` | `CREATE UNIQUE INDEX facet_version_facet_id_version_key ON taxonomy.facet_version USING btree (facet_id, version)` |
| `facet_version_one_active` | `CREATE UNIQUE INDEX facet_version_one_active ON taxonomy.facet_version USING btree (facet_id) WHERE (status = 'active'::taxonomy.facet_status)` |
| `facet_version_pkey` | `CREATE UNIQUE INDEX facet_version_pkey ON taxonomy.facet_version USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

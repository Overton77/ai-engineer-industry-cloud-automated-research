---
schema: ranking
relation: entity_group
qualified_name: ranking.entity_group
kind: table
---

# ranking.entity_group

Database table ranking.entity_group.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["entity_group"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking entity_group ranking.entity_group id tenant_id slug entity_kind purpose definition inclusion_rules exclusion_rules review_state created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `entity_kind` | `text` | no | — | — |
| 5 | `purpose` | `text` | no | — | — |
| 6 | `definition` | `text` | yes | — | — |
| 7 | `inclusion_rules` | `jsonb` | no | `'{}'::jsonb` | — |
| 8 | `exclusion_rules` | `jsonb` | no | `'{}'::jsonb` | — |
| 9 | `review_state` | `ranking.approval_state` | no | `'draft'::ranking.approval_state` | — |
| 10 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `entity_group_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `entity_group_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`ranking.entity_group_version`](../../ranking/tables/entity_group_version.md) | `entity_group_version_entity_group_id_fkey` | `FOREIGN KEY (entity_group_id) REFERENCES ranking.entity_group(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `entity_group_pkey` | `CREATE UNIQUE INDEX entity_group_pkey ON ranking.entity_group USING btree (id)` |
| `entity_group_tenant_id_slug_key` | `CREATE UNIQUE INDEX entity_group_tenant_id_slug_key ON ranking.entity_group USING btree (tenant_id, slug)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

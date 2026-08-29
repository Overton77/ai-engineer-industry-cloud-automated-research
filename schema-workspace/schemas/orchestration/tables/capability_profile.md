---
schema: orchestration
relation: capability_profile
qualified_name: orchestration.capability_profile
kind: table
---

# orchestration.capability_profile

Database table orchestration.capability_profile.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["capability_profile"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration capability_profile orchestration.capability_profile id tenant_id slug purpose created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `purpose` | `text` | no | — | — |
| 5 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `capability_profile_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `capability_profile_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.capability_profile_item`](../../orchestration/tables/capability_profile_item.md) | `capability_profile_item_profile_id_fkey` | `FOREIGN KEY (profile_id) REFERENCES orchestration.capability_profile(id) ON DELETE CASCADE` |
| [`orchestration.mission`](../../orchestration/tables/mission.md) | `mission_capability_profile_fk` | `FOREIGN KEY (capability_profile_id) REFERENCES orchestration.capability_profile(id)` |
| [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `work_item_capability_profile_fk` | `FOREIGN KEY (capability_profile_id) REFERENCES orchestration.capability_profile(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `capability_profile_pkey` | `CREATE UNIQUE INDEX capability_profile_pkey ON orchestration.capability_profile USING btree (id)` |
| `capability_profile_tenant_id_slug_key` | `CREATE UNIQUE INDEX capability_profile_tenant_id_slug_key ON orchestration.capability_profile USING btree (tenant_id, slug)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

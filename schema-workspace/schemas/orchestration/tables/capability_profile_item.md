---
schema: orchestration
relation: capability_profile_item
qualified_name: orchestration.capability_profile_item
kind: table
---

# orchestration.capability_profile_item

Database table orchestration.capability_profile_item.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["capability_profile_item"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration capability_profile_item orchestration.capability_profile_item profile_id capability_version_id activation`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `profile_id` | `uuid` | no | — | — |
| 2 | `capability_version_id` | `uuid` | no | — | — |
| 3 | `activation` | `text` | no | `'available'::text` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `capability_profile_item_activation_check` | `check` | `CHECK (activation = ANY (ARRAY['available'::text, 'preloaded'::text, 'on_demand'::text, 'disabled'::text]))` | — |
| `capability_profile_item_capability_version_id_fkey` | `foreign_key` | `FOREIGN KEY (capability_version_id) REFERENCES orchestration.capability_version(id) ON DELETE CASCADE` | [`orchestration.capability_version`](../../orchestration/tables/capability_version.md) |
| `capability_profile_item_profile_id_fkey` | `foreign_key` | `FOREIGN KEY (profile_id) REFERENCES orchestration.capability_profile(id) ON DELETE CASCADE` | [`orchestration.capability_profile`](../../orchestration/tables/capability_profile.md) |
| `capability_profile_item_pkey` | `primary_key` | `PRIMARY KEY (profile_id, capability_version_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `capability_profile_item_capability_version_id_fkey` | [`orchestration.capability_version`](../../orchestration/tables/capability_version.md) | `FOREIGN KEY (capability_version_id) REFERENCES orchestration.capability_version(id) ON DELETE CASCADE` |
| `capability_profile_item_profile_id_fkey` | [`orchestration.capability_profile`](../../orchestration/tables/capability_profile.md) | `FOREIGN KEY (profile_id) REFERENCES orchestration.capability_profile(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `capability_profile_item_pkey` | `CREATE UNIQUE INDEX capability_profile_item_pkey ON orchestration.capability_profile_item USING btree (profile_id, capability_version_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: ranking
relation: entity_group_version
qualified_name: ranking.entity_group_version
kind: table
---

# ranking.entity_group_version

Database table ranking.entity_group_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["entity_group_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking entity_group_version ranking.entity_group_version id entity_group_id version created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `entity_group_id` | `uuid` | no | — | — |
| 3 | `version` | `integer` | no | — | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `entity_group_version_entity_group_id_fkey` | `foreign_key` | `FOREIGN KEY (entity_group_id) REFERENCES ranking.entity_group(id) ON DELETE CASCADE` | [`ranking.entity_group`](../../ranking/tables/entity_group.md) |
| `entity_group_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `entity_group_version_entity_group_id_version_key` | `unique` | `UNIQUE (entity_group_id, version)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `entity_group_version_entity_group_id_fkey` | [`ranking.entity_group`](../../ranking/tables/entity_group.md) | `FOREIGN KEY (entity_group_id) REFERENCES ranking.entity_group(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_group_version_id_fkey` | `FOREIGN KEY (group_version_id) REFERENCES ranking.entity_group_version(id) ON DELETE CASCADE` |
| [`ranking.leaderboard`](../../ranking/tables/leaderboard.md) | `leaderboard_group_version_id_fkey` | `FOREIGN KEY (group_version_id) REFERENCES ranking.entity_group_version(id)` |
| [`ranking.membership_snapshot`](../../ranking/tables/membership_snapshot.md) | `membership_snapshot_group_version_id_fkey` | `FOREIGN KEY (group_version_id) REFERENCES ranking.entity_group_version(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `entity_group_version_entity_group_id_version_key` | `CREATE UNIQUE INDEX entity_group_version_entity_group_id_version_key ON ranking.entity_group_version USING btree (entity_group_id, version)` |
| `entity_group_version_pkey` | `CREATE UNIQUE INDEX entity_group_version_pkey ON ranking.entity_group_version USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

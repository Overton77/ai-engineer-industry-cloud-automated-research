---
schema: ranking
relation: membership_snapshot
qualified_name: ranking.membership_snapshot
kind: table
---

# ranking.membership_snapshot

Database table ranking.membership_snapshot.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["membership_snapshot"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking membership_snapshot ranking.membership_snapshot id group_version_id members member_count frozen_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `group_version_id` | `uuid` | no | — | — |
| 3 | `members` | `jsonb` | no | — | — |
| 4 | `member_count` | `integer` | no | — | — |
| 5 | `frozen_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `membership_snapshot_group_version_id_fkey` | `foreign_key` | `FOREIGN KEY (group_version_id) REFERENCES ranking.entity_group_version(id)` | [`ranking.entity_group_version`](../../ranking/tables/entity_group_version.md) |
| `membership_snapshot_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `membership_snapshot_group_version_id_fkey` | [`ranking.entity_group_version`](../../ranking/tables/entity_group_version.md) | `FOREIGN KEY (group_version_id) REFERENCES ranking.entity_group_version(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) | `ranking_run_snapshot_id_fkey` | `FOREIGN KEY (snapshot_id) REFERENCES ranking.membership_snapshot(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `membership_snapshot_pkey` | `CREATE UNIQUE INDEX membership_snapshot_pkey ON ranking.membership_snapshot USING btree (id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `membership_snapshot_immutable` | `util.reject_mutation` | `CREATE TRIGGER membership_snapshot_immutable BEFORE DELETE OR UPDATE ON ranking.membership_snapshot FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

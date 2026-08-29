---
schema: orchestration
relation: capability_version
qualified_name: orchestration.capability_version
kind: table
---

# orchestration.capability_version

Database table orchestration.capability_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["capability_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration capability_version orchestration.capability_version id capability_id version_label lifecycle eval_suite_id network_requirements secret_requirements approval_policy created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `capability_id` | `uuid` | no | — | — |
| 3 | `version_label` | `text` | no | — | — |
| 4 | `lifecycle` | `text` | no | `'draft'::text` | — |
| 5 | `eval_suite_id` | `uuid` | yes | — | — |
| 6 | `network_requirements` | `jsonb` | no | `'{}'::jsonb` | — |
| 7 | `secret_requirements` | `jsonb` | no | `'{}'::jsonb` | — |
| 8 | `approval_policy` | `jsonb` | no | `'{}'::jsonb` | — |
| 9 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `capability_version_lifecycle_check` | `check` | `CHECK (lifecycle = ANY (ARRAY['draft'::text, 'candidate'::text, 'active'::text, 'deprecated'::text, 'retired'::text]))` | — |
| `capability_version_capability_id_fkey` | `foreign_key` | `FOREIGN KEY (capability_id) REFERENCES orchestration.capability(id) ON DELETE CASCADE` | [`orchestration.capability`](../../orchestration/tables/capability.md) |
| `capability_version_eval_suite_fk` | `foreign_key` | `FOREIGN KEY (eval_suite_id) REFERENCES evaluation.eval_dataset(id)` | `evaluation.eval_dataset` |
| `capability_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `capability_version_capability_id_version_label_key` | `unique` | `UNIQUE (capability_id, version_label)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `capability_version_capability_id_fkey` | [`orchestration.capability`](../../orchestration/tables/capability.md) | `FOREIGN KEY (capability_id) REFERENCES orchestration.capability(id) ON DELETE CASCADE` |
| `capability_version_eval_suite_fk` | `evaluation.eval_dataset` | `FOREIGN KEY (eval_suite_id) REFERENCES evaluation.eval_dataset(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.capability_profile_item`](../../orchestration/tables/capability_profile_item.md) | `capability_profile_item_capability_version_id_fkey` | `FOREIGN KEY (capability_version_id) REFERENCES orchestration.capability_version(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `capability_version_capability_id_version_label_key` | `CREATE UNIQUE INDEX capability_version_capability_id_version_label_key ON orchestration.capability_version USING btree (capability_id, version_label)` |
| `capability_version_pkey` | `CREATE UNIQUE INDEX capability_version_pkey ON orchestration.capability_version USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

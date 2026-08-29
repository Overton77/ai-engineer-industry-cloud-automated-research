---
schema: research
relation: research_bundle
qualified_name: research.research_bundle
kind: table
---

# research.research_bundle

Database table research.research_bundle.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["research"]["Tables"]["research_bundle"]["Row"]`
- Row-level security: enabled
- Search tokens: `research research_bundle research.research_bundle id tenant_id mission_id bundle_version manifest_artifact_id status created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `mission_id` | `uuid` | no | — | — |
| 4 | `bundle_version` | `integer` | no | `1` | — |
| 5 | `manifest_artifact_id` | `uuid` | yes | — | — |
| 6 | `status` | `research.bundle_status` | no | `'assembling'::research.bundle_status` | — |
| 7 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 8 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_bundle_manifest_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (manifest_artifact_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `research_bundle_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `research_bundle_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `research_bundle_mission_id_bundle_version_key` | `unique` | `UNIQUE (mission_id, bundle_version)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_bundle_manifest_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (manifest_artifact_id) REFERENCES orchestration.artifact(id)` |
| `research_bundle_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`research.bundle_artifact`](../../research/tables/bundle_artifact.md) | `bundle_artifact_bundle_id_fkey` | `FOREIGN KEY (bundle_id) REFERENCES research.research_bundle(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `research_bundle_mission_id_bundle_version_key` | `CREATE UNIQUE INDEX research_bundle_mission_id_bundle_version_key ON research.research_bundle USING btree (mission_id, bundle_version)` |
| `research_bundle_pkey` | `CREATE UNIQUE INDEX research_bundle_pkey ON research.research_bundle USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

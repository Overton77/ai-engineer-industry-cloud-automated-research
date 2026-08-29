---
schema: research
relation: bundle_artifact
qualified_name: research.bundle_artifact
kind: table
---

# research.bundle_artifact

Database table research.bundle_artifact.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["research"]["Tables"]["bundle_artifact"]["Row"]`
- Row-level security: enabled
- Search tokens: `research bundle_artifact research.bundle_artifact bundle_id artifact_id role`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `bundle_id` | `uuid` | no | — | — |
| 2 | `artifact_id` | `uuid` | no | — | — |
| 3 | `role` | `text` | no | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `bundle_artifact_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (artifact_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `bundle_artifact_bundle_id_fkey` | `foreign_key` | `FOREIGN KEY (bundle_id) REFERENCES research.research_bundle(id) ON DELETE CASCADE` | [`research.research_bundle`](../../research/tables/research_bundle.md) |
| `bundle_artifact_pkey` | `primary_key` | `PRIMARY KEY (bundle_id, artifact_id, role)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `bundle_artifact_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (artifact_id) REFERENCES orchestration.artifact(id)` |
| `bundle_artifact_bundle_id_fkey` | [`research.research_bundle`](../../research/tables/research_bundle.md) | `FOREIGN KEY (bundle_id) REFERENCES research.research_bundle(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `bundle_artifact_pkey` | `CREATE UNIQUE INDEX bundle_artifact_pkey ON research.bundle_artifact USING btree (bundle_id, artifact_id, role)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: research
relation: report_version
qualified_name: research.report_version
kind: table
---

# research.report_version

Database table research.report_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["research"]["Tables"]["report_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `research report_version research.report_version id report_id version markdown_artifact_id json_artifact_id synthesis_consistency_eval_id assurance_summary published_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `report_id` | `uuid` | no | — | — |
| 3 | `version` | `integer` | no | — | — |
| 4 | `markdown_artifact_id` | `uuid` | yes | — | — |
| 5 | `json_artifact_id` | `uuid` | yes | — | — |
| 6 | `synthesis_consistency_eval_id` | `uuid` | yes | — | — |
| 7 | `assurance_summary` | `jsonb` | no | `'{}'::jsonb` | — |
| 8 | `published_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `report_version_consistency_eval_fk` | `foreign_key` | `FOREIGN KEY (synthesis_consistency_eval_id) REFERENCES evaluation.eval_run(id)` | `evaluation.eval_run` |
| `report_version_json_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (json_artifact_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `report_version_markdown_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (markdown_artifact_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `report_version_report_id_fkey` | `foreign_key` | `FOREIGN KEY (report_id) REFERENCES research.report(id) ON DELETE CASCADE` | [`research.report`](../../research/tables/report.md) |
| `report_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `report_version_report_id_version_key` | `unique` | `UNIQUE (report_id, version)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `report_version_consistency_eval_fk` | `evaluation.eval_run` | `FOREIGN KEY (synthesis_consistency_eval_id) REFERENCES evaluation.eval_run(id)` |
| `report_version_json_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (json_artifact_id) REFERENCES orchestration.artifact(id)` |
| `report_version_markdown_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (markdown_artifact_id) REFERENCES orchestration.artifact(id)` |
| `report_version_report_id_fkey` | [`research.report`](../../research/tables/report.md) | `FOREIGN KEY (report_id) REFERENCES research.report(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`research.report_claim`](../../research/tables/report_claim.md) | `report_claim_report_version_id_fkey` | `FOREIGN KEY (report_version_id) REFERENCES research.report_version(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `report_version_pkey` | `CREATE UNIQUE INDEX report_version_pkey ON research.report_version USING btree (id)` |
| `report_version_report_id_version_key` | `CREATE UNIQUE INDEX report_version_report_id_version_key ON research.report_version USING btree (report_id, version)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `report_version_immutable` | `util.reject_mutation` | `CREATE TRIGGER report_version_immutable BEFORE DELETE OR UPDATE ON research.report_version FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

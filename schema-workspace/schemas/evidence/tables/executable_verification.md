---
schema: evidence
relation: executable_verification
qualified_name: evidence.executable_verification
kind: table
---

# evidence.executable_verification

Database table evidence.executable_verification.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["executable_verification"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence executable_verification evidence.executable_verification id repository_url commit_sha image_digest lockfile_hashes commands exit_codes log_artifact_id assurance_level trace_id executed_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `repository_url` | `text` | yes | — | — |
| 3 | `commit_sha` | `text` | yes | — | — |
| 4 | `image_digest` | `text` | yes | — | — |
| 5 | `lockfile_hashes` | `jsonb` | no | `'{}'::jsonb` | — |
| 6 | `commands` | `jsonb` | no | `'[]'::jsonb` | — |
| 7 | `exit_codes` | `jsonb` | no | `'[]'::jsonb` | — |
| 8 | `log_artifact_id` | `uuid` | yes | — | — |
| 9 | `assurance_level` | `text` | no | — | — |
| 10 | `trace_id` | `text` | yes | — | — |
| 11 | `executed_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `executable_verification_log_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (log_artifact_id) REFERENCES orchestration.artifact(id)` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) |
| `executable_verification_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `executable_verification_log_artifact_id_fkey` | [`orchestration.artifact`](../../orchestration/tables/artifact.md) | `FOREIGN KEY (log_artifact_id) REFERENCES orchestration.artifact(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `executable_verification_pkey` | `CREATE UNIQUE INDEX executable_verification_pkey ON evidence.executable_verification USING btree (id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `executable_verification_immutable` | `util.reject_mutation` | `CREATE TRIGGER executable_verification_immutable BEFORE DELETE OR UPDATE ON evidence.executable_verification FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

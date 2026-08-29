---
schema: evidence
relation: degraded_assurance
qualified_name: evidence.degraded_assurance
kind: table
---

# evidence.degraded_assurance

Database table evidence.degraded_assurance.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["degraded_assurance"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence degraded_assurance evidence.degraded_assurance id source_id reason what_was_seen attempted_methods approved_by_review_task_id approved_at created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `source_id` | `uuid` | no | — | — |
| 3 | `reason` | `text` | no | — | — |
| 4 | `what_was_seen` | `text` | no | — | — |
| 5 | `attempted_methods` | `jsonb` | no | `'[]'::jsonb` | — |
| 6 | `approved_by_review_task_id` | `uuid` | yes | — | — |
| 7 | `approved_at` | `timestamp with time zone` | yes | — | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `degraded_assurance_review_task_fk` | `foreign_key` | `FOREIGN KEY (approved_by_review_task_id) REFERENCES evaluation.review_task(id)` | `evaluation.review_task` |
| `degraded_assurance_source_id_fkey` | `foreign_key` | `FOREIGN KEY (source_id) REFERENCES evidence.source(id)` | [`evidence.source`](../../evidence/tables/source.md) |
| `degraded_assurance_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `degraded_assurance_review_task_fk` | `evaluation.review_task` | `FOREIGN KEY (approved_by_review_task_id) REFERENCES evaluation.review_task(id)` |
| `degraded_assurance_source_id_fkey` | [`evidence.source`](../../evidence/tables/source.md) | `FOREIGN KEY (source_id) REFERENCES evidence.source(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `degraded_assurance_pkey` | `CREATE UNIQUE INDEX degraded_assurance_pkey ON evidence.degraded_assurance USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

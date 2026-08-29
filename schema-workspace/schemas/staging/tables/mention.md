---
schema: staging
relation: mention
qualified_name: staging.mention
kind: table
---

# staging.mention

Database table staging.mention.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["mention"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging mention staging.mention id candidate_id appeared_in_capture_id snippet_locator_id surface_form created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `candidate_id` | `uuid` | no | — | — |
| 3 | `appeared_in_capture_id` | `uuid` | no | — | — |
| 4 | `snippet_locator_id` | `uuid` | yes | — | — |
| 5 | `surface_form` | `text` | yes | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `mention_appeared_in_capture_id_fkey` | `foreign_key` | `FOREIGN KEY (appeared_in_capture_id) REFERENCES evidence.source_capture(id)` | [`evidence.source_capture`](../../evidence/tables/source_capture.md) |
| `mention_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `mention_snippet_locator_id_fkey` | `foreign_key` | `FOREIGN KEY (snippet_locator_id) REFERENCES evidence.locator(id)` | [`evidence.locator`](../../evidence/tables/locator.md) |
| `mention_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `mention_appeared_in_capture_id_fkey` | [`evidence.source_capture`](../../evidence/tables/source_capture.md) | `FOREIGN KEY (appeared_in_capture_id) REFERENCES evidence.source_capture(id)` |
| `mention_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| `mention_snippet_locator_id_fkey` | [`evidence.locator`](../../evidence/tables/locator.md) | `FOREIGN KEY (snippet_locator_id) REFERENCES evidence.locator(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `mention_candidate_idx` | `CREATE INDEX mention_candidate_idx ON staging.mention USING btree (candidate_id)` |
| `mention_capture_idx` | `CREATE INDEX mention_capture_idx ON staging.mention USING btree (appeared_in_capture_id)` |
| `mention_pkey` | `CREATE UNIQUE INDEX mention_pkey ON staging.mention USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

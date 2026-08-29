---
schema: evidence
relation: revalidation_policy
qualified_name: evidence.revalidation_policy
kind: table
---

# evidence.revalidation_policy

Database table evidence.revalidation_policy.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["revalidation_policy"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence revalidation_policy evidence.revalidation_policy id slug applies_to rules max_age created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `slug` | `text` | no | — | — |
| 3 | `applies_to` | `text` | no | — | — |
| 4 | `rules` | `jsonb` | no | `'{}'::jsonb` | — |
| 5 | `max_age` | `interval` | yes | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `revalidation_policy_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `revalidation_policy_slug_key` | `unique` | `UNIQUE (slug)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.revalidation_event`](../../evidence/tables/revalidation_event.md) | `revalidation_event_policy_id_fkey` | `FOREIGN KEY (policy_id) REFERENCES evidence.revalidation_policy(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `revalidation_policy_pkey` | `CREATE UNIQUE INDEX revalidation_policy_pkey ON evidence.revalidation_policy USING btree (id)` |
| `revalidation_policy_slug_key` | `CREATE UNIQUE INDEX revalidation_policy_slug_key ON evidence.revalidation_policy USING btree (slug)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: evidence
relation: claim_type
qualified_name: evidence.claim_type
kind: table
---

# evidence.claim_type

Database table evidence.claim_type.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_type"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_type evidence.claim_type code description created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `code` | `text` | no | — | — |
| 2 | `description` | `text` | no | — | — |
| 3 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_type_pkey` | `primary_key` | `PRIMARY KEY (code)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.claim`](../../evidence/tables/claim.md) | `claim_claim_type_fkey` | `FOREIGN KEY (claim_type) REFERENCES evidence.claim_type(code)` |

## Indexes

| Name | Definition |
| --- | --- |
| `claim_type_pkey` | `CREATE UNIQUE INDEX claim_type_pkey ON evidence.claim_type USING btree (code)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

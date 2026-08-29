---
schema: evidence
relation: claim_repository
qualified_name: evidence.claim_repository
kind: table
---

# evidence.claim_repository

Database table evidence.claim_repository.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_repository"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_repository evidence.claim_repository claim_id repository_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `repository_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_repository_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text]))` | — |
| `claim_repository_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_repository_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `claim_repository_pkey` | `primary_key` | `PRIMARY KEY (claim_id, repository_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_repository_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_repository_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_repository_pkey` | `CREATE UNIQUE INDEX claim_repository_pkey ON evidence.claim_repository USING btree (claim_id, repository_id, role_in_claim)` |
| `claim_repository_target_idx` | `CREATE INDEX claim_repository_target_idx ON evidence.claim_repository USING btree (repository_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

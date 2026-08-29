---
schema: staging
relation: candidate_ai_protocol
qualified_name: staging.candidate_ai_protocol
kind: table
---

# staging.candidate_ai_protocol

Database table staging.candidate_ai_protocol.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["candidate_ai_protocol"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging candidate_ai_protocol staging.candidate_ai_protocol candidate_id candidate_kind slug name spec_url`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `candidate_id` | `uuid` | no | — | — |
| 2 | `candidate_kind` | `text` | no | `'ai_protocol'::text` | — |
| 3 | `slug` | `text` | yes | — | — |
| 4 | `name` | `text` | yes | — | — |
| 5 | `spec_url` | `text` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `candidate_ai_protocol_candidate_kind_check` | `check` | `CHECK (candidate_kind = 'ai_protocol'::text)` | — |
| `candidate_ai_protocol_candidate_id_candidate_kind_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_ai_protocol_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_ai_protocol_pkey` | `primary_key` | `PRIMARY KEY (candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `candidate_ai_protocol_candidate_id_candidate_kind_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| `candidate_ai_protocol_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `candidate_ai_protocol_pkey` | `CREATE UNIQUE INDEX candidate_ai_protocol_pkey ON staging.candidate_ai_protocol USING btree (candidate_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

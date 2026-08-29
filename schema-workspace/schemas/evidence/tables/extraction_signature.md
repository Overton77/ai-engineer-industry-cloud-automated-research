---
schema: evidence
relation: extraction_signature
qualified_name: evidence.extraction_signature
kind: table
---

# evidence.extraction_signature

Database table evidence.extraction_signature.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["extraction_signature"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence extraction_signature evidence.extraction_signature id locator_id signature_sha256 produced_by_attempt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `locator_id` | `uuid` | no | — | — |
| 3 | `signature_sha256` | `text` | no | — | — |
| 4 | `produced_by_attempt_id` | `uuid` | yes | — | — |
| 5 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `extraction_signature_signature_sha256_check` | `check` | `CHECK (signature_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `extraction_signature_locator_id_fkey` | `foreign_key` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` | [`evidence.locator`](../../evidence/tables/locator.md) |
| `extraction_signature_produced_by_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (produced_by_attempt_id) REFERENCES orchestration.attempt(id)` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `extraction_signature_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `extraction_signature_locator_id_signature_sha256_key` | `unique` | `UNIQUE (locator_id, signature_sha256)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `extraction_signature_locator_id_fkey` | [`evidence.locator`](../../evidence/tables/locator.md) | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| `extraction_signature_produced_by_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (produced_by_attempt_id) REFERENCES orchestration.attempt(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `extraction_signature_locator_id_signature_sha256_key` | `CREATE UNIQUE INDEX extraction_signature_locator_id_signature_sha256_key ON evidence.extraction_signature USING btree (locator_id, signature_sha256)` |
| `extraction_signature_pkey` | `CREATE UNIQUE INDEX extraction_signature_pkey ON evidence.extraction_signature USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

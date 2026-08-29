---
schema: corpus
relation: person_identifier
qualified_name: corpus.person_identifier
kind: table
---

# corpus.person_identifier

Database table corpus.person_identifier.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["person_identifier"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus person_identifier corpus.person_identifier id person_id scheme value created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `person_id` | `uuid` | no | — | — |
| 3 | `scheme` | `text` | no | — | — |
| 4 | `value` | `text` | no | — | — |
| 5 | `created_by_receipt_id` | `uuid` | no | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `person_identifier_scheme_check` | `check` | `CHECK (scheme = ANY (ARRAY['orcid'::text, 'github'::text, 'x'::text, 'scholar'::text, 'linkedin'::text, 'mastodon'::text, 'bluesky'::text, 'email'::text, 'other'::text]))` | — |
| `person_identifier_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `person_identifier_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` | [`corpus.person`](../../corpus/tables/person.md) |
| `person_identifier_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `person_identifier_scheme_value_key` | `unique` | `UNIQUE (scheme, value)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `person_identifier_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `person_identifier_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `person_identifier_pkey` | `CREATE UNIQUE INDEX person_identifier_pkey ON corpus.person_identifier USING btree (id)` |
| `person_identifier_scheme_value_key` | `CREATE UNIQUE INDEX person_identifier_scheme_value_key ON corpus.person_identifier USING btree (scheme, value)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

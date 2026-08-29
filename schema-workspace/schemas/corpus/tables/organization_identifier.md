---
schema: corpus
relation: organization_identifier
qualified_name: corpus.organization_identifier
kind: table
---

# corpus.organization_identifier

Database table corpus.organization_identifier.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["organization_identifier"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus organization_identifier corpus.organization_identifier id organization_id scheme value created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `organization_id` | `uuid` | no | — | — |
| 3 | `scheme` | `text` | no | — | — |
| 4 | `value` | `text` | no | — | — |
| 5 | `created_by_receipt_id` | `uuid` | no | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `organization_identifier_scheme_check` | `check` | `CHECK (scheme = ANY (ARRAY['ror'::text, 'crunchbase'::text, 'github_org'::text, 'linkedin'::text, 'wikidata'::text, 'domain'::text, 'cik'::text, 'other'::text]))` | — |
| `organization_identifier_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `organization_identifier_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `organization_identifier_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `organization_identifier_scheme_value_key` | `unique` | `UNIQUE (scheme, value)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `organization_identifier_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `organization_identifier_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `organization_identifier_pkey` | `CREATE UNIQUE INDEX organization_identifier_pkey ON corpus.organization_identifier USING btree (id)` |
| `organization_identifier_scheme_value_key` | `CREATE UNIQUE INDEX organization_identifier_scheme_value_key ON corpus.organization_identifier USING btree (scheme, value)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

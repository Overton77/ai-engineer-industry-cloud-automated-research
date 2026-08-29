---
schema: corpus
relation: concept_alias
qualified_name: corpus.concept_alias
kind: table
---

# corpus.concept_alias

Database table corpus.concept_alias.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["concept_alias"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus concept_alias corpus.concept_alias id concept_id alias alias_kind created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `concept_id` | `uuid` | no | — | — |
| 3 | `alias` | `text` | no | — | — |
| 4 | `alias_kind` | `text` | no | `'synonym'::text` | — |
| 5 | `created_by_receipt_id` | `uuid` | no | — | — |
| 6 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `concept_alias_alias_kind_check` | `check` | `CHECK (alias_kind = ANY (ARRAY['synonym'::text, 'acronym'::text, 'misspelling'::text, 'former_name'::text]))` | — |
| `concept_alias_concept_id_fkey` | `foreign_key` | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` | [`corpus.concept`](../../corpus/tables/concept.md) |
| `concept_alias_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `concept_alias_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `concept_alias_concept_id_alias_key` | `unique` | `UNIQUE (concept_id, alias)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `concept_alias_concept_id_fkey` | [`corpus.concept`](../../corpus/tables/concept.md) | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` |
| `concept_alias_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `concept_alias_concept_id_alias_key` | `CREATE UNIQUE INDEX concept_alias_concept_id_alias_key ON corpus.concept_alias USING btree (concept_id, alias)` |
| `concept_alias_pkey` | `CREATE UNIQUE INDEX concept_alias_pkey ON corpus.concept_alias USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

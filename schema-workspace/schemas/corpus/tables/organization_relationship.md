---
schema: corpus
relation: organization_relationship
qualified_name: corpus.organization_relationship
kind: table
---

# corpus.organization_relationship

Database table corpus.organization_relationship.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["organization_relationship"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus organization_relationship corpus.organization_relationship from_organization_id to_organization_id relationship_kind valid_from valid_to provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `from_organization_id` | `uuid` | no | — | — |
| 2 | `to_organization_id` | `uuid` | no | — | — |
| 3 | `relationship_kind` | `text` | no | — | — |
| 4 | `valid_from` | `date` | yes | — | — |
| 5 | `valid_to` | `date` | yes | — | — |
| 6 | `provenance_claim_id` | `uuid` | yes | — | — |
| 7 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `organization_relationship_no_self` | `check` | `CHECK (from_organization_id <> to_organization_id)` | — |
| `organization_relationship_relationship_kind_check` | `check` | `CHECK (relationship_kind = ANY (ARRAY['parent'::text, 'subsidiary'::text, 'acquired'::text, 'merged'::text, 'spinout'::text, 'partner'::text, 'member'::text, 'funder'::text, 'other'::text]))` | — |
| `organization_relationship_validity` | `check` | `CHECK (valid_to IS NULL OR valid_from IS NULL OR valid_to >= valid_from)` | — |
| `organization_relationship_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `organization_relationship_from_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (from_organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `organization_relationship_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `organization_relationship_to_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (to_organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `organization_relationship_pkey` | `primary_key` | `PRIMARY KEY (from_organization_id, to_organization_id, relationship_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `organization_relationship_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `organization_relationship_from_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (from_organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| `organization_relationship_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `organization_relationship_to_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (to_organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `organization_relationship_pkey` | `CREATE UNIQUE INDEX organization_relationship_pkey ON corpus.organization_relationship USING btree (from_organization_id, to_organization_id, relationship_kind)` |
| `organization_relationship_to_idx` | `CREATE INDEX organization_relationship_to_idx ON corpus.organization_relationship USING btree (to_organization_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

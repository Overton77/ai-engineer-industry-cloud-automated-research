---
schema: corpus
relation: repository_maintained_by_organization
qualified_name: corpus.repository_maintained_by_organization
kind: table
---

# corpus.repository_maintained_by_organization

Database table corpus.repository_maintained_by_organization.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["repository_maintained_by_organization"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus repository_maintained_by_organization corpus.repository_maintained_by_organization repository_id organization_id maintenance_role valid_from valid_to provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `repository_id` | `uuid` | no | — | — |
| 2 | `organization_id` | `uuid` | no | — | — |
| 3 | `maintenance_role` | `text` | no | `'maintainer'::text` | — |
| 4 | `valid_from` | `date` | yes | — | — |
| 5 | `valid_to` | `date` | yes | — | — |
| 6 | `provenance_claim_id` | `uuid` | yes | — | — |
| 7 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `repository_maintained_by_organization_maintenance_role_check` | `check` | `CHECK (maintenance_role = ANY (ARRAY['owner'::text, 'maintainer'::text, 'sponsor'::text, 'governance'::text, 'other'::text]))` | — |
| `repository_maintained_by_organizatio_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `repository_maintained_by_organization_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `repository_maintained_by_organization_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `repository_maintained_by_organization_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `repository_maintained_by_organization_pkey` | `primary_key` | `PRIMARY KEY (repository_id, organization_id, maintenance_role)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `repository_maintained_by_organizatio_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `repository_maintained_by_organization_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| `repository_maintained_by_organization_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `repository_maintained_by_organization_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `repository_maintained_by_organization_pkey` | `CREATE UNIQUE INDEX repository_maintained_by_organization_pkey ON corpus.repository_maintained_by_organization USING btree (repository_id, organization_id, maintenance_role)` |
| `repository_maintainer_org_idx` | `CREATE INDEX repository_maintainer_org_idx ON corpus.repository_maintained_by_organization USING btree (organization_id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

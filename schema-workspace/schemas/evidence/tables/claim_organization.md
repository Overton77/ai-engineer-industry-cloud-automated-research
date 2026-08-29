---
schema: evidence
relation: claim_organization
qualified_name: evidence.claim_organization
kind: table
---

# evidence.claim_organization

Database table evidence.claim_organization.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_organization"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_organization evidence.claim_organization claim_id organization_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `organization_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_organization_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text]))` | — |
| `claim_organization_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_organization_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `claim_organization_pkey` | `primary_key` | `PRIMARY KEY (claim_id, organization_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_organization_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_organization_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_organization_pkey` | `CREATE UNIQUE INDEX claim_organization_pkey ON evidence.claim_organization USING btree (claim_id, organization_id, role_in_claim)` |
| `claim_organization_target_idx` | `CREATE INDEX claim_organization_target_idx ON evidence.claim_organization USING btree (organization_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

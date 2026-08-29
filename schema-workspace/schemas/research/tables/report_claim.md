---
schema: research
relation: report_claim
qualified_name: research.report_claim
kind: table
---

# research.report_claim

Database table research.report_claim.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["research"]["Tables"]["report_claim"]["Row"]`
- Row-level security: enabled
- Search tokens: `research report_claim research.report_claim report_version_id claim_id role`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `report_version_id` | `uuid` | no | — | — |
| 2 | `claim_id` | `uuid` | no | — | — |
| 3 | `role` | `text` | no | `'supports'::text` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `report_claim_role_check` | `check` | `CHECK (role = ANY (ARRAY['supports'::text, 'context'::text, 'caveat'::text, 'contradicts'::text]))` | — |
| `report_claim_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `report_claim_report_version_id_fkey` | `foreign_key` | `FOREIGN KEY (report_version_id) REFERENCES research.report_version(id) ON DELETE CASCADE` | [`research.report_version`](../../research/tables/report_version.md) |
| `report_claim_pkey` | `primary_key` | `PRIMARY KEY (report_version_id, claim_id, role)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `report_claim_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id)` |
| `report_claim_report_version_id_fkey` | [`research.report_version`](../../research/tables/report_version.md) | `FOREIGN KEY (report_version_id) REFERENCES research.report_version(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `report_claim_claim_idx` | `CREATE INDEX report_claim_claim_idx ON research.report_claim USING btree (claim_id)` |
| `report_claim_pkey` | `CREATE UNIQUE INDEX report_claim_pkey ON research.report_claim USING btree (report_version_id, claim_id, role)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

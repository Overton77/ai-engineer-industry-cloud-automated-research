---
schema: corpus
relation: ai_model_released_by_organization
qualified_name: corpus.ai_model_released_by_organization
kind: table
---

# corpus.ai_model_released_by_organization

Database table corpus.ai_model_released_by_organization.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["ai_model_released_by_organization"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus ai_model_released_by_organization corpus.ai_model_released_by_organization id ai_model_id organization_id release_role valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `ai_model_id` | `uuid` | no | — | — |
| 3 | `organization_id` | `uuid` | no | — | — |
| 4 | `release_role` | `text` | no | — | — |
| 5 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 6 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 7 | `confidence` | `corpus.confidence` | yes | — | — |
| 8 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 9 | `provenance_claim_id` | `uuid` | yes | — | — |
| 10 | `created_by_receipt_id` | `uuid` | no | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ai_model_released_by_organization_release_role_check` | `check` | `CHECK (release_role = ANY (ARRAY['developer'::text, 'host'::text, 'distiller'::text, 'funder'::text]))` | — |
| `ai_model_released_by_organization_ai_model_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) |
| `ai_model_released_by_organization_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `ai_model_released_by_organization_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `ai_model_released_by_organization_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `ai_model_released_by_organization_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `ai_model_released_by_organiza_ai_model_id_organization_id_r_key` | `unique` | `UNIQUE (ai_model_id, organization_id, release_role)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `ai_model_released_by_organization_ai_model_id_fkey` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` |
| `ai_model_released_by_organization_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `ai_model_released_by_organization_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| `ai_model_released_by_organization_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `ai_model_released_by_organiza_ai_model_id_organization_id_r_key` | `CREATE UNIQUE INDEX ai_model_released_by_organiza_ai_model_id_organization_id_r_key ON corpus.ai_model_released_by_organization USING btree (ai_model_id, organization_id, release_role)` |
| `ai_model_released_by_organization_pkey` | `CREATE UNIQUE INDEX ai_model_released_by_organization_pkey ON corpus.ai_model_released_by_organization USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

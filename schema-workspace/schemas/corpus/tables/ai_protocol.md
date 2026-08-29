---
schema: corpus
relation: ai_protocol
qualified_name: corpus.ai_protocol
kind: table
---

# corpus.ai_protocol

Database table corpus.ai_protocol.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["ai_protocol"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus ai_protocol corpus.ai_protocol id tenant_id slug name purpose governing_organization_id spec_repository_id status lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `name` | `text` | no | — | — |
| 5 | `purpose` | `text` | yes | — | — |
| 6 | `governing_organization_id` | `uuid` | yes | — | — |
| 7 | `spec_repository_id` | `uuid` | yes | — | — |
| 8 | `status` | `text` | yes | — | — |
| 9 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 10 | `merged_into_id` | `uuid` | yes | — | — |
| 11 | `created_by_receipt_id` | `uuid` | no | — | — |
| 12 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 13 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 14 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ai_protocol_status_check` | `check` | `CHECK (status = ANY (ARRAY['draft'::text, 'active'::text, 'deprecated'::text]))` | — |
| `ai_protocol_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `ai_protocol_governing_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (governing_organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `ai_protocol_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.ai_protocol(id)` | [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) |
| `ai_protocol_spec_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (spec_repository_id) REFERENCES corpus.repository(id)` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `ai_protocol_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `ai_protocol_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `ai_protocol_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `ai_protocol_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `ai_protocol_governing_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (governing_organization_id) REFERENCES corpus.organization(id)` |
| `ai_protocol_merged_into_id_fkey` | [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.ai_protocol(id)` |
| `ai_protocol_spec_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (spec_repository_id) REFERENCES corpus.repository(id)` |
| `ai_protocol_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) | `ai_protocol_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.ai_protocol(id)` |
| [`corpus.ai_protocol_version`](../../corpus/tables/ai_protocol_version.md) | `ai_protocol_version_ai_protocol_id_fkey` | `FOREIGN KEY (ai_protocol_id) REFERENCES corpus.ai_protocol(id) ON DELETE CASCADE` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_ai_protocol_id_fkey` | `FOREIGN KEY (ai_protocol_id) REFERENCES corpus.ai_protocol(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_ai_protocol_id_fkey` | `FOREIGN KEY (ai_protocol_id) REFERENCES corpus.ai_protocol(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `ai_protocol_pkey` | `CREATE UNIQUE INDEX ai_protocol_pkey ON corpus.ai_protocol USING btree (id)` |
| `ai_protocol_tenant_id_slug_key` | `CREATE UNIQUE INDEX ai_protocol_tenant_id_slug_key ON corpus.ai_protocol USING btree (tenant_id, slug)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

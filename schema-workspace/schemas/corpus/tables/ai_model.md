---
schema: corpus
relation: ai_model
qualified_name: corpus.ai_model
kind: table
---

# corpus.ai_model

Database table corpus.ai_model.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["ai_model"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus ai_model corpus.ai_model id tenant_id provider_organization_id model_slug family display_name modality model_kind openness lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `provider_organization_id` | `uuid` | no | — | — |
| 4 | `model_slug` | `text` | no | — | — |
| 5 | `family` | `text` | yes | — | — |
| 6 | `display_name` | `text` | no | — | — |
| 7 | `modality` | `text[]` | no | `'{}'::text[]` | — |
| 8 | `model_kind` | `text` | yes | — | — |
| 9 | `openness` | `text` | yes | — | — |
| 10 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 11 | `merged_into_id` | `uuid` | yes | — | — |
| 12 | `created_by_receipt_id` | `uuid` | no | — | — |
| 13 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 14 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 15 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ai_model_model_kind_check` | `check` | `CHECK (model_kind = ANY (ARRAY['foundation'::text, 'fine_tune'::text, 'distill'::text, 'embedding'::text, 'reranker'::text, 'moderation'::text, 'other'::text]))` | — |
| `ai_model_openness_check` | `check` | `CHECK (openness = ANY (ARRAY['proprietary'::text, 'open_weights'::text, 'open_source'::text]))` | — |
| `ai_model_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `ai_model_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.ai_model(id)` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) |
| `ai_model_provider_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (provider_organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `ai_model_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `ai_model_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `ai_model_provider_organization_id_model_slug_key` | `unique` | `UNIQUE (provider_organization_id, model_slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `ai_model_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `ai_model_merged_into_id_fkey` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.ai_model(id)` |
| `ai_model_provider_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (provider_organization_id) REFERENCES corpus.organization(id)` |
| `ai_model_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `ai_model_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.ai_model(id)` |
| [`corpus.ai_model_released_by_organization`](../../corpus/tables/ai_model_released_by_organization.md) | `ai_model_released_by_organization_ai_model_id_fkey` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` |
| [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) | `ai_model_version_ai_model_id_fkey` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_ai_model_id_fkey` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_ai_model_id_fkey` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_ai_model_id_fkey` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `ai_model_pkey` | `CREATE UNIQUE INDEX ai_model_pkey ON corpus.ai_model USING btree (id)` |
| `ai_model_provider_idx` | `CREATE INDEX ai_model_provider_idx ON corpus.ai_model USING btree (provider_organization_id)` |
| `ai_model_provider_organization_id_model_slug_key` | `CREATE UNIQUE INDEX ai_model_provider_organization_id_model_slug_key ON corpus.ai_model USING btree (provider_organization_id, model_slug)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

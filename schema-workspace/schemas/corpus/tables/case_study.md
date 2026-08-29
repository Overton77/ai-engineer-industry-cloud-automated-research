---
schema: corpus
relation: case_study
qualified_name: corpus.case_study
kind: table
---

# corpus.case_study

Database table corpus.case_study.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["case_study"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus case_study corpus.case_study id tenant_id slug title case_study_kind subject_organization_id subject_product_id published_on source_url summary structured_outcomes lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `title` | `text` | no | — | — |
| 5 | `case_study_kind` | `text` | no | `'implementation'::text` | — |
| 6 | `subject_organization_id` | `uuid` | yes | — | — |
| 7 | `subject_product_id` | `uuid` | yes | — | — |
| 8 | `published_on` | `date` | yes | — | — |
| 9 | `source_url` | `text` | yes | — | — |
| 10 | `summary` | `text` | yes | — | — |
| 11 | `structured_outcomes` | `jsonb` | no | `'{}'::jsonb` | — |
| 12 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 13 | `merged_into_id` | `uuid` | yes | — | — |
| 14 | `created_by_receipt_id` | `uuid` | no | — | — |
| 15 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 16 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 17 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `case_study_case_study_kind_check` | `check` | `CHECK (case_study_kind = ANY (ARRAY['implementation'::text, 'adoption'::text, 'migration'::text, 'benchmark'::text, 'incident'::text, 'business_outcome'::text, 'other'::text]))` | — |
| `case_study_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `case_study_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.case_study(id)` | [`corpus.case_study`](../../corpus/tables/case_study.md) |
| `case_study_subject_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (subject_organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `case_study_subject_product_id_fkey` | `foreign_key` | `FOREIGN KEY (subject_product_id) REFERENCES corpus.product(id)` | [`corpus.product`](../../corpus/tables/product.md) |
| `case_study_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `case_study_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `case_study_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `case_study_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `case_study_merged_into_id_fkey` | [`corpus.case_study`](../../corpus/tables/case_study.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.case_study(id)` |
| `case_study_subject_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (subject_organization_id) REFERENCES corpus.organization(id)` |
| `case_study_subject_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (subject_product_id) REFERENCES corpus.product(id)` |
| `case_study_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.case_study`](../../corpus/tables/case_study.md) | `case_study_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.case_study(id)` |
| [`evidence.claim_case_study`](../../evidence/tables/claim_case_study.md) | `claim_case_study_case_study_id_fkey` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_case_study_id_fkey` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_case_study_id_fkey` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_case_study_id_fkey` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `case_study_created_receipt_idx` | `CREATE INDEX case_study_created_receipt_idx ON corpus.case_study USING btree (created_by_receipt_id)` |
| `case_study_merged_into_idx` | `CREATE INDEX case_study_merged_into_idx ON corpus.case_study USING btree (merged_into_id) WHERE (merged_into_id IS NOT NULL)` |
| `case_study_organization_idx` | `CREATE INDEX case_study_organization_idx ON corpus.case_study USING btree (subject_organization_id) WHERE (subject_organization_id IS NOT NULL)` |
| `case_study_pkey` | `CREATE UNIQUE INDEX case_study_pkey ON corpus.case_study USING btree (id)` |
| `case_study_product_idx` | `CREATE INDEX case_study_product_idx ON corpus.case_study USING btree (subject_product_id) WHERE (subject_product_id IS NOT NULL)` |
| `case_study_tenant_id_slug_key` | `CREATE UNIQUE INDEX case_study_tenant_id_slug_key ON corpus.case_study USING btree (tenant_id, slug)` |
| `case_study_updated_receipt_idx` | `CREATE INDEX case_study_updated_receipt_idx ON corpus.case_study USING btree (updated_by_receipt_id) WHERE (updated_by_receipt_id IS NOT NULL)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

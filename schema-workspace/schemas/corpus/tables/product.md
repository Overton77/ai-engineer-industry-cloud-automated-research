---
schema: corpus
relation: product
qualified_name: corpus.product
kind: table
---

# corpus.product

Database table corpus.product.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["product"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus product corpus.product id tenant_id slug display_name product_kind vendor_organization_id launched_on homepage_url description lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `display_name` | `text` | no | — | — |
| 5 | `product_kind` | `text` | yes | — | — |
| 6 | `vendor_organization_id` | `uuid` | yes | — | — |
| 7 | `launched_on` | `date` | yes | — | — |
| 8 | `homepage_url` | `text` | yes | — | — |
| 9 | `description` | `text` | yes | — | — |
| 10 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 11 | `merged_into_id` | `uuid` | yes | — | — |
| 12 | `created_by_receipt_id` | `uuid` | no | — | — |
| 13 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 14 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 15 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `product_product_kind_check` | `check` | `CHECK (product_kind = ANY (ARRAY['ide'::text, 'chat_app'::text, 'api'::text, 'platform'::text, 'agent'::text, 'plugin'::text, 'service'::text, 'hardware'::text, 'other'::text]))` | — |
| `product_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.product(id)` | [`corpus.product`](../../corpus/tables/product.md) |
| `product_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `product_vendor_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (vendor_organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `product_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `product_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `product_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_merged_into_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.product(id)` |
| `product_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `product_vendor_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (vendor_organization_id) REFERENCES corpus.organization(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.case_study`](../../corpus/tables/case_study.md) | `case_study_subject_product_id_fkey` | `FOREIGN KEY (subject_product_id) REFERENCES corpus.product(id)` |
| [`corpus.mcp_server_wraps_product`](../../corpus/tables/mcp_server_wraps_product.md) | `mcp_server_wraps_product_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| [`corpus.organization_product_relationship`](../../corpus/tables/organization_product_relationship.md) | `organization_product_relationship_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| [`corpus.product`](../../corpus/tables/product.md) | `product_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.product(id)` |
| [`corpus.product_appeared_in_video`](../../corpus/tables/product_appeared_in_video.md) | `product_appeared_in_video_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| [`corpus.product_backed_by_repository`](../../corpus/tables/product_backed_by_repository.md) | `product_backed_by_repository_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| [`corpus.product_built_on_model_version`](../../corpus/tables/product_built_on_model_version.md) | `product_built_on_model_version_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| [`corpus.product_family_member`](../../corpus/tables/product_family_member.md) | `product_family_member_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| [`corpus.product_feature`](../../corpus/tables/product_feature.md) | `product_feature_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| [`corpus.product_implements_protocol_version`](../../corpus/tables/product_implements_protocol_version.md) | `product_implements_protocol_version_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| [`corpus.product_version`](../../corpus/tables/product_version.md) | `product_version_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| [`evidence.claim_product`](../../evidence/tables/claim_product.md) | `claim_product_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_product_id_fkey` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `product_pkey` | `CREATE UNIQUE INDEX product_pkey ON corpus.product USING btree (id)` |
| `product_tenant_id_slug_key` | `CREATE UNIQUE INDEX product_tenant_id_slug_key ON corpus.product USING btree (tenant_id, slug)` |
| `product_vendor_idx` | `CREATE INDEX product_vendor_idx ON corpus.product USING btree (vendor_organization_id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `product_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER product_set_updated_at BEFORE UPDATE ON corpus.product FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

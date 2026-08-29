---
schema: corpus
relation: organization
qualified_name: corpus.organization
kind: table
---

# corpus.organization

Database table corpus.organization.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["organization"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus organization corpus.organization id tenant_id slug legal_name display_name org_kind website_url founded_on description lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `legal_name` | `text` | yes | — | — |
| 5 | `display_name` | `text` | no | — | — |
| 6 | `org_kind` | `text` | yes | — | — |
| 7 | `website_url` | `text` | yes | — | — |
| 8 | `founded_on` | `date` | yes | — | — |
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
| `organization_org_kind_check` | `check` | `CHECK (org_kind = ANY (ARRAY['lab'::text, 'vendor'::text, 'foundation'::text, 'academic'::text, 'nonprofit'::text, 'community'::text, 'standards_body'::text, 'other'::text]))` | — |
| `organization_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `organization_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `organization_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `organization_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `organization_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `organization_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `organization_merged_into_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.organization(id)` |
| `organization_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `agent_skill_maintainer_organization_id_fkey` | `FOREIGN KEY (maintainer_organization_id) REFERENCES corpus.organization(id)` |
| [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `ai_model_provider_organization_id_fkey` | `FOREIGN KEY (provider_organization_id) REFERENCES corpus.organization(id)` |
| [`corpus.ai_model_released_by_organization`](../../corpus/tables/ai_model_released_by_organization.md) | `ai_model_released_by_organization_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) | `ai_protocol_governing_organization_id_fkey` | `FOREIGN KEY (governing_organization_id) REFERENCES corpus.organization(id)` |
| [`corpus.case_study`](../../corpus/tables/case_study.md) | `case_study_subject_organization_id_fkey` | `FOREIGN KEY (subject_organization_id) REFERENCES corpus.organization(id)` |
| [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `mcp_server_maintainer_organization_id_fkey` | `FOREIGN KEY (maintainer_organization_id) REFERENCES corpus.organization(id)` |
| [`corpus.organization`](../../corpus/tables/organization.md) | `organization_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.organization(id)` |
| [`corpus.organization_identifier`](../../corpus/tables/organization_identifier.md) | `organization_identifier_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| [`corpus.organization_product_relationship`](../../corpus/tables/organization_product_relationship.md) | `organization_product_relationship_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| [`corpus.organization_relationship`](../../corpus/tables/organization_relationship.md) | `organization_relationship_from_organization_id_fkey` | `FOREIGN KEY (from_organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| [`corpus.organization_relationship`](../../corpus/tables/organization_relationship.md) | `organization_relationship_to_organization_id_fkey` | `FOREIGN KEY (to_organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| [`corpus.paper_authored_by_person`](../../corpus/tables/paper_authored_by_person.md) | `paper_authored_by_person_affiliation_organization_id_fkey` | `FOREIGN KEY (affiliation_organization_id) REFERENCES corpus.organization(id)` |
| [`corpus.person`](../../corpus/tables/person.md) | `person_primary_organization_id_fkey` | `FOREIGN KEY (primary_organization_id) REFERENCES corpus.organization(id)` |
| [`corpus.person_employed_by_organization`](../../corpus/tables/person_employed_by_organization.md) | `person_employed_by_organization_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| [`corpus.person_founded_organization`](../../corpus/tables/person_founded_organization.md) | `person_founded_organization_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| [`corpus.product`](../../corpus/tables/product.md) | `product_vendor_organization_id_fkey` | `FOREIGN KEY (vendor_organization_id) REFERENCES corpus.organization(id)` |
| [`corpus.product_family`](../../corpus/tables/product_family.md) | `product_family_vendor_organization_id_fkey` | `FOREIGN KEY (vendor_organization_id) REFERENCES corpus.organization(id)` |
| [`corpus.repository_maintained_by_organization`](../../corpus/tables/repository_maintained_by_organization.md) | `repository_maintained_by_organization_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| [`evidence.claim_organization`](../../evidence/tables/claim_organization.md) | `claim_organization_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_organization_id_fkey` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `organization_pkey` | `CREATE UNIQUE INDEX organization_pkey ON corpus.organization USING btree (id)` |
| `organization_tenant_id_slug_key` | `CREATE UNIQUE INDEX organization_tenant_id_slug_key ON corpus.organization USING btree (tenant_id, slug)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `organization_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER organization_set_updated_at BEFORE UPDATE ON corpus.organization FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

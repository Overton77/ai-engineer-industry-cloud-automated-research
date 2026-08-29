---
schema: orchestration
relation: operation_receipt
qualified_name: orchestration.operation_receipt
kind: table
---

# orchestration.operation_receipt

Database table orchestration.operation_receipt.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["operation_receipt"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration operation_receipt orchestration.operation_receipt id intent_id executor_version precondition_results outcome changes_summary affected_refs applied_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `intent_id` | `uuid` | no | — | — |
| 3 | `executor_version` | `text` | no | — | — |
| 4 | `precondition_results` | `jsonb` | no | `'{}'::jsonb` | — |
| 5 | `outcome` | `text` | no | — | — |
| 6 | `changes_summary` | `jsonb` | no | `'{}'::jsonb` | — |
| 7 | `affected_refs` | `jsonb` | no | `'[]'::jsonb` | — |
| 8 | `applied_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `operation_receipt_outcome_check` | `check` | `CHECK (outcome = ANY (ARRAY['applied'::text, 'rejected'::text, 'noop'::text, 'partial'::text]))` | — |
| `operation_receipt_intent_id_fkey` | `foreign_key` | `FOREIGN KEY (intent_id) REFERENCES orchestration.operation_intent(id)` | [`orchestration.operation_intent`](../../orchestration/tables/operation_intent.md) |
| `operation_receipt_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `operation_receipt_intent_id_key` | `unique` | `UNIQUE (intent_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `operation_receipt_intent_id_fkey` | [`orchestration.operation_intent`](../../orchestration/tables/operation_intent.md) | `FOREIGN KEY (intent_id) REFERENCES orchestration.operation_intent(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `agent_skill_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `agent_skill_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.agent_skill_requires_mcp_server`](../../corpus/tables/agent_skill_requires_mcp_server.md) | `agent_skill_requires_mcp_server_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.agent_skill_targets_library`](../../corpus/tables/agent_skill_targets_library.md) | `agent_skill_targets_library_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.agent_skill_version`](../../corpus/tables/agent_skill_version.md) | `agent_skill_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `ai_model_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `ai_model_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.ai_model_availability_fact`](../../corpus/tables/ai_model_availability_fact.md) | `ai_model_availability_fact_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.ai_model_relationship`](../../corpus/tables/ai_model_relationship.md) | `ai_model_relationship_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.ai_model_released_by_organization`](../../corpus/tables/ai_model_released_by_organization.md) | `ai_model_released_by_organization_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) | `ai_model_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) | `ai_protocol_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) | `ai_protocol_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.ai_protocol_relationship`](../../corpus/tables/ai_protocol_relationship.md) | `ai_protocol_relationship_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.ai_protocol_version`](../../corpus/tables/ai_protocol_version.md) | `ai_protocol_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `benchmark_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `benchmark_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.benchmark_evaluates_model_version`](../../corpus/tables/benchmark_evaluates_model_version.md) | `benchmark_evaluates_model_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.benchmark_uses_dataset`](../../corpus/tables/benchmark_uses_dataset.md) | `benchmark_uses_dataset_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.case_study`](../../corpus/tables/case_study.md) | `case_study_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.case_study`](../../corpus/tables/case_study.md) | `case_study_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.case_study_references_benchmark`](../../corpus/tables/case_study_references_benchmark.md) | `case_study_references_benchmark_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.case_study_uses_library`](../../corpus/tables/case_study_uses_library.md) | `case_study_uses_library_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.case_study_uses_model_version`](../../corpus/tables/case_study_uses_model_version.md) | `case_study_uses_model_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.concept`](../../corpus/tables/concept.md) | `concept_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.concept`](../../corpus/tables/concept.md) | `concept_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.concept_alias`](../../corpus/tables/concept_alias.md) | `concept_alias_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.dataset`](../../corpus/tables/dataset.md) | `dataset_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.dataset`](../../corpus/tables/dataset.md) | `dataset_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.entity_merge`](../../corpus/tables/entity_merge.md) | `entity_merge_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.library`](../../corpus/tables/library.md) | `library_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.library`](../../corpus/tables/library.md) | `library_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.library_appeared_in_video`](../../corpus/tables/library_appeared_in_video.md) | `library_appeared_in_video_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.library_backed_by_repository`](../../corpus/tables/library_backed_by_repository.md) | `library_backed_by_repository_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.library_depends_on_library`](../../corpus/tables/library_depends_on_library.md) | `library_depends_on_library_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.library_implements_protocol_version`](../../corpus/tables/library_implements_protocol_version.md) | `library_implements_protocol_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.library_license_fact`](../../corpus/tables/library_license_fact.md) | `library_license_fact_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.library_maintained_by_person`](../../corpus/tables/library_maintained_by_person.md) | `library_maintained_by_person_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.library_maintenance_status_fact`](../../corpus/tables/library_maintenance_status_fact.md) | `library_maintenance_status_fact_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.library_supports_model_version`](../../corpus/tables/library_supports_model_version.md) | `library_supports_model_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `mcp_server_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `mcp_server_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.mcp_server_backed_by_repository`](../../corpus/tables/mcp_server_backed_by_repository.md) | `mcp_server_backed_by_repository_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.mcp_server_prompt`](../../corpus/tables/mcp_server_prompt.md) | `mcp_server_prompt_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.mcp_server_registry_status_fact`](../../corpus/tables/mcp_server_registry_status_fact.md) | `mcp_server_registry_status_fact_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.mcp_server_resource`](../../corpus/tables/mcp_server_resource.md) | `mcp_server_resource_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.mcp_server_tool`](../../corpus/tables/mcp_server_tool.md) | `mcp_server_tool_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.mcp_server_version`](../../corpus/tables/mcp_server_version.md) | `mcp_server_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.mcp_server_wraps_product`](../../corpus/tables/mcp_server_wraps_product.md) | `mcp_server_wraps_product_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.organization`](../../corpus/tables/organization.md) | `organization_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.organization`](../../corpus/tables/organization.md) | `organization_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.organization_identifier`](../../corpus/tables/organization_identifier.md) | `organization_identifier_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.organization_product_relationship`](../../corpus/tables/organization_product_relationship.md) | `organization_product_relationship_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.organization_relationship`](../../corpus/tables/organization_relationship.md) | `organization_relationship_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.paper`](../../corpus/tables/paper.md) | `paper_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.paper`](../../corpus/tables/paper.md) | `paper_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.paper_appeared_in_talk`](../../corpus/tables/paper_appeared_in_talk.md) | `paper_appeared_in_talk_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.paper_appeared_in_video`](../../corpus/tables/paper_appeared_in_video.md) | `paper_appeared_in_video_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.paper_authored_by_person`](../../corpus/tables/paper_authored_by_person.md) | `paper_authored_by_person_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.paper_introduces_model`](../../corpus/tables/paper_introduces_model.md) | `paper_introduces_model_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.paper_retraction_fact`](../../corpus/tables/paper_retraction_fact.md) | `paper_retraction_fact_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.person`](../../corpus/tables/person.md) | `person_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.person`](../../corpus/tables/person.md) | `person_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.person_appeared_in_video`](../../corpus/tables/person_appeared_in_video.md) | `person_appeared_in_video_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.person_created_agent_skill`](../../corpus/tables/person_created_agent_skill.md) | `person_created_agent_skill_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.person_created_mcp_server`](../../corpus/tables/person_created_mcp_server.md) | `person_created_mcp_server_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.person_employed_by_organization`](../../corpus/tables/person_employed_by_organization.md) | `person_employed_by_organization_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.person_founded_organization`](../../corpus/tables/person_founded_organization.md) | `person_founded_organization_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.person_identifier`](../../corpus/tables/person_identifier.md) | `person_identifier_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.person_presented_at_talk`](../../corpus/tables/person_presented_at_talk.md) | `person_presented_at_talk_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product`](../../corpus/tables/product.md) | `product_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product`](../../corpus/tables/product.md) | `product_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product_appeared_in_video`](../../corpus/tables/product_appeared_in_video.md) | `product_appeared_in_video_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product_backed_by_repository`](../../corpus/tables/product_backed_by_repository.md) | `product_backed_by_repository_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product_built_on_model_version`](../../corpus/tables/product_built_on_model_version.md) | `product_built_on_model_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product_family`](../../corpus/tables/product_family.md) | `product_family_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product_family`](../../corpus/tables/product_family.md) | `product_family_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product_family_member`](../../corpus/tables/product_family_member.md) | `product_family_member_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product_feature`](../../corpus/tables/product_feature.md) | `product_feature_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product_implements_protocol_version`](../../corpus/tables/product_implements_protocol_version.md) | `product_implements_protocol_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.product_version`](../../corpus/tables/product_version.md) | `product_version_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.repository`](../../corpus/tables/repository.md) | `repository_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.repository`](../../corpus/tables/repository.md) | `repository_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.repository_alias`](../../corpus/tables/repository_alias.md) | `repository_alias_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.repository_archival_fact`](../../corpus/tables/repository_archival_fact.md) | `repository_archival_fact_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.repository_implements_paper`](../../corpus/tables/repository_implements_paper.md) | `repository_implements_paper_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.repository_maintained_by_organization`](../../corpus/tables/repository_maintained_by_organization.md) | `repository_maintained_by_organizatio_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.talk`](../../corpus/tables/talk.md) | `talk_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.talk`](../../corpus/tables/talk.md) | `talk_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.talk_explains_concept`](../../corpus/tables/talk_explains_concept.md) | `talk_explains_concept_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.video`](../../corpus/tables/video.md) | `video_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`corpus.video`](../../corpus/tables/video.md) | `video_updated_by_receipt_id_fkey` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`evidence.claim`](../../evidence/tables/claim.md) | `claim_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_created_by_receipt_id_fkey` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `operation_receipt_applied_idx` | `CREATE INDEX operation_receipt_applied_idx ON orchestration.operation_receipt USING btree (applied_at DESC)` |
| `operation_receipt_intent_id_key` | `CREATE UNIQUE INDEX operation_receipt_intent_id_key ON orchestration.operation_receipt USING btree (intent_id)` |
| `operation_receipt_pkey` | `CREATE UNIQUE INDEX operation_receipt_pkey ON orchestration.operation_receipt USING btree (id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `operation_receipt_immutable` | `util.reject_mutation` | `CREATE TRIGGER operation_receipt_immutable BEFORE DELETE OR UPDATE ON orchestration.operation_receipt FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

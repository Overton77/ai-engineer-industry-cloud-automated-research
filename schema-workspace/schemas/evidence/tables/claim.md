---
schema: evidence
relation: claim
qualified_name: evidence.claim
kind: table
---

# evidence.claim

Database table evidence.claim.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim evidence.claim id tenant_id claim_type statement structured status composite atomized_from_id producer_attempt_id superseded_by_id created_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `claim_type` | `text` | no | — | — |
| 4 | `statement` | `text` | no | — | — |
| 5 | `structured` | `jsonb` | yes | — | — |
| 6 | `status` | `evidence.claim_status` | no | `'proposed'::evidence.claim_status` | — |
| 7 | `composite` | `boolean` | no | `false` | — |
| 8 | `atomized_from_id` | `uuid` | yes | — | — |
| 9 | `producer_attempt_id` | `uuid` | no | — | — |
| 10 | `superseded_by_id` | `uuid` | yes | — | — |
| 11 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 12 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 13 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_atomized_from_id_fkey` | `foreign_key` | `FOREIGN KEY (atomized_from_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_claim_type_fkey` | `foreign_key` | `FOREIGN KEY (claim_type) REFERENCES evidence.claim_type(code)` | [`evidence.claim_type`](../../evidence/tables/claim_type.md) |
| `claim_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `claim_producer_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (producer_attempt_id) REFERENCES orchestration.attempt(id)` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `claim_superseded_by_id_fkey` | `foreign_key` | `FOREIGN KEY (superseded_by_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_atomized_from_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (atomized_from_id) REFERENCES evidence.claim(id)` |
| `claim_claim_type_fkey` | [`evidence.claim_type`](../../evidence/tables/claim_type.md) | `FOREIGN KEY (claim_type) REFERENCES evidence.claim_type(code)` |
| `claim_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `claim_producer_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (producer_attempt_id) REFERENCES orchestration.attempt(id)` |
| `claim_superseded_by_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (superseded_by_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.agent_skill_requires_mcp_server`](../../corpus/tables/agent_skill_requires_mcp_server.md) | `agent_skill_requires_mcp_server_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.agent_skill_targets_library`](../../corpus/tables/agent_skill_targets_library.md) | `agent_skill_targets_library_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.ai_model_availability_fact`](../../corpus/tables/ai_model_availability_fact.md) | `ai_model_availability_fact_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.ai_model_relationship`](../../corpus/tables/ai_model_relationship.md) | `ai_model_relationship_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.ai_model_released_by_organization`](../../corpus/tables/ai_model_released_by_organization.md) | `ai_model_released_by_organization_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.ai_protocol_relationship`](../../corpus/tables/ai_protocol_relationship.md) | `ai_protocol_relationship_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.benchmark_evaluates_model_version`](../../corpus/tables/benchmark_evaluates_model_version.md) | `benchmark_evaluates_model_version_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.benchmark_uses_dataset`](../../corpus/tables/benchmark_uses_dataset.md) | `benchmark_uses_dataset_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.case_study_references_benchmark`](../../corpus/tables/case_study_references_benchmark.md) | `case_study_references_benchmark_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.case_study_uses_library`](../../corpus/tables/case_study_uses_library.md) | `case_study_uses_library_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.case_study_uses_model_version`](../../corpus/tables/case_study_uses_model_version.md) | `case_study_uses_model_version_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.library_appeared_in_video`](../../corpus/tables/library_appeared_in_video.md) | `library_appeared_in_video_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.library_backed_by_repository`](../../corpus/tables/library_backed_by_repository.md) | `library_backed_by_repository_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.library_depends_on_library`](../../corpus/tables/library_depends_on_library.md) | `library_depends_on_library_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.library_implements_protocol_version`](../../corpus/tables/library_implements_protocol_version.md) | `library_implements_protocol_version_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.library_license_fact`](../../corpus/tables/library_license_fact.md) | `library_license_fact_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.library_maintained_by_person`](../../corpus/tables/library_maintained_by_person.md) | `library_maintained_by_person_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.library_maintenance_status_fact`](../../corpus/tables/library_maintenance_status_fact.md) | `library_maintenance_status_fact_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.library_supports_model_version`](../../corpus/tables/library_supports_model_version.md) | `library_supports_model_version_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.mcp_server_backed_by_repository`](../../corpus/tables/mcp_server_backed_by_repository.md) | `mcp_server_backed_by_repository_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.mcp_server_registry_status_fact`](../../corpus/tables/mcp_server_registry_status_fact.md) | `mcp_server_registry_status_fact_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.mcp_server_wraps_product`](../../corpus/tables/mcp_server_wraps_product.md) | `mcp_server_wraps_product_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.organization_product_relationship`](../../corpus/tables/organization_product_relationship.md) | `organization_product_relationship_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.organization_relationship`](../../corpus/tables/organization_relationship.md) | `organization_relationship_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.paper_appeared_in_talk`](../../corpus/tables/paper_appeared_in_talk.md) | `paper_appeared_in_talk_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.paper_appeared_in_video`](../../corpus/tables/paper_appeared_in_video.md) | `paper_appeared_in_video_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.paper_authored_by_person`](../../corpus/tables/paper_authored_by_person.md) | `paper_authored_by_person_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.paper_introduces_model`](../../corpus/tables/paper_introduces_model.md) | `paper_introduces_model_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.paper_retraction_fact`](../../corpus/tables/paper_retraction_fact.md) | `paper_retraction_fact_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.person_appeared_in_video`](../../corpus/tables/person_appeared_in_video.md) | `person_appeared_in_video_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.person_created_agent_skill`](../../corpus/tables/person_created_agent_skill.md) | `person_created_agent_skill_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.person_created_mcp_server`](../../corpus/tables/person_created_mcp_server.md) | `person_created_mcp_server_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.person_employed_by_organization`](../../corpus/tables/person_employed_by_organization.md) | `person_employed_by_organization_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.person_founded_organization`](../../corpus/tables/person_founded_organization.md) | `person_founded_organization_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.person_presented_at_talk`](../../corpus/tables/person_presented_at_talk.md) | `person_presented_at_talk_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.product_appeared_in_video`](../../corpus/tables/product_appeared_in_video.md) | `product_appeared_in_video_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.product_backed_by_repository`](../../corpus/tables/product_backed_by_repository.md) | `product_backed_by_repository_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.product_built_on_model_version`](../../corpus/tables/product_built_on_model_version.md) | `product_built_on_model_version_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.product_family_member`](../../corpus/tables/product_family_member.md) | `product_family_member_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.product_feature`](../../corpus/tables/product_feature.md) | `product_feature_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.product_implements_protocol_version`](../../corpus/tables/product_implements_protocol_version.md) | `product_implements_protocol_version_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.repository_archival_fact`](../../corpus/tables/repository_archival_fact.md) | `repository_archival_fact_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.repository_implements_paper`](../../corpus/tables/repository_implements_paper.md) | `repository_implements_paper_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.repository_maintained_by_organization`](../../corpus/tables/repository_maintained_by_organization.md) | `repository_maintained_by_organization_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`corpus.talk_explains_concept`](../../corpus/tables/talk_explains_concept.md) | `talk_explains_concept_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`evidence.claim`](../../evidence/tables/claim.md) | `claim_atomized_from_id_fkey` | `FOREIGN KEY (atomized_from_id) REFERENCES evidence.claim(id)` |
| [`evidence.claim`](../../evidence/tables/claim.md) | `claim_superseded_by_id_fkey` | `FOREIGN KEY (superseded_by_id) REFERENCES evidence.claim(id)` |
| [`evidence.claim_agent_skill_version`](../../evidence/tables/claim_agent_skill_version.md) | `claim_agent_skill_version_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_ai_model_version`](../../evidence/tables/claim_ai_model_version.md) | `claim_ai_model_version_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_benchmark`](../../evidence/tables/claim_benchmark.md) | `claim_benchmark_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_case_study`](../../evidence/tables/claim_case_study.md) | `claim_case_study_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_concept`](../../evidence/tables/claim_concept.md) | `claim_concept_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_conflict`](../../evidence/tables/claim_conflict.md) | `claim_conflict_claim_a_id_fkey` | `FOREIGN KEY (claim_a_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_conflict`](../../evidence/tables/claim_conflict.md) | `claim_conflict_claim_b_id_fkey` | `FOREIGN KEY (claim_b_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_dataset`](../../evidence/tables/claim_dataset.md) | `claim_dataset_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_evidence_link`](../../evidence/tables/claim_evidence_link.md) | `claim_evidence_link_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_library`](../../evidence/tables/claim_library.md) | `claim_library_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_mcp_server_version`](../../evidence/tables/claim_mcp_server_version.md) | `claim_mcp_server_version_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_organization`](../../evidence/tables/claim_organization.md) | `claim_organization_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_paper`](../../evidence/tables/claim_paper.md) | `claim_paper_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_person`](../../evidence/tables/claim_person.md) | `claim_person_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_product`](../../evidence/tables/claim_product.md) | `claim_product_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_product_version`](../../evidence/tables/claim_product_version.md) | `claim_product_version_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_protocol_version`](../../evidence/tables/claim_protocol_version.md) | `claim_protocol_version_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_repository`](../../evidence/tables/claim_repository.md) | `claim_repository_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_talk`](../../evidence/tables/claim_talk.md) | `claim_talk_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_technical_record`](../../evidence/tables/claim_technical_record.md) | `claim_technical_record_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.claim_video`](../../evidence/tables/claim_video.md) | `claim_video_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`evidence.verification_finding`](../../evidence/tables/verification_finding.md) | `verification_finding_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`research.finding`](../../research/tables/finding.md) | `finding_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| [`research.report_claim`](../../research/tables/report_claim.md) | `report_claim_claim_id_fkey` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_provenance_claim_id_fkey` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `claim_pkey` | `CREATE UNIQUE INDEX claim_pkey ON evidence.claim USING btree (id)` |
| `claim_producer_idx` | `CREATE INDEX claim_producer_idx ON evidence.claim USING btree (producer_attempt_id)` |
| `claim_status_idx` | `CREATE INDEX claim_status_idx ON evidence.claim USING btree (status, created_at DESC)` |
| `claim_type_idx` | `CREATE INDEX claim_type_idx ON evidence.claim USING btree (claim_type)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `claim_content_provenance_immutable` | `util.reject_mutation` | `CREATE TRIGGER claim_content_provenance_immutable BEFORE UPDATE OF tenant_id, claim_type, statement, structured, composite, atomized_from_id, producer_attempt_id, created_by_receipt_id, created_at ON evidence.claim FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |
| `claim_reviewed_preserved` | `util.reject_mutation` | `CREATE TRIGGER claim_reviewed_preserved BEFORE DELETE ON evidence.claim FOR EACH ROW WHEN (old.status <> 'proposed'::evidence.claim_status) EXECUTE FUNCTION util.reject_mutation()` |
| `claim_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER claim_set_updated_at BEFORE UPDATE ON evidence.claim FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |
| `claim_verified_gate` | `evidence.enforce_verified_claim_gate` | `CREATE TRIGGER claim_verified_gate BEFORE INSERT OR UPDATE OF status ON evidence.claim FOR EACH ROW EXECUTE FUNCTION evidence.enforce_verified_claim_gate()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

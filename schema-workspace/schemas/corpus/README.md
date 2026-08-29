# corpus schema

Searchable inventory for `corpus`. Every relation has a dedicated file containing columns, constraints, inbound and outbound relationships, indexes, triggers, and RLS policies.

- Tables: 76
- Views: 0
- Functions: [0](functions.md)
- Enums: [0](enums.md)

## Tables

| Relation | Columns | RLS | Description |
| --- | --- | --- | --- |
| [`agent_skill`](tables/agent_skill.md) | 17 | enabled | — |
| [`agent_skill_requires_mcp_server`](tables/agent_skill_requires_mcp_server.md) | 12 | enabled | — |
| [`agent_skill_targets_library`](tables/agent_skill_targets_library.md) | 11 | enabled | — |
| [`agent_skill_version`](tables/agent_skill_version.md) | 8 | enabled | — |
| [`ai_model`](tables/ai_model.md) | 15 | enabled | — |
| [`ai_model_availability_fact`](tables/ai_model_availability_fact.md) | 11 | enabled | — |
| [`ai_model_relationship`](tables/ai_model_relationship.md) | 6 | enabled | — |
| [`ai_model_released_by_organization`](tables/ai_model_released_by_organization.md) | 11 | enabled | — |
| [`ai_model_version`](tables/ai_model_version.md) | 10 | enabled | — |
| [`ai_protocol`](tables/ai_protocol.md) | 14 | enabled | — |
| [`ai_protocol_relationship`](tables/ai_protocol_relationship.md) | 6 | enabled | — |
| [`ai_protocol_version`](tables/ai_protocol_version.md) | 9 | enabled | — |
| [`benchmark`](tables/benchmark.md) | 14 | enabled | — |
| [`benchmark_evaluates_model_version`](tables/benchmark_evaluates_model_version.md) | 6 | enabled | Semantic benchmark/model link only; quantitative results belong in ranking.metric_observation. |
| [`benchmark_uses_dataset`](tables/benchmark_uses_dataset.md) | 6 | enabled | — |
| [`case_study`](tables/case_study.md) | 17 | enabled | — |
| [`case_study_references_benchmark`](tables/case_study_references_benchmark.md) | 6 | enabled | — |
| [`case_study_uses_library`](tables/case_study_uses_library.md) | 6 | enabled | — |
| [`case_study_uses_model_version`](tables/case_study_uses_model_version.md) | 6 | enabled | — |
| [`concept`](tables/concept.md) | 12 | enabled | — |
| [`concept_alias`](tables/concept_alias.md) | 6 | enabled | — |
| [`dataset`](tables/dataset.md) | 14 | enabled | — |
| [`distribution_kind`](tables/distribution_kind.md) | 2 | enabled | — |
| [`entity_merge`](tables/entity_merge.md) | 7 | enabled | Merge history for canonical entities. The review that authorized a merge is found through evaluation.review_task.entity_merge_id, never by a column here -- corpus must not reference evaluation. |
| [`library`](tables/library.md) | 15 | enabled | — |
| [`library_appeared_in_video`](tables/library_appeared_in_video.md) | 12 | enabled | — |
| [`library_backed_by_repository`](tables/library_backed_by_repository.md) | 12 | enabled | — |
| [`library_depends_on_library`](tables/library_depends_on_library.md) | 12 | enabled | — |
| [`library_implements_protocol_version`](tables/library_implements_protocol_version.md) | 11 | enabled | — |
| [`library_license_fact`](tables/library_license_fact.md) | 11 | enabled | — |
| [`library_maintained_by_person`](tables/library_maintained_by_person.md) | 12 | enabled | — |
| [`library_maintenance_status_fact`](tables/library_maintenance_status_fact.md) | 11 | enabled | — |
| [`library_supports_model_version`](tables/library_supports_model_version.md) | 11 | enabled | — |
| [`mcp_server`](tables/mcp_server.md) | 18 | enabled | — |
| [`mcp_server_backed_by_repository`](tables/mcp_server_backed_by_repository.md) | 11 | enabled | — |
| [`mcp_server_prompt`](tables/mcp_server_prompt.md) | 7 | enabled | — |
| [`mcp_server_registry_status_fact`](tables/mcp_server_registry_status_fact.md) | 11 | enabled | — |
| [`mcp_server_resource`](tables/mcp_server_resource.md) | 7 | enabled | — |
| [`mcp_server_tool`](tables/mcp_server_tool.md) | 9 | enabled | — |
| [`mcp_server_version`](tables/mcp_server_version.md) | 9 | enabled | — |
| [`mcp_server_wraps_product`](tables/mcp_server_wraps_product.md) | 11 | enabled | — |
| [`organization`](tables/organization.md) | 15 | enabled | — |
| [`organization_identifier`](tables/organization_identifier.md) | 6 | enabled | — |
| [`organization_product_relationship`](tables/organization_product_relationship.md) | 9 | enabled | Many-to-many organization roles for products; product.vendor_organization_id remains the primary vendor shortcut. |
| [`organization_relationship`](tables/organization_relationship.md) | 8 | enabled | — |
| [`paper`](tables/paper.md) | 16 | enabled | — |
| [`paper_appeared_in_talk`](tables/paper_appeared_in_talk.md) | 11 | enabled | — |
| [`paper_appeared_in_video`](tables/paper_appeared_in_video.md) | 12 | enabled | — |
| [`paper_authored_by_person`](tables/paper_authored_by_person.md) | 13 | enabled | — |
| [`paper_introduces_model`](tables/paper_introduces_model.md) | 6 | enabled | — |
| [`paper_retraction_fact`](tables/paper_retraction_fact.md) | 12 | enabled | — |
| [`person`](tables/person.md) | 15 | enabled | — |
| [`person_appeared_in_video`](tables/person_appeared_in_video.md) | 12 | enabled | — |
| [`person_created_agent_skill`](tables/person_created_agent_skill.md) | 12 | enabled | — |
| [`person_created_mcp_server`](tables/person_created_mcp_server.md) | 12 | enabled | — |
| [`person_employed_by_organization`](tables/person_employed_by_organization.md) | 13 | enabled | — |
| [`person_founded_organization`](tables/person_founded_organization.md) | 12 | enabled | — |
| [`person_identifier`](tables/person_identifier.md) | 6 | enabled | — |
| [`person_presented_at_talk`](tables/person_presented_at_talk.md) | 12 | enabled | — |
| [`product`](tables/product.md) | 15 | enabled | — |
| [`product_appeared_in_video`](tables/product_appeared_in_video.md) | 12 | enabled | — |
| [`product_backed_by_repository`](tables/product_backed_by_repository.md) | 7 | enabled | — |
| [`product_built_on_model_version`](tables/product_built_on_model_version.md) | 11 | enabled | — |
| [`product_family`](tables/product_family.md) | 12 | enabled | — |
| [`product_family_member`](tables/product_family_member.md) | 7 | enabled | — |
| [`product_feature`](tables/product_feature.md) | 12 | enabled | — |
| [`product_implements_protocol_version`](tables/product_implements_protocol_version.md) | 12 | enabled | — |
| [`product_version`](tables/product_version.md) | 10 | enabled | — |
| [`repository`](tables/repository.md) | 16 | enabled | — |
| [`repository_alias`](tables/repository_alias.md) | 7 | enabled | — |
| [`repository_archival_fact`](tables/repository_archival_fact.md) | 11 | enabled | — |
| [`repository_implements_paper`](tables/repository_implements_paper.md) | 12 | enabled | — |
| [`repository_maintained_by_organization`](tables/repository_maintained_by_organization.md) | 8 | enabled | — |
| [`talk`](tables/talk.md) | 15 | enabled | — |
| [`talk_explains_concept`](tables/talk_explains_concept.md) | 11 | enabled | — |
| [`video`](tables/video.md) | 17 | enabled | — |

## Views

_None._

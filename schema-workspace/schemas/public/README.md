# public schema

Searchable inventory for `public`. Every relation has a dedicated file containing columns, constraints, inbound and outbound relationships, indexes, and RLS policies.

- Tables: 40
- Views: 0
- Functions: [3](functions.md)
- Enums: [17](enums.md)

## Tables

| Relation | Columns | RLS | Description |
| --- | --- | --- | --- |
| [`factory_artifact`](tables/factory_artifact.md) | 11 | enabled | — |
| [`factory_assertion_result`](tables/factory_assertion_result.md) | 11 | enabled | — |
| [`factory_canary_result`](tables/factory_canary_result.md) | 9 | enabled | — |
| [`factory_candidate`](tables/factory_candidate.md) | 11 | enabled | — |
| [`factory_component_version`](tables/factory_component_version.md) | 9 | enabled | — |
| [`factory_environment_version`](tables/factory_environment_version.md) | 11 | enabled | — |
| [`factory_episode`](tables/factory_episode.md) | 21 | enabled | Immutable-identity app-factory or optimization rollout. External artifacts and OTel traces are referenced by content hash. |
| [`factory_evolution_proposal`](tables/factory_evolution_proposal.md) | 14 | enabled | Bounded, evidence-backed proposal. The optimizer may propose a candidate but cannot alter verifier, reward, promotion, or production authority. |
| [`factory_experiment`](tables/factory_experiment.md) | 9 | enabled | — |
| [`factory_experiment_arm`](tables/factory_experiment_arm.md) | 8 | enabled | — |
| [`factory_failure_cluster`](tables/factory_failure_cluster.md) | 10 | enabled | — |
| [`factory_promotion_decision`](tables/factory_promotion_decision.md) | 11 | enabled | Independent signed promotion outcome with evidence and an explicit rollback target. |
| [`factory_runtime_event`](tables/factory_runtime_event.md) | 22 | enabled | Append-only, redacted copy of Eve root-agent durable stream events. Eve event ids provide idempotency; session ids bind events to factory episodes. |
| [`factory_score_vector`](tables/factory_score_vector.md) | 8 | enabled | — |
| [`factory_task`](tables/factory_task.md) | 12 | enabled | — |
| [`factory_trace_span_ref`](tables/factory_trace_span_ref.md) | 11 | enabled | — |
| [`research_application_domain`](tables/research_application_domain.md) | 6 | enabled | Evolving application-domain lookup. Not a Postgres enum. |
| [`research_category_definition`](tables/research_category_definition.md) | 8 | enabled | Per-version definitions for the stable engineering category enum. |
| [`research_entity_candidate`](tables/research_entity_candidate.md) | 11 | enabled | — |
| [`research_evidence_anchor`](tables/research_evidence_anchor.md) | 11 | enabled | — |
| [`research_ingestion_intent`](tables/research_ingestion_intent.md) | 14 | enabled | — |
| [`research_ingestion_intent_event`](tables/research_ingestion_intent_event.md) | 9 | enabled | — |
| [`research_organization_candidate`](tables/research_organization_candidate.md) | 24 | enabled | — |
| [`research_organization_domain_definition`](tables/research_organization_domain_definition.md) | 9 | enabled | — |
| [`research_organization_source`](tables/research_organization_source.md) | 16 | enabled | — |
| [`research_pre_research_artifact`](tables/research_pre_research_artifact.md) | 10 | enabled | — |
| [`research_pre_research_run`](tables/research_pre_research_run.md) | 27 | enabled | One claimable orchestration row per video+transcript-hash attempt. |
| [`research_pre_research_session`](tables/research_pre_research_session.md) | 11 | enabled | — |
| [`research_pre_research_stage_execution`](tables/research_pre_research_stage_execution.md) | 22 | enabled | — |
| [`research_pre_research_video_state`](tables/research_pre_research_video_state.md) | 15 | enabled | — |
| [`research_resource_candidate`](tables/research_resource_candidate.md) | 14 | enabled | — |
| [`research_starter_videos`](tables/research_starter_videos.md) | 28 | enabled | Raw AI Engineer channel catalog plus transcript storage pointers. Starter table for the research schema; relationship tables come later. |
| [`research_taxonomy_version`](tables/research_taxonomy_version.md) | 8 | enabled | Versioned AI engineering taxonomy. Exactly one row may be active. |
| [`research_video_analysis`](tables/research_video_analysis.md) | 21 | enabled | Immutable analysis packet for one completed pre-research run. |
| [`research_video_category`](tables/research_video_category.md) | 6 | enabled | Exactly one primary category and up to three secondary categories per analysis. |
| [`research_video_domain`](tables/research_video_domain.md) | 4 | enabled | — |
| [`research_video_initial_summary`](tables/research_video_initial_summary.md) | 10 | enabled | — |
| [`research_video_lifecycle`](tables/research_video_lifecycle.md) | 2 | enabled | — |
| [`research_video_technology_summary`](tables/research_video_technology_summary.md) | 20 | enabled | — |
| [`research_web_search_event`](tables/research_web_search_event.md) | 9 | enabled | — |

## Views

_None._

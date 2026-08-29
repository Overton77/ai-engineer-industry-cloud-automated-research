# evidence schema

Searchable inventory for `evidence`. Every relation has a dedicated file containing columns, constraints, inbound and outbound relationships, indexes, triggers, and RLS policies.

- Tables: 37
- Views: 0
- Functions: [6](functions.md)
- Enums: [2](enums.md)

## Tables

| Relation | Columns | RLS | Description |
| --- | --- | --- | --- |
| [`claim`](tables/claim.md) | 13 | enabled | — |
| [`claim_agent_skill_version`](tables/claim_agent_skill_version.md) | 4 | enabled | — |
| [`claim_ai_model_version`](tables/claim_ai_model_version.md) | 4 | enabled | — |
| [`claim_benchmark`](tables/claim_benchmark.md) | 4 | enabled | — |
| [`claim_case_study`](tables/claim_case_study.md) | 3 | enabled | — |
| [`claim_concept`](tables/claim_concept.md) | 4 | enabled | — |
| [`claim_conflict`](tables/claim_conflict.md) | 6 | enabled | — |
| [`claim_dataset`](tables/claim_dataset.md) | 4 | enabled | — |
| [`claim_evidence_assessment`](tables/claim_evidence_assessment.md) | 8 | enabled | Append-only, run-scoped verifier assessment of one immutable claim/evidence link. |
| [`claim_evidence_link`](tables/claim_evidence_link.md) | 8 | enabled | — |
| [`claim_library`](tables/claim_library.md) | 4 | enabled | — |
| [`claim_mcp_server_version`](tables/claim_mcp_server_version.md) | 4 | enabled | — |
| [`claim_organization`](tables/claim_organization.md) | 4 | enabled | — |
| [`claim_paper`](tables/claim_paper.md) | 4 | enabled | — |
| [`claim_person`](tables/claim_person.md) | 4 | enabled | — |
| [`claim_product`](tables/claim_product.md) | 4 | enabled | — |
| [`claim_product_version`](tables/claim_product_version.md) | 3 | enabled | Typed claim association for an exact SaaS or product release/version. |
| [`claim_protocol_version`](tables/claim_protocol_version.md) | 4 | enabled | — |
| [`claim_repository`](tables/claim_repository.md) | 4 | enabled | — |
| [`claim_talk`](tables/claim_talk.md) | 4 | enabled | — |
| [`claim_technical_record`](tables/claim_technical_record.md) | 14 | enabled | — |
| [`claim_type`](tables/claim_type.md) | 3 | enabled | — |
| [`claim_video`](tables/claim_video.md) | 4 | enabled | — |
| [`conflict_reconciliation`](tables/conflict_reconciliation.md) | 6 | enabled | — |
| [`degraded_assurance`](tables/degraded_assurance.md) | 8 | enabled | — |
| [`executable_verification`](tables/executable_verification.md) | 11 | enabled | — |
| [`extraction_signature`](tables/extraction_signature.md) | 5 | enabled | — |
| [`locator`](tables/locator.md) | 11 | enabled | — |
| [`revalidation_event`](tables/revalidation_event.md) | 6 | enabled | — |
| [`revalidation_policy`](tables/revalidation_policy.md) | 6 | enabled | — |
| [`source`](tables/source.md) | 13 | enabled | — |
| [`source_capture`](tables/source_capture.md) | 14 | enabled | — |
| [`source_query`](tables/source_query.md) | 12 | enabled | Operational source intelligence: exact query, provider parameters, raw response artifact, and intended work-item purpose. |
| [`source_retrieval`](tables/source_retrieval.md) | 13 | enabled | A query result or direct fetch, including cache outcome and the immutable capture when bytes were obtained. |
| [`source_support`](tables/source_support.md) | 9 | enabled | Why a retrieval mattered to an operation. This is an operational audit statement, not a canonical factual claim. |
| [`verification_finding`](tables/verification_finding.md) | 8 | enabled | — |
| [`verification_run`](tables/verification_run.md) | 6 | enabled | — |

## Views

_None._

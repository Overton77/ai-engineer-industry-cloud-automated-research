# Claim extraction and verification contract

## Extraction rows

Write in dependency order through an approved deterministic intent:

1. `evidence.source` identifies the publisher and canonical URL.
2. `evidence.source_capture` records immutable bytes, SHA-256, retrieval metadata, artifact, and producing attempt.
3. `evidence.locator` identifies the exact passage using the media-specific selector and selected-content hash.
4. `evidence.extraction_signature` hashes capture + locator + method + parameters + normalized output.
5. `evidence.claim` stores one atomic statement, `claim_type`, optional structured subject/predicate/object data, and the extractor attempt.
6. `evidence.claim_evidence_link` records the extractor's immutable relation between a claim and locator (`supports`, `contradicts`, `qualifies`, or `context`).
7. Typed association tables such as `claim_organization`, `claim_product`, `claim_product_version`, `claim_ai_model_version`, `claim_benchmark`, and `claim_case_study` bind entity arguments with the normalized `subject`, `object`, `context`, `qualifier`, or `comparison` roles.

Use the generated pages under `schema-workspace/schemas/evidence/tables/` for exact columns and constraints.

## Atomization

A claim is atomic when one verdict can be assigned without partially accepting it. Split conjunctions when they have different evidence or could receive different verdicts. Preserve qualifications in `structured`, including exact entity/version, predicate, comparison baseline, value/unit/aggregation, task/dataset/benchmark, geography/population/environment, valid time, and whether wording is quoted or paraphrased.

## Verification

Create one `evidence.verification_run` for the independent verifier attempt and a `verification_finding` for every reviewed claim. Recompute the capture hash and locator selection before judging semantics.

The verifier appends one `evidence.claim_evidence_assessment` per link and verification run with verdict, authority assessment, rationale, and replay result. Links and assessments are immutable; a later revalidation creates another run-scoped assessment.

Only a fully atomic claim with a same-run `directly_supported` finding and evidence assessment can move to `verified`. For `partially_supported` or `supported_with_qualification`, create a narrowed or superseding claim and verify that exact statement instead of promoting the original.

- `directly_supported`: evidence directly supports the complete scoped claim.
- `partially_supported`: only a properly identified portion is supported.
- `supported_with_qualification`: a narrower formulation is supported when the recorded qualification is applied.
- `context_only`: relevant but not evidence for the assertion.
- `contradicted`: reliable evidence conflicts with the assertion.
- `not_supported`: the cited material does not establish the assertion.
- `unverifiable`: required source, locator, identity, version, or semantics cannot be resolved.

Record source authority, independence, directness, freshness, methodology, and conflicts of interest in `authority_assessment`. A vendor is authoritative for its release date or documented API, but not independent proof of superiority or customer outcome.

## Completion payload

Return structured JSON containing mission/work-item/attempt identifiers, capture and locator hashes, extracted claim IDs, entity arguments, verifier deployment, per-claim verdict and rationale, conflicts opened, rejected ambiguities, and proposed intent/hash. Never claim independent verification when extractor and verifier share an agent deployment.

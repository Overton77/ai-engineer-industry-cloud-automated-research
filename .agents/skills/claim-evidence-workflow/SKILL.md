---
name: claim-evidence-workflow
description: Extract atomic factual claims from captured AI-industry sources and independently verify them with replayable locators, provenance, conflicts, and time-scoped verdicts. Use for claim extraction, evidence linking, fact checking, or verification work; not for unsupported summarization.
---

# Claim evidence workflow

Operate inside one mission and one claimed work item. Use immutable source captures as evidence; search results and snippets are discovery only.

## Choose one role

- **Extractor:** atomize source statements, create exact locators and extraction signatures, resolve candidate entity arguments, and propose claim/evidence rows.
- **Verifier:** independently replay extraction from registered captures, recompute hashes and locators, seek corroboration or contradiction, and record a verification run and findings.

One agent deployment must never perform both roles for the same claim. The database enforces this at `evidence.verification_finding`; if a combined request would violate independence, finish extraction and hand verification to a different deployment.

## Required behavior

1. Run mission preflight and inspect existing canonical identities before extraction.
2. Capture underlying bytes before interpretation. Preserve publication/event/observation/retrieval times separately.
3. Split composite prose into independently testable claims. Keep the original meaning, conditions, units, population, geography, version, and time window.
4. Attach at least one exact `evidence.locator` and its `evidence.extraction_signature` to every proposed claim. Use `context` evidence only for background, never as support.
5. Link every entity argument through the typed `evidence.claim_<entity>` tables. Do not silently merge ambiguous identities.
   Complete those associations while the claim is `proposed`; they are append-only once inserted.
6. Verification verdicts belong to immutable findings and evidence links; do not rewrite the extracted statement to make it pass.
   Claim text, structure, type, and producer provenance are immutable; corrections use atomized, narrowed, or superseding claims.
7. Treat vendor marketing as a claim source, not proof of the marketed outcome. Prefer independent or primary technical evidence appropriate to the claim type.
8. Fail closed as `unverifiable`, `not_supported`, or `contradicted` when the locator, identity, version, metric semantics, or source independence is insufficient.
9. Build deterministic ingestion intents, validate and dry-run them, and leave execution behind the separate approval boundary.

Read [workflow contract](references/workflow-contract.md) for row-level mappings, verdict rules, and the completion payload.

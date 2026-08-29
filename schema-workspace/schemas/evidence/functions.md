# evidence functions

| Function | Arguments | Returns | Volatility | Security | Description |
| --- | --- | --- | --- | --- | --- |
| `enforce_assessment_producer_not_verifier` | — | `trigger` | volatile | security invoker | — |
| `enforce_claim_association_proposed` | — | `trigger` | volatile | security invoker | Freezes typed claim meaning before review; later retargeting requires a superseding claim. |
| `enforce_claim_evidence_finalization` | — | `trigger` | volatile | security invoker | — |
| `enforce_producer_not_verifier` | — | `trigger` | volatile | security invoker | — |
| `enforce_verification_run_lifecycle` | — | `trigger` | volatile | security invoker | Makes verifier identity/policy immutable and permits exactly one completion timestamp transition. |
| `enforce_verified_claim_gate` | — | `trigger` | volatile | security invoker | Promotes only fully and directly supported atomic claims; partial or qualified results require a narrowed or superseding claim. |

---
schema: evidence
relation: claim_evidence_assessment
qualified_name: evidence.claim_evidence_assessment
kind: table
---

# evidence.claim_evidence_assessment

Append-only, run-scoped verifier assessment of one immutable claim/evidence link.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_evidence_assessment"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_evidence_assessment evidence.claim_evidence_assessment id claim_evidence_link_id run_id verdict authority_assessment rationale replay_signature_match created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `claim_evidence_link_id` | `uuid` | no | — | — |
| 3 | `run_id` | `uuid` | no | — | — |
| 4 | `verdict` | `evidence.support_verdict` | no | — | — |
| 5 | `authority_assessment` | `jsonb` | no | — | — |
| 6 | `rationale` | `text` | yes | — | — |
| 7 | `replay_signature_match` | `boolean` | no | — | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_evidence_assessment_claim_evidence_link_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_evidence_link_id) REFERENCES evidence.claim_evidence_link(id) ON DELETE CASCADE` | [`evidence.claim_evidence_link`](../../evidence/tables/claim_evidence_link.md) |
| `claim_evidence_assessment_run_id_fkey` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES evidence.verification_run(id) ON DELETE CASCADE` | [`evidence.verification_run`](../../evidence/tables/verification_run.md) |
| `claim_evidence_assessment_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `claim_evidence_assessment_claim_evidence_link_id_run_id_key` | `unique` | `UNIQUE (claim_evidence_link_id, run_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_evidence_assessment_claim_evidence_link_id_fkey` | [`evidence.claim_evidence_link`](../../evidence/tables/claim_evidence_link.md) | `FOREIGN KEY (claim_evidence_link_id) REFERENCES evidence.claim_evidence_link(id) ON DELETE CASCADE` |
| `claim_evidence_assessment_run_id_fkey` | [`evidence.verification_run`](../../evidence/tables/verification_run.md) | `FOREIGN KEY (run_id) REFERENCES evidence.verification_run(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_evidence_assessment_claim_evidence_link_id_run_id_key` | `CREATE UNIQUE INDEX claim_evidence_assessment_claim_evidence_link_id_run_id_key ON evidence.claim_evidence_assessment USING btree (claim_evidence_link_id, run_id)` |
| `claim_evidence_assessment_pkey` | `CREATE UNIQUE INDEX claim_evidence_assessment_pkey ON evidence.claim_evidence_assessment USING btree (id)` |
| `claim_evidence_assessment_run_idx` | `CREATE INDEX claim_evidence_assessment_run_idx ON evidence.claim_evidence_assessment USING btree (run_id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `claim_evidence_assessment_immutable` | `util.reject_mutation` | `CREATE TRIGGER claim_evidence_assessment_immutable BEFORE DELETE OR UPDATE ON evidence.claim_evidence_assessment FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |
| `claim_evidence_assessment_independence` | `evidence.enforce_assessment_producer_not_verifier` | `CREATE TRIGGER claim_evidence_assessment_independence BEFORE INSERT ON evidence.claim_evidence_assessment FOR EACH ROW EXECUTE FUNCTION evidence.enforce_assessment_producer_not_verifier()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

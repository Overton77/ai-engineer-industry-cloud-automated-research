---
schema: evidence
relation: verification_finding
qualified_name: evidence.verification_finding
kind: table
---

# evidence.verification_finding

Database table evidence.verification_finding.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["verification_finding"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence verification_finding evidence.verification_finding id run_id claim_id verdict rationale deterministic replay_signature_match created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `run_id` | `uuid` | no | — | — |
| 3 | `claim_id` | `uuid` | no | — | — |
| 4 | `verdict` | `evidence.support_verdict` | no | — | — |
| 5 | `rationale` | `text` | yes | — | — |
| 6 | `deterministic` | `boolean` | no | `false` | — |
| 7 | `replay_signature_match` | `boolean` | yes | — | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `verification_finding_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `verification_finding_run_id_fkey` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES evidence.verification_run(id) ON DELETE CASCADE` | [`evidence.verification_run`](../../evidence/tables/verification_run.md) |
| `verification_finding_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `verification_finding_run_id_claim_id_key` | `unique` | `UNIQUE (run_id, claim_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `verification_finding_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `verification_finding_run_id_fkey` | [`evidence.verification_run`](../../evidence/tables/verification_run.md) | `FOREIGN KEY (run_id) REFERENCES evidence.verification_run(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `verification_finding_pkey` | `CREATE UNIQUE INDEX verification_finding_pkey ON evidence.verification_finding USING btree (id)` |
| `verification_finding_run_id_claim_id_key` | `CREATE UNIQUE INDEX verification_finding_run_id_claim_id_key ON evidence.verification_finding USING btree (run_id, claim_id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `verification_finding_immutable` | `util.reject_mutation` | `CREATE TRIGGER verification_finding_immutable BEFORE DELETE OR UPDATE ON evidence.verification_finding FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |
| `verification_finding_independence` | `evidence.enforce_producer_not_verifier` | `CREATE TRIGGER verification_finding_independence BEFORE INSERT OR UPDATE ON evidence.verification_finding FOR EACH ROW EXECUTE FUNCTION evidence.enforce_producer_not_verifier()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

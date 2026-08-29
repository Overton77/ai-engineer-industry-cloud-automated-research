---
schema: evidence
relation: claim_evidence_link
qualified_name: evidence.claim_evidence_link
kind: table
---

# evidence.claim_evidence_link

Database table evidence.claim_evidence_link.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_evidence_link"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_evidence_link evidence.claim_evidence_link id claim_id locator_id role support_verdict authority_assessment verified_by_run_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `claim_id` | `uuid` | no | — | — |
| 3 | `locator_id` | `uuid` | no | — | — |
| 4 | `role` | `text` | no | — | — |
| 5 | `support_verdict` | `evidence.support_verdict` | yes | — | Legacy projection; new verification writes use evidence.claim_evidence_assessment. |
| 6 | `authority_assessment` | `jsonb` | yes | — | Legacy projection; new verification writes use evidence.claim_evidence_assessment. |
| 7 | `verified_by_run_id` | `uuid` | yes | — | Legacy projection; new verification writes use evidence.claim_evidence_assessment. |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_evidence_link_role_check` | `check` | `CHECK (role = ANY (ARRAY['supports'::text, 'contradicts'::text, 'qualifies'::text, 'context'::text]))` | — |
| `claim_evidence_link_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_evidence_link_locator_id_fkey` | `foreign_key` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` | [`evidence.locator`](../../evidence/tables/locator.md) |
| `claim_evidence_link_verified_by_run_id_fkey` | `foreign_key` | `FOREIGN KEY (verified_by_run_id) REFERENCES evidence.verification_run(id)` | [`evidence.verification_run`](../../evidence/tables/verification_run.md) |
| `claim_evidence_link_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `claim_evidence_link_claim_id_locator_id_role_key` | `unique` | `UNIQUE (claim_id, locator_id, role)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_evidence_link_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_evidence_link_locator_id_fkey` | [`evidence.locator`](../../evidence/tables/locator.md) | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| `claim_evidence_link_verified_by_run_id_fkey` | [`evidence.verification_run`](../../evidence/tables/verification_run.md) | `FOREIGN KEY (verified_by_run_id) REFERENCES evidence.verification_run(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.claim_evidence_assessment`](../../evidence/tables/claim_evidence_assessment.md) | `claim_evidence_assessment_claim_evidence_link_id_fkey` | `FOREIGN KEY (claim_evidence_link_id) REFERENCES evidence.claim_evidence_link(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `claim_evidence_link_claim_id_locator_id_role_key` | `CREATE UNIQUE INDEX claim_evidence_link_claim_id_locator_id_role_key ON evidence.claim_evidence_link USING btree (claim_id, locator_id, role)` |
| `claim_evidence_link_locator_idx` | `CREATE INDEX claim_evidence_link_locator_idx ON evidence.claim_evidence_link USING btree (locator_id)` |
| `claim_evidence_link_pkey` | `CREATE UNIQUE INDEX claim_evidence_link_pkey ON evidence.claim_evidence_link USING btree (id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `claim_evidence_link_immutable` | `util.reject_mutation` | `CREATE TRIGGER claim_evidence_link_immutable BEFORE DELETE OR UPDATE ON evidence.claim_evidence_link FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

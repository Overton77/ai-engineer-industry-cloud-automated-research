---
schema: evidence
relation: claim_concept
qualified_name: evidence.claim_concept
kind: table
---

# evidence.claim_concept

Database table evidence.claim_concept.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_concept"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_concept evidence.claim_concept claim_id concept_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `concept_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_concept_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text]))` | — |
| `claim_concept_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_concept_concept_id_fkey` | `foreign_key` | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` | [`corpus.concept`](../../corpus/tables/concept.md) |
| `claim_concept_pkey` | `primary_key` | `PRIMARY KEY (claim_id, concept_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_concept_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_concept_concept_id_fkey` | [`corpus.concept`](../../corpus/tables/concept.md) | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_concept_pkey` | `CREATE UNIQUE INDEX claim_concept_pkey ON evidence.claim_concept USING btree (claim_id, concept_id, role_in_claim)` |
| `claim_concept_target_idx` | `CREATE INDEX claim_concept_target_idx ON evidence.claim_concept USING btree (concept_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

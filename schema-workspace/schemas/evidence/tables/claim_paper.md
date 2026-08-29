---
schema: evidence
relation: claim_paper
qualified_name: evidence.claim_paper
kind: table
---

# evidence.claim_paper

Database table evidence.claim_paper.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_paper"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_paper evidence.claim_paper claim_id paper_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `paper_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_paper_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text]))` | — |
| `claim_paper_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_paper_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `claim_paper_pkey` | `primary_key` | `PRIMARY KEY (claim_id, paper_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_paper_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_paper_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_paper_pkey` | `CREATE UNIQUE INDEX claim_paper_pkey ON evidence.claim_paper USING btree (claim_id, paper_id, role_in_claim)` |
| `claim_paper_target_idx` | `CREATE INDEX claim_paper_target_idx ON evidence.claim_paper USING btree (paper_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

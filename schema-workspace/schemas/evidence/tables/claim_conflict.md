---
schema: evidence
relation: claim_conflict
qualified_name: evidence.claim_conflict
kind: table
---

# evidence.claim_conflict

Database table evidence.claim_conflict.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_conflict"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_conflict evidence.claim_conflict id claim_a_id claim_b_id conflict_kind detected_by detected_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `claim_a_id` | `uuid` | no | — | — |
| 3 | `claim_b_id` | `uuid` | no | — | — |
| 4 | `conflict_kind` | `text` | no | — | — |
| 5 | `detected_by` | `text` | no | — | — |
| 6 | `detected_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_conflict_conflict_kind_check` | `check` | `CHECK (conflict_kind = ANY (ARRAY['contradiction'::text, 'scope_mismatch'::text, 'staleness'::text, 'measurement'::text, 'definitional'::text]))` | — |
| `claim_conflict_distinct` | `check` | `CHECK (claim_a_id <> claim_b_id)` | — |
| `claim_conflict_claim_a_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_a_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_conflict_claim_b_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_b_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_conflict_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `claim_conflict_claim_a_id_claim_b_id_conflict_kind_key` | `unique` | `UNIQUE (claim_a_id, claim_b_id, conflict_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_conflict_claim_a_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_a_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_conflict_claim_b_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_b_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.conflict_reconciliation`](../../evidence/tables/conflict_reconciliation.md) | `conflict_reconciliation_conflict_id_fkey` | `FOREIGN KEY (conflict_id) REFERENCES evidence.claim_conflict(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `claim_conflict_claim_a_id_claim_b_id_conflict_kind_key` | `CREATE UNIQUE INDEX claim_conflict_claim_a_id_claim_b_id_conflict_kind_key ON evidence.claim_conflict USING btree (claim_a_id, claim_b_id, conflict_kind)` |
| `claim_conflict_pkey` | `CREATE UNIQUE INDEX claim_conflict_pkey ON evidence.claim_conflict USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

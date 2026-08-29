---
schema: evidence
relation: claim_ai_model_version
qualified_name: evidence.claim_ai_model_version
kind: table
---

# evidence.claim_ai_model_version

Database table evidence.claim_ai_model_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_ai_model_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_ai_model_version evidence.claim_ai_model_version claim_id ai_model_version_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `ai_model_version_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_ai_model_version_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text, 'comparison'::text]))` | — |
| `claim_ai_model_version_ai_model_version_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) |
| `claim_ai_model_version_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_ai_model_version_pkey` | `primary_key` | `PRIMARY KEY (claim_id, ai_model_version_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_ai_model_version_ai_model_version_id_fkey` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| `claim_ai_model_version_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_ai_model_version_pkey` | `CREATE UNIQUE INDEX claim_ai_model_version_pkey ON evidence.claim_ai_model_version USING btree (claim_id, ai_model_version_id, role_in_claim)` |
| `claim_ai_model_version_target_idx` | `CREATE INDEX claim_ai_model_version_target_idx ON evidence.claim_ai_model_version USING btree (ai_model_version_id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `claim_entity_association_immutable` | `util.reject_mutation` | `CREATE TRIGGER claim_entity_association_immutable BEFORE DELETE OR UPDATE ON evidence.claim_ai_model_version FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |
| `claim_entity_association_proposed` | `evidence.enforce_claim_association_proposed` | `CREATE TRIGGER claim_entity_association_proposed BEFORE INSERT ON evidence.claim_ai_model_version FOR EACH ROW EXECUTE FUNCTION evidence.enforce_claim_association_proposed()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

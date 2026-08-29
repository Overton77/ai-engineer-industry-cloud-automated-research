---
schema: evidence
relation: claim_talk
qualified_name: evidence.claim_talk
kind: table
---

# evidence.claim_talk

Database table evidence.claim_talk.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_talk"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_talk evidence.claim_talk claim_id talk_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `talk_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_talk_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text, 'comparison'::text]))` | — |
| `claim_talk_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_talk_talk_id_fkey` | `foreign_key` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` | [`corpus.talk`](../../corpus/tables/talk.md) |
| `claim_talk_pkey` | `primary_key` | `PRIMARY KEY (claim_id, talk_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_talk_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_talk_talk_id_fkey` | [`corpus.talk`](../../corpus/tables/talk.md) | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_talk_pkey` | `CREATE UNIQUE INDEX claim_talk_pkey ON evidence.claim_talk USING btree (claim_id, talk_id, role_in_claim)` |
| `claim_talk_target_idx` | `CREATE INDEX claim_talk_target_idx ON evidence.claim_talk USING btree (talk_id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `claim_entity_association_immutable` | `util.reject_mutation` | `CREATE TRIGGER claim_entity_association_immutable BEFORE DELETE OR UPDATE ON evidence.claim_talk FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |
| `claim_entity_association_proposed` | `evidence.enforce_claim_association_proposed` | `CREATE TRIGGER claim_entity_association_proposed BEFORE INSERT ON evidence.claim_talk FOR EACH ROW EXECUTE FUNCTION evidence.enforce_claim_association_proposed()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: evidence
relation: claim_agent_skill_version
qualified_name: evidence.claim_agent_skill_version
kind: table
---

# evidence.claim_agent_skill_version

Database table evidence.claim_agent_skill_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_agent_skill_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_agent_skill_version evidence.claim_agent_skill_version claim_id agent_skill_version_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `agent_skill_version_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_agent_skill_version_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text, 'comparison'::text]))` | — |
| `claim_agent_skill_version_agent_skill_version_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_skill_version_id) REFERENCES corpus.agent_skill_version(id) ON DELETE CASCADE` | [`corpus.agent_skill_version`](../../corpus/tables/agent_skill_version.md) |
| `claim_agent_skill_version_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_agent_skill_version_pkey` | `primary_key` | `PRIMARY KEY (claim_id, agent_skill_version_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_agent_skill_version_agent_skill_version_id_fkey` | [`corpus.agent_skill_version`](../../corpus/tables/agent_skill_version.md) | `FOREIGN KEY (agent_skill_version_id) REFERENCES corpus.agent_skill_version(id) ON DELETE CASCADE` |
| `claim_agent_skill_version_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_agent_skill_version_pkey` | `CREATE UNIQUE INDEX claim_agent_skill_version_pkey ON evidence.claim_agent_skill_version USING btree (claim_id, agent_skill_version_id, role_in_claim)` |
| `claim_agent_skill_version_target_idx` | `CREATE INDEX claim_agent_skill_version_target_idx ON evidence.claim_agent_skill_version USING btree (agent_skill_version_id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `claim_entity_association_immutable` | `util.reject_mutation` | `CREATE TRIGGER claim_entity_association_immutable BEFORE DELETE OR UPDATE ON evidence.claim_agent_skill_version FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |
| `claim_entity_association_proposed` | `evidence.enforce_claim_association_proposed` | `CREATE TRIGGER claim_entity_association_proposed BEFORE INSERT ON evidence.claim_agent_skill_version FOR EACH ROW EXECUTE FUNCTION evidence.enforce_claim_association_proposed()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

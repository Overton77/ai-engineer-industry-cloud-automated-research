---
schema: corpus
relation: person_created_agent_skill
qualified_name: corpus.person_created_agent_skill
kind: table
---

# corpus.person_created_agent_skill

Database table corpus.person_created_agent_skill.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["person_created_agent_skill"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus person_created_agent_skill corpus.person_created_agent_skill id person_id agent_skill_id role since valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `person_id` | `uuid` | no | — | — |
| 3 | `agent_skill_id` | `uuid` | no | — | — |
| 4 | `role` | `text` | no | `'creator'::text` | — |
| 5 | `since` | `date` | yes | — | — |
| 6 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 7 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 8 | `confidence` | `corpus.confidence` | yes | — | — |
| 9 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 10 | `provenance_claim_id` | `uuid` | yes | — | — |
| 11 | `created_by_receipt_id` | `uuid` | no | — | — |
| 12 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `person_created_agent_skill_role_check` | `check` | `CHECK (role = ANY (ARRAY['creator'::text, 'maintainer'::text, 'contributor'::text]))` | — |
| `person_created_agent_skill_agent_skill_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) |
| `person_created_agent_skill_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `person_created_agent_skill_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` | [`corpus.person`](../../corpus/tables/person.md) |
| `person_created_agent_skill_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `person_created_agent_skill_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `person_created_agent_skill_person_id_agent_skill_id_role_key` | `unique` | `UNIQUE (person_id, agent_skill_id, role)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `person_created_agent_skill_agent_skill_id_fkey` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` |
| `person_created_agent_skill_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `person_created_agent_skill_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| `person_created_agent_skill_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `person_created_agent_skill_person_id_agent_skill_id_role_key` | `CREATE UNIQUE INDEX person_created_agent_skill_person_id_agent_skill_id_role_key ON corpus.person_created_agent_skill USING btree (person_id, agent_skill_id, role)` |
| `person_created_agent_skill_pkey` | `CREATE UNIQUE INDEX person_created_agent_skill_pkey ON corpus.person_created_agent_skill USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

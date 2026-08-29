---
schema: corpus
relation: agent_skill_targets_library
qualified_name: corpus.agent_skill_targets_library
kind: table
---

# corpus.agent_skill_targets_library

Database table corpus.agent_skill_targets_library.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["agent_skill_targets_library"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus agent_skill_targets_library corpus.agent_skill_targets_library id agent_skill_id library_id relationship valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `agent_skill_id` | `uuid` | no | — | — |
| 3 | `library_id` | `uuid` | no | — | — |
| 4 | `relationship` | `text` | no | `'uses'::text` | — |
| 5 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 6 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 7 | `confidence` | `corpus.confidence` | yes | — | — |
| 8 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 9 | `provenance_claim_id` | `uuid` | yes | — | — |
| 10 | `created_by_receipt_id` | `uuid` | no | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `agent_skill_targets_library_relationship_check` | `check` | `CHECK (relationship = ANY (ARRAY['uses'::text, 'teaches'::text, 'wraps'::text, 'tests'::text]))` | — |
| `agent_skill_targets_library_agent_skill_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) |
| `agent_skill_targets_library_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `agent_skill_targets_library_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` | [`corpus.library`](../../corpus/tables/library.md) |
| `agent_skill_targets_library_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `agent_skill_targets_library_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `agent_skill_targets_library_agent_skill_id_library_id_relat_key` | `unique` | `UNIQUE (agent_skill_id, library_id, relationship)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `agent_skill_targets_library_agent_skill_id_fkey` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` |
| `agent_skill_targets_library_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `agent_skill_targets_library_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| `agent_skill_targets_library_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `agent_skill_targets_library_agent_skill_id_library_id_relat_key` | `CREATE UNIQUE INDEX agent_skill_targets_library_agent_skill_id_library_id_relat_key ON corpus.agent_skill_targets_library USING btree (agent_skill_id, library_id, relationship)` |
| `agent_skill_targets_library_pkey` | `CREATE UNIQUE INDEX agent_skill_targets_library_pkey ON corpus.agent_skill_targets_library USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

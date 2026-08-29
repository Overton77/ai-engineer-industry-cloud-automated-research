---
schema: corpus
relation: agent_skill_version
qualified_name: corpus.agent_skill_version
kind: table
---

# corpus.agent_skill_version

Database table corpus.agent_skill_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["agent_skill_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus agent_skill_version corpus.agent_skill_version id agent_skill_id version_label released_on manifest bundled_tooling created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `agent_skill_id` | `uuid` | no | — | — |
| 3 | `version_label` | `text` | no | — | — |
| 4 | `released_on` | `date` | yes | — | — |
| 5 | `manifest` | `jsonb` | yes | — | — |
| 6 | `bundled_tooling` | `jsonb` | yes | — | — |
| 7 | `created_by_receipt_id` | `uuid` | no | — | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `agent_skill_version_agent_skill_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) |
| `agent_skill_version_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `agent_skill_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `agent_skill_version_agent_skill_id_version_label_key` | `unique` | `UNIQUE (agent_skill_id, version_label)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `agent_skill_version_agent_skill_id_fkey` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` |
| `agent_skill_version_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.claim_agent_skill_version`](../../evidence/tables/claim_agent_skill_version.md) | `claim_agent_skill_version_agent_skill_version_id_fkey` | `FOREIGN KEY (agent_skill_version_id) REFERENCES corpus.agent_skill_version(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `agent_skill_version_agent_skill_id_version_label_key` | `CREATE UNIQUE INDEX agent_skill_version_agent_skill_id_version_label_key ON corpus.agent_skill_version USING btree (agent_skill_id, version_label)` |
| `agent_skill_version_pkey` | `CREATE UNIQUE INDEX agent_skill_version_pkey ON corpus.agent_skill_version USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

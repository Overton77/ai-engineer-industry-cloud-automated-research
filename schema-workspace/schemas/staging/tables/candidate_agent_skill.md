---
schema: staging
relation: candidate_agent_skill
qualified_name: staging.candidate_agent_skill
kind: table
---

# staging.candidate_agent_skill

Database table staging.candidate_agent_skill.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["candidate_agent_skill"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging candidate_agent_skill staging.candidate_agent_skill candidate_id candidate_kind name slug distribution repository_url skill_format`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `candidate_id` | `uuid` | no | — | — |
| 2 | `candidate_kind` | `text` | no | `'agent_skill'::text` | — |
| 3 | `name` | `text` | yes | — | — |
| 4 | `slug` | `text` | yes | — | — |
| 5 | `distribution` | `text` | yes | — | — |
| 6 | `repository_url` | `text` | yes | — | — |
| 7 | `skill_format` | `text` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `candidate_agent_skill_candidate_kind_check` | `check` | `CHECK (candidate_kind = 'agent_skill'::text)` | — |
| `candidate_agent_skill_candidate_id_candidate_kind_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_agent_skill_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `candidate_agent_skill_pkey` | `primary_key` | `PRIMARY KEY (candidate_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `candidate_agent_skill_candidate_id_candidate_kind_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| `candidate_agent_skill_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `candidate_agent_skill_pkey` | `CREATE UNIQUE INDEX candidate_agent_skill_pkey ON staging.candidate_agent_skill USING btree (candidate_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

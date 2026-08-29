---
schema: corpus
relation: agent_skill
qualified_name: corpus.agent_skill
kind: table
---

# corpus.agent_skill

Database table corpus.agent_skill.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["agent_skill"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus agent_skill corpus.agent_skill id tenant_id name slug distribution description skill_format format_version repository_id maintainer_organization_id license_spdx lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `name` | `text` | no | — | — |
| 4 | `slug` | `text` | yes | — | — |
| 5 | `distribution` | `text` | yes | — | — |
| 6 | `description` | `text` | yes | — | — |
| 7 | `skill_format` | `text` | yes | — | — |
| 8 | `format_version` | `text` | yes | — | — |
| 9 | `repository_id` | `uuid` | yes | — | — |
| 10 | `maintainer_organization_id` | `uuid` | yes | — | — |
| 11 | `license_spdx` | `text` | yes | — | — |
| 12 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 13 | `merged_into_id` | `uuid` | yes | — | — |
| 14 | `created_by_receipt_id` | `uuid` | no | — | — |
| 15 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 16 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 17 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `agent_skill_dist_pair` | `check` | `CHECK ((distribution IS NULL) = (slug IS NULL))` | — |
| `agent_skill_has_identity` | `check` | `CHECK (num_nonnulls(slug, repository_id) >= 1)` | — |
| `agent_skill_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `agent_skill_maintainer_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (maintainer_organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `agent_skill_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.agent_skill(id)` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) |
| `agent_skill_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `agent_skill_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `agent_skill_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `agent_skill_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `agent_skill_maintainer_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (maintainer_organization_id) REFERENCES corpus.organization(id)` |
| `agent_skill_merged_into_id_fkey` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.agent_skill(id)` |
| `agent_skill_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` |
| `agent_skill_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `agent_skill_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.agent_skill(id)` |
| [`corpus.agent_skill_requires_mcp_server`](../../corpus/tables/agent_skill_requires_mcp_server.md) | `agent_skill_requires_mcp_server_agent_skill_id_fkey` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` |
| [`corpus.agent_skill_targets_library`](../../corpus/tables/agent_skill_targets_library.md) | `agent_skill_targets_library_agent_skill_id_fkey` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` |
| [`corpus.agent_skill_version`](../../corpus/tables/agent_skill_version.md) | `agent_skill_version_agent_skill_id_fkey` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` |
| [`corpus.person_created_agent_skill`](../../corpus/tables/person_created_agent_skill.md) | `person_created_agent_skill_agent_skill_id_fkey` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_agent_skill_id_fkey` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_agent_skill_id_fkey` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_agent_skill_id_fkey` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_agent_skill_id_fkey` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `agent_skill_dist_uq` | `CREATE UNIQUE INDEX agent_skill_dist_uq ON corpus.agent_skill USING btree (distribution, slug) WHERE (slug IS NOT NULL)` |
| `agent_skill_pkey` | `CREATE UNIQUE INDEX agent_skill_pkey ON corpus.agent_skill USING btree (id)` |
| `agent_skill_repo_fk_idx` | `CREATE INDEX agent_skill_repo_fk_idx ON corpus.agent_skill USING btree (repository_id)` |
| `agent_skill_repo_uq` | `CREATE UNIQUE INDEX agent_skill_repo_uq ON corpus.agent_skill USING btree (repository_id) WHERE (repository_id IS NOT NULL)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `agent_skill_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER agent_skill_set_updated_at BEFORE UPDATE ON corpus.agent_skill FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

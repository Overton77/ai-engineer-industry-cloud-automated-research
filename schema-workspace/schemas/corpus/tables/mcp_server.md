---
schema: corpus
relation: mcp_server
qualified_name: corpus.mcp_server
kind: table
---

# corpus.mcp_server

Database table corpus.mcp_server.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["mcp_server"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus mcp_server corpus.mcp_server id tenant_id name description registry_id ecosystem package_name repository_id maintainer_organization_id distribution_kind transport_kinds license_spdx lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `name` | `text` | no | — | — |
| 4 | `description` | `text` | yes | — | — |
| 5 | `registry_id` | `text` | yes | — | — |
| 6 | `ecosystem` | `text` | yes | — | — |
| 7 | `package_name` | `text` | yes | — | — |
| 8 | `repository_id` | `uuid` | yes | — | — |
| 9 | `maintainer_organization_id` | `uuid` | yes | — | — |
| 10 | `distribution_kind` | `text` | no | — | — |
| 11 | `transport_kinds` | `text[]` | no | `'{}'::text[]` | — |
| 12 | `license_spdx` | `text` | yes | — | — |
| 13 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 14 | `merged_into_id` | `uuid` | yes | — | — |
| 15 | `created_by_receipt_id` | `uuid` | no | — | — |
| 16 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 17 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 18 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `mcp_server_has_identity` | `check` | `CHECK (num_nonnulls(registry_id, package_name, repository_id) >= 1)` | — |
| `mcp_server_pkg_pair` | `check` | `CHECK ((ecosystem IS NULL) = (package_name IS NULL))` | — |
| `mcp_server_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `mcp_server_distribution_kind_fkey` | `foreign_key` | `FOREIGN KEY (distribution_kind) REFERENCES corpus.distribution_kind(code)` | [`corpus.distribution_kind`](../../corpus/tables/distribution_kind.md) |
| `mcp_server_ecosystem_fkey` | `foreign_key` | `FOREIGN KEY (ecosystem) REFERENCES corpus.distribution_kind(code)` | [`corpus.distribution_kind`](../../corpus/tables/distribution_kind.md) |
| `mcp_server_maintainer_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (maintainer_organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `mcp_server_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.mcp_server(id)` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `mcp_server_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `mcp_server_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `mcp_server_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `mcp_server_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `mcp_server_distribution_kind_fkey` | [`corpus.distribution_kind`](../../corpus/tables/distribution_kind.md) | `FOREIGN KEY (distribution_kind) REFERENCES corpus.distribution_kind(code)` |
| `mcp_server_ecosystem_fkey` | [`corpus.distribution_kind`](../../corpus/tables/distribution_kind.md) | `FOREIGN KEY (ecosystem) REFERENCES corpus.distribution_kind(code)` |
| `mcp_server_maintainer_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (maintainer_organization_id) REFERENCES corpus.organization(id)` |
| `mcp_server_merged_into_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.mcp_server(id)` |
| `mcp_server_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` |
| `mcp_server_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.agent_skill_requires_mcp_server`](../../corpus/tables/agent_skill_requires_mcp_server.md) | `agent_skill_requires_mcp_server_mcp_server_id_fkey` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `mcp_server_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.mcp_server(id)` |
| [`corpus.mcp_server_backed_by_repository`](../../corpus/tables/mcp_server_backed_by_repository.md) | `mcp_server_backed_by_repository_mcp_server_id_fkey` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| [`corpus.mcp_server_registry_status_fact`](../../corpus/tables/mcp_server_registry_status_fact.md) | `mcp_server_registry_status_fact_mcp_server_id_fkey` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| [`corpus.mcp_server_version`](../../corpus/tables/mcp_server_version.md) | `mcp_server_version_mcp_server_id_fkey` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| [`corpus.mcp_server_wraps_product`](../../corpus/tables/mcp_server_wraps_product.md) | `mcp_server_wraps_product_mcp_server_id_fkey` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| [`corpus.person_created_mcp_server`](../../corpus/tables/person_created_mcp_server.md) | `person_created_mcp_server_mcp_server_id_fkey` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_mcp_server_id_fkey` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_mcp_server_id_fkey` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_mcp_server_id_fkey` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_mcp_server_id_fkey` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `mcp_server_maintainer_idx` | `CREATE INDEX mcp_server_maintainer_idx ON corpus.mcp_server USING btree (maintainer_organization_id)` |
| `mcp_server_package_uq` | `CREATE UNIQUE INDEX mcp_server_package_uq ON corpus.mcp_server USING btree (ecosystem, package_name) WHERE (package_name IS NOT NULL)` |
| `mcp_server_pkey` | `CREATE UNIQUE INDEX mcp_server_pkey ON corpus.mcp_server USING btree (id)` |
| `mcp_server_registry_uq` | `CREATE UNIQUE INDEX mcp_server_registry_uq ON corpus.mcp_server USING btree (registry_id) WHERE (registry_id IS NOT NULL)` |
| `mcp_server_repo_fk_idx` | `CREATE INDEX mcp_server_repo_fk_idx ON corpus.mcp_server USING btree (repository_id)` |
| `mcp_server_repo_uq` | `CREATE UNIQUE INDEX mcp_server_repo_uq ON corpus.mcp_server USING btree (repository_id) WHERE (repository_id IS NOT NULL)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

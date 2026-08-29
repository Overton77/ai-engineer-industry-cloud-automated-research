---
schema: corpus
relation: repository
qualified_name: corpus.repository
kind: table
---

# corpus.repository

Database table corpus.repository.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["repository"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus repository corpus.repository id tenant_id host owner name default_branch primary_language is_fork description created_at_host lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `host` | `text` | no | — | — |
| 4 | `owner` | `text` | no | — | — |
| 5 | `name` | `text` | no | — | — |
| 6 | `default_branch` | `text` | yes | — | — |
| 7 | `primary_language` | `text` | yes | — | — |
| 8 | `is_fork` | `boolean` | no | `false` | — |
| 9 | `description` | `text` | yes | — | — |
| 10 | `created_at_host` | `timestamp with time zone` | yes | — | — |
| 11 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 12 | `merged_into_id` | `uuid` | yes | — | — |
| 13 | `created_by_receipt_id` | `uuid` | no | — | — |
| 14 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 15 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 16 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `repository_host_check` | `check` | `CHECK (host = ANY (ARRAY['github'::text, 'gitlab'::text, 'bitbucket'::text, 'codeberg'::text, 'sourcehut'::text, 'other'::text]))` | — |
| `repository_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `repository_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.repository(id)` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `repository_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `repository_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `repository_host_owner_name_key` | `unique` | `UNIQUE (host, owner, name)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `repository_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `repository_merged_into_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.repository(id)` |
| `repository_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `agent_skill_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` |
| [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) | `ai_protocol_spec_repository_id_fkey` | `FOREIGN KEY (spec_repository_id) REFERENCES corpus.repository(id)` |
| [`corpus.library_backed_by_repository`](../../corpus/tables/library_backed_by_repository.md) | `library_backed_by_repository_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |
| [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `mcp_server_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` |
| [`corpus.mcp_server_backed_by_repository`](../../corpus/tables/mcp_server_backed_by_repository.md) | `mcp_server_backed_by_repository_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |
| [`corpus.product_backed_by_repository`](../../corpus/tables/product_backed_by_repository.md) | `product_backed_by_repository_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |
| [`corpus.repository`](../../corpus/tables/repository.md) | `repository_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.repository(id)` |
| [`corpus.repository_alias`](../../corpus/tables/repository_alias.md) | `repository_alias_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |
| [`corpus.repository_archival_fact`](../../corpus/tables/repository_archival_fact.md) | `repository_archival_fact_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |
| [`corpus.repository_implements_paper`](../../corpus/tables/repository_implements_paper.md) | `repository_implements_paper_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |
| [`corpus.repository_maintained_by_organization`](../../corpus/tables/repository_maintained_by_organization.md) | `repository_maintained_by_organization_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |
| [`evidence.claim_repository`](../../evidence/tables/claim_repository.md) | `claim_repository_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_repository_id_fkey` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `repository_host_owner_name_key` | `CREATE UNIQUE INDEX repository_host_owner_name_key ON corpus.repository USING btree (host, owner, name)` |
| `repository_pkey` | `CREATE UNIQUE INDEX repository_pkey ON corpus.repository USING btree (id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `repository_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER repository_set_updated_at BEFORE UPDATE ON corpus.repository FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

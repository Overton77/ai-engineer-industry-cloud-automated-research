---
schema: corpus
relation: library
qualified_name: corpus.library
kind: table
---

# corpus.library

Database table corpus.library.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["library"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus library corpus.library id tenant_id ecosystem package_name display_name description primary_language homepage_url first_released_on lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `ecosystem` | `text` | no | — | — |
| 4 | `package_name` | `text` | no | — | — |
| 5 | `display_name` | `text` | yes | — | — |
| 6 | `description` | `text` | yes | — | — |
| 7 | `primary_language` | `text` | yes | — | — |
| 8 | `homepage_url` | `text` | yes | — | — |
| 9 | `first_released_on` | `date` | yes | — | — |
| 10 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 11 | `merged_into_id` | `uuid` | yes | — | — |
| 12 | `created_by_receipt_id` | `uuid` | no | — | — |
| 13 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 14 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 15 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `library_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `library_ecosystem_fkey` | `foreign_key` | `FOREIGN KEY (ecosystem) REFERENCES corpus.distribution_kind(code)` | [`corpus.distribution_kind`](../../corpus/tables/distribution_kind.md) |
| `library_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.library(id)` | [`corpus.library`](../../corpus/tables/library.md) |
| `library_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `library_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `library_ecosystem_package_name_key` | `unique` | `UNIQUE (ecosystem, package_name)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `library_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `library_ecosystem_fkey` | [`corpus.distribution_kind`](../../corpus/tables/distribution_kind.md) | `FOREIGN KEY (ecosystem) REFERENCES corpus.distribution_kind(code)` |
| `library_merged_into_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.library(id)` |
| `library_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.agent_skill_targets_library`](../../corpus/tables/agent_skill_targets_library.md) | `agent_skill_targets_library_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`corpus.library`](../../corpus/tables/library.md) | `library_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.library(id)` |
| [`corpus.library_appeared_in_video`](../../corpus/tables/library_appeared_in_video.md) | `library_appeared_in_video_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`corpus.library_backed_by_repository`](../../corpus/tables/library_backed_by_repository.md) | `library_backed_by_repository_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`corpus.library_depends_on_library`](../../corpus/tables/library_depends_on_library.md) | `library_depends_on_library_depends_on_id_fkey` | `FOREIGN KEY (depends_on_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`corpus.library_depends_on_library`](../../corpus/tables/library_depends_on_library.md) | `library_depends_on_library_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`corpus.library_implements_protocol_version`](../../corpus/tables/library_implements_protocol_version.md) | `library_implements_protocol_version_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`corpus.library_license_fact`](../../corpus/tables/library_license_fact.md) | `library_license_fact_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`corpus.library_maintained_by_person`](../../corpus/tables/library_maintained_by_person.md) | `library_maintained_by_person_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`corpus.library_maintenance_status_fact`](../../corpus/tables/library_maintenance_status_fact.md) | `library_maintenance_status_fact_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`corpus.library_supports_model_version`](../../corpus/tables/library_supports_model_version.md) | `library_supports_model_version_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`evidence.claim_library`](../../evidence/tables/claim_library.md) | `claim_library_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_library_id_fkey` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `library_ecosystem_package_name_key` | `CREATE UNIQUE INDEX library_ecosystem_package_name_key ON corpus.library USING btree (ecosystem, package_name)` |
| `library_pkey` | `CREATE UNIQUE INDEX library_pkey ON corpus.library USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

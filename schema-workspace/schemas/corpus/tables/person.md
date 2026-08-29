---
schema: corpus
relation: person
qualified_name: corpus.person
kind: table
---

# corpus.person

Database table corpus.person.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["person"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus person corpus.person id tenant_id slug display_name given_name family_name headline primary_role primary_organization_id lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `display_name` | `text` | no | — | — |
| 5 | `given_name` | `text` | yes | — | — |
| 6 | `family_name` | `text` | yes | — | — |
| 7 | `headline` | `text` | yes | — | — |
| 8 | `primary_role` | `text` | yes | — | — |
| 9 | `primary_organization_id` | `uuid` | yes | — | — |
| 10 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 11 | `merged_into_id` | `uuid` | yes | — | — |
| 12 | `created_by_receipt_id` | `uuid` | no | — | — |
| 13 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 14 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 15 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `person_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `person_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.person(id)` | [`corpus.person`](../../corpus/tables/person.md) |
| `person_primary_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (primary_organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `person_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `person_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `person_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `person_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `person_merged_into_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.person(id)` |
| `person_primary_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (primary_organization_id) REFERENCES corpus.organization(id)` |
| `person_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.library_maintained_by_person`](../../corpus/tables/library_maintained_by_person.md) | `library_maintained_by_person_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| [`corpus.paper_authored_by_person`](../../corpus/tables/paper_authored_by_person.md) | `paper_authored_by_person_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| [`corpus.person`](../../corpus/tables/person.md) | `person_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.person(id)` |
| [`corpus.person_appeared_in_video`](../../corpus/tables/person_appeared_in_video.md) | `person_appeared_in_video_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| [`corpus.person_created_agent_skill`](../../corpus/tables/person_created_agent_skill.md) | `person_created_agent_skill_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| [`corpus.person_created_mcp_server`](../../corpus/tables/person_created_mcp_server.md) | `person_created_mcp_server_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| [`corpus.person_employed_by_organization`](../../corpus/tables/person_employed_by_organization.md) | `person_employed_by_organization_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| [`corpus.person_founded_organization`](../../corpus/tables/person_founded_organization.md) | `person_founded_organization_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| [`corpus.person_identifier`](../../corpus/tables/person_identifier.md) | `person_identifier_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| [`corpus.person_presented_at_talk`](../../corpus/tables/person_presented_at_talk.md) | `person_presented_at_talk_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| [`evidence.claim_person`](../../evidence/tables/claim_person.md) | `claim_person_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_person_id_fkey` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `person_pkey` | `CREATE UNIQUE INDEX person_pkey ON corpus.person USING btree (id)` |
| `person_primary_org_idx` | `CREATE INDEX person_primary_org_idx ON corpus.person USING btree (primary_organization_id)` |
| `person_tenant_id_slug_key` | `CREATE UNIQUE INDEX person_tenant_id_slug_key ON corpus.person USING btree (tenant_id, slug)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `person_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER person_set_updated_at BEFORE UPDATE ON corpus.person FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

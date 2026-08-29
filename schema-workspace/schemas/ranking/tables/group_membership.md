---
schema: ranking
relation: group_membership
qualified_name: ranking.group_membership
kind: table
---

# ranking.group_membership

Database table ranking.group_membership.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["group_membership"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking group_membership ranking.group_membership id group_version_id library_id repository_id person_id organization_id paper_id video_id ai_model_version_id mcp_server_id agent_skill_id product_id entity_kind valid_from valid_to provenance_claim_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `group_version_id` | `uuid` | no | — | — |
| 3 | `library_id` | `uuid` | yes | — | — |
| 4 | `repository_id` | `uuid` | yes | — | — |
| 5 | `person_id` | `uuid` | yes | — | — |
| 6 | `organization_id` | `uuid` | yes | — | — |
| 7 | `paper_id` | `uuid` | yes | — | — |
| 8 | `video_id` | `uuid` | yes | — | — |
| 9 | `ai_model_version_id` | `uuid` | yes | — | — |
| 10 | `mcp_server_id` | `uuid` | yes | — | — |
| 11 | `agent_skill_id` | `uuid` | yes | — | — |
| 12 | `product_id` | `uuid` | yes | — | — |
| 13 | `entity_kind` | `text` | yes | ` CASE     WHEN (library_id IS NOT NULL) THEN 'library'::text     WHEN (repository_id IS NOT NULL) THEN 'repository'::text     WHEN (person_id IS NOT NULL) THEN 'person'::text     WHEN (organization_id IS NOT NULL) THEN 'organization'::text     WHEN (paper_id IS NOT NULL) THEN 'paper'::text     WHEN (video_id IS NOT NULL) THEN 'video'::text     WHEN (ai_model_version_id IS NOT NULL) THEN 'ai_model_version'::text     WHEN (mcp_server_id IS NOT NULL) THEN 'mcp_server'::text     WHEN (agent_skill_id IS NOT NULL) THEN 'agent_skill'::text     WHEN (product_id IS NOT NULL) THEN 'product'::text     ELSE NULL::text END` | — |
| 14 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 15 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 16 | `provenance_claim_id` | `uuid` | yes | — | — |
| 17 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `group_membership_exactly_one_entity` | `check` | `CHECK (num_nonnulls(library_id, repository_id, person_id, organization_id, paper_id, video_id, ai_model_version_id, mcp_server_id, agent_skill_id, product_id) = 1)` | — |
| `group_membership_agent_skill_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id)` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) |
| `group_membership_ai_model_version_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id)` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) |
| `group_membership_group_version_id_fkey` | `foreign_key` | `FOREIGN KEY (group_version_id) REFERENCES ranking.entity_group_version(id) ON DELETE CASCADE` | [`ranking.entity_group_version`](../../ranking/tables/entity_group_version.md) |
| `group_membership_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id)` | [`corpus.library`](../../corpus/tables/library.md) |
| `group_membership_mcp_server_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id)` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `group_membership_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `group_membership_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id)` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `group_membership_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id)` | [`corpus.person`](../../corpus/tables/person.md) |
| `group_membership_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id)` | [`corpus.product`](../../corpus/tables/product.md) |
| `group_membership_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `group_membership_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `group_membership_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id)` | [`corpus.video`](../../corpus/tables/video.md) |
| `group_membership_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `group_membership_agent_skill_id_fkey` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id)` |
| `group_membership_ai_model_version_id_fkey` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id)` |
| `group_membership_group_version_id_fkey` | [`ranking.entity_group_version`](../../ranking/tables/entity_group_version.md) | `FOREIGN KEY (group_version_id) REFERENCES ranking.entity_group_version(id) ON DELETE CASCADE` |
| `group_membership_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id)` |
| `group_membership_mcp_server_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id)` |
| `group_membership_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id)` |
| `group_membership_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id)` |
| `group_membership_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id)` |
| `group_membership_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id)` |
| `group_membership_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `group_membership_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` |
| `group_membership_video_id_fkey` | [`corpus.video`](../../corpus/tables/video.md) | `FOREIGN KEY (video_id) REFERENCES corpus.video(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `group_membership_pkey` | `CREATE UNIQUE INDEX group_membership_pkey ON ranking.group_membership USING btree (id)` |
| `group_membership_version_idx` | `CREATE INDEX group_membership_version_idx ON ranking.group_membership USING btree (group_version_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

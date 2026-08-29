---
schema: staging
relation: identity_match
qualified_name: staging.identity_match
kind: table
---

# staging.identity_match

Database table staging.identity_match.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["identity_match"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging identity_match staging.identity_match id candidate_id organization_id person_id library_id repository_id paper_id talk_id video_id product_id concept_id dataset_id benchmark_id ai_model_id ai_protocol_id mcp_server_id agent_skill_id match_method score decided created_at case_study_id target_kind`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `candidate_id` | `uuid` | no | — | — |
| 3 | `organization_id` | `uuid` | yes | — | — |
| 4 | `person_id` | `uuid` | yes | — | — |
| 5 | `library_id` | `uuid` | yes | — | — |
| 6 | `repository_id` | `uuid` | yes | — | — |
| 7 | `paper_id` | `uuid` | yes | — | — |
| 8 | `talk_id` | `uuid` | yes | — | — |
| 9 | `video_id` | `uuid` | yes | — | — |
| 10 | `product_id` | `uuid` | yes | — | — |
| 11 | `concept_id` | `uuid` | yes | — | — |
| 12 | `dataset_id` | `uuid` | yes | — | — |
| 13 | `benchmark_id` | `uuid` | yes | — | — |
| 14 | `ai_model_id` | `uuid` | yes | — | — |
| 15 | `ai_protocol_id` | `uuid` | yes | — | — |
| 16 | `mcp_server_id` | `uuid` | yes | — | — |
| 17 | `agent_skill_id` | `uuid` | yes | — | — |
| 19 | `match_method` | `text` | no | — | — |
| 20 | `score` | `corpus.confidence` | yes | — | — |
| 21 | `decided` | `boolean` | no | `false` | — |
| 22 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 23 | `case_study_id` | `uuid` | yes | — | — |
| 24 | `target_kind` | `text` | yes | ` CASE     WHEN (organization_id IS NOT NULL) THEN 'organization'::text     WHEN (person_id IS NOT NULL) THEN 'person'::text     WHEN (library_id IS NOT NULL) THEN 'library'::text     WHEN (repository_id IS NOT NULL) THEN 'repository'::text     WHEN (paper_id IS NOT NULL) THEN 'paper'::text     WHEN (talk_id IS NOT NULL) THEN 'talk'::text     WHEN (video_id IS NOT NULL) THEN 'video'::text     WHEN (product_id IS NOT NULL) THEN 'product'::text     WHEN (case_study_id IS NOT NULL) THEN 'case_study'::text     WHEN (concept_id IS NOT NULL) THEN 'concept'::text     WHEN (dataset_id IS NOT NULL) THEN 'dataset'::text     WHEN (benchmark_id IS NOT NULL) THEN 'benchmark'::text     WHEN (ai_model_id IS NOT NULL) THEN 'ai_model'::text     WHEN (ai_protocol_id IS NOT NULL) THEN 'ai_protocol'::text     WHEN (mcp_server_id IS NOT NULL) THEN 'mcp_server'::text     WHEN (agent_skill_id IS NOT NULL) THEN 'agent_skill'::text     ELSE NULL::text END` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `identity_match_exactly_one_target` | `check` | `CHECK (num_nonnulls(organization_id, person_id, library_id, repository_id, paper_id, talk_id, video_id, product_id, case_study_id, concept_id, dataset_id, benchmark_id, ai_model_id, ai_protocol_id, mcp_server_id, agent_skill_id) = 1)` | — |
| `identity_match_match_method_check` | `check` | `CHECK (match_method = ANY (ARRAY['exact'::text, 'normalized'::text, 'model'::text, 'human'::text]))` | — |
| `identity_match_agent_skill_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id)` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) |
| `identity_match_ai_model_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id)` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) |
| `identity_match_ai_protocol_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_protocol_id) REFERENCES corpus.ai_protocol(id)` | [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) |
| `identity_match_benchmark_id_fkey` | `foreign_key` | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id)` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) |
| `identity_match_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` | [`staging.candidate`](../../staging/tables/candidate.md) |
| `identity_match_case_study_id_fkey` | `foreign_key` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id)` | [`corpus.case_study`](../../corpus/tables/case_study.md) |
| `identity_match_concept_id_fkey` | `foreign_key` | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id)` | [`corpus.concept`](../../corpus/tables/concept.md) |
| `identity_match_dataset_id_fkey` | `foreign_key` | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id)` | [`corpus.dataset`](../../corpus/tables/dataset.md) |
| `identity_match_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id)` | [`corpus.library`](../../corpus/tables/library.md) |
| `identity_match_mcp_server_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id)` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `identity_match_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `identity_match_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id)` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `identity_match_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id)` | [`corpus.person`](../../corpus/tables/person.md) |
| `identity_match_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id)` | [`corpus.product`](../../corpus/tables/product.md) |
| `identity_match_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `identity_match_talk_id_fkey` | `foreign_key` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id)` | [`corpus.talk`](../../corpus/tables/talk.md) |
| `identity_match_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id)` | [`corpus.video`](../../corpus/tables/video.md) |
| `identity_match_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `identity_match_agent_skill_id_fkey` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id)` |
| `identity_match_ai_model_id_fkey` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id)` |
| `identity_match_ai_protocol_id_fkey` | [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) | `FOREIGN KEY (ai_protocol_id) REFERENCES corpus.ai_protocol(id)` |
| `identity_match_benchmark_id_fkey` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id)` |
| `identity_match_candidate_id_fkey` | [`staging.candidate`](../../staging/tables/candidate.md) | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| `identity_match_case_study_id_fkey` | [`corpus.case_study`](../../corpus/tables/case_study.md) | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id)` |
| `identity_match_concept_id_fkey` | [`corpus.concept`](../../corpus/tables/concept.md) | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id)` |
| `identity_match_dataset_id_fkey` | [`corpus.dataset`](../../corpus/tables/dataset.md) | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id)` |
| `identity_match_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id)` |
| `identity_match_mcp_server_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id)` |
| `identity_match_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id)` |
| `identity_match_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id)` |
| `identity_match_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id)` |
| `identity_match_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id)` |
| `identity_match_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` |
| `identity_match_talk_id_fkey` | [`corpus.talk`](../../corpus/tables/talk.md) | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id)` |
| `identity_match_video_id_fkey` | [`corpus.video`](../../corpus/tables/video.md) | `FOREIGN KEY (video_id) REFERENCES corpus.video(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`staging.resolution_decision`](../../staging/tables/resolution_decision.md) | `resolution_decision_identity_match_id_fkey` | `FOREIGN KEY (identity_match_id) REFERENCES staging.identity_match(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `identity_match_agent_skill_id_idx` | `CREATE INDEX identity_match_agent_skill_id_idx ON staging.identity_match USING btree (agent_skill_id) WHERE (agent_skill_id IS NOT NULL)` |
| `identity_match_ai_model_id_idx` | `CREATE INDEX identity_match_ai_model_id_idx ON staging.identity_match USING btree (ai_model_id) WHERE (ai_model_id IS NOT NULL)` |
| `identity_match_ai_protocol_id_idx` | `CREATE INDEX identity_match_ai_protocol_id_idx ON staging.identity_match USING btree (ai_protocol_id) WHERE (ai_protocol_id IS NOT NULL)` |
| `identity_match_benchmark_id_idx` | `CREATE INDEX identity_match_benchmark_id_idx ON staging.identity_match USING btree (benchmark_id) WHERE (benchmark_id IS NOT NULL)` |
| `identity_match_candidate_idx` | `CREATE INDEX identity_match_candidate_idx ON staging.identity_match USING btree (candidate_id, decided)` |
| `identity_match_case_study_id_idx` | `CREATE INDEX identity_match_case_study_id_idx ON staging.identity_match USING btree (case_study_id) WHERE (case_study_id IS NOT NULL)` |
| `identity_match_concept_id_idx` | `CREATE INDEX identity_match_concept_id_idx ON staging.identity_match USING btree (concept_id) WHERE (concept_id IS NOT NULL)` |
| `identity_match_dataset_id_idx` | `CREATE INDEX identity_match_dataset_id_idx ON staging.identity_match USING btree (dataset_id) WHERE (dataset_id IS NOT NULL)` |
| `identity_match_library_id_idx` | `CREATE INDEX identity_match_library_id_idx ON staging.identity_match USING btree (library_id) WHERE (library_id IS NOT NULL)` |
| `identity_match_mcp_server_id_idx` | `CREATE INDEX identity_match_mcp_server_id_idx ON staging.identity_match USING btree (mcp_server_id) WHERE (mcp_server_id IS NOT NULL)` |
| `identity_match_organization_id_idx` | `CREATE INDEX identity_match_organization_id_idx ON staging.identity_match USING btree (organization_id) WHERE (organization_id IS NOT NULL)` |
| `identity_match_paper_id_idx` | `CREATE INDEX identity_match_paper_id_idx ON staging.identity_match USING btree (paper_id) WHERE (paper_id IS NOT NULL)` |
| `identity_match_person_id_idx` | `CREATE INDEX identity_match_person_id_idx ON staging.identity_match USING btree (person_id) WHERE (person_id IS NOT NULL)` |
| `identity_match_pkey` | `CREATE UNIQUE INDEX identity_match_pkey ON staging.identity_match USING btree (id)` |
| `identity_match_product_id_idx` | `CREATE INDEX identity_match_product_id_idx ON staging.identity_match USING btree (product_id) WHERE (product_id IS NOT NULL)` |
| `identity_match_repository_id_idx` | `CREATE INDEX identity_match_repository_id_idx ON staging.identity_match USING btree (repository_id) WHERE (repository_id IS NOT NULL)` |
| `identity_match_talk_id_idx` | `CREATE INDEX identity_match_talk_id_idx ON staging.identity_match USING btree (talk_id) WHERE (talk_id IS NOT NULL)` |
| `identity_match_target_idx` | `CREATE INDEX identity_match_target_idx ON staging.identity_match USING btree (target_kind)` |
| `identity_match_video_id_idx` | `CREATE INDEX identity_match_video_id_idx ON staging.identity_match USING btree (video_id) WHERE (video_id IS NOT NULL)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

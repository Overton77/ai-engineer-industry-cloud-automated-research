---
schema: taxonomy
relation: assignment
qualified_name: taxonomy.assignment
kind: table
---

# taxonomy.assignment

Database table taxonomy.assignment.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["taxonomy"]["Tables"]["assignment"]["Row"]`
- Row-level security: enabled
- Search tokens: `taxonomy assignment taxonomy.assignment id tenant_id term_id library_id repository_id person_id organization_id paper_id talk_id video_id product_id concept_id ai_model_id ai_protocol_id mcp_server_id agent_skill_id technical_problem_id solution_pattern_id advanced_usage_pattern_id failure_mode_id lesson_id method confidence provenance_claim_id review_task_id valid_from valid_to created_by_receipt_id created_at case_study_id dataset_id benchmark_id target_kind`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `term_id` | `uuid` | no | — | — |
| 4 | `library_id` | `uuid` | yes | — | — |
| 5 | `repository_id` | `uuid` | yes | — | — |
| 6 | `person_id` | `uuid` | yes | — | — |
| 7 | `organization_id` | `uuid` | yes | — | — |
| 8 | `paper_id` | `uuid` | yes | — | — |
| 9 | `talk_id` | `uuid` | yes | — | — |
| 10 | `video_id` | `uuid` | yes | — | — |
| 11 | `product_id` | `uuid` | yes | — | — |
| 12 | `concept_id` | `uuid` | yes | — | — |
| 13 | `ai_model_id` | `uuid` | yes | — | — |
| 14 | `ai_protocol_id` | `uuid` | yes | — | — |
| 15 | `mcp_server_id` | `uuid` | yes | — | — |
| 16 | `agent_skill_id` | `uuid` | yes | — | — |
| 17 | `technical_problem_id` | `uuid` | yes | — | — |
| 18 | `solution_pattern_id` | `uuid` | yes | — | — |
| 19 | `advanced_usage_pattern_id` | `uuid` | yes | — | — |
| 20 | `failure_mode_id` | `uuid` | yes | — | — |
| 21 | `lesson_id` | `uuid` | yes | — | — |
| 23 | `method` | `text` | no | — | — |
| 24 | `confidence` | `corpus.confidence` | yes | — | — |
| 25 | `provenance_claim_id` | `uuid` | yes | — | — |
| 26 | `review_task_id` | `uuid` | yes | — | — |
| 27 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 28 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 29 | `created_by_receipt_id` | `uuid` | yes | — | — |
| 30 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 31 | `case_study_id` | `uuid` | yes | — | — |
| 33 | `dataset_id` | `uuid` | yes | — | — |
| 34 | `benchmark_id` | `uuid` | yes | — | — |
| 35 | `target_kind` | `text` | yes | ` CASE     WHEN (library_id IS NOT NULL) THEN 'library'::text     WHEN (repository_id IS NOT NULL) THEN 'repository'::text     WHEN (person_id IS NOT NULL) THEN 'person'::text     WHEN (organization_id IS NOT NULL) THEN 'organization'::text     WHEN (paper_id IS NOT NULL) THEN 'paper'::text     WHEN (talk_id IS NOT NULL) THEN 'talk'::text     WHEN (video_id IS NOT NULL) THEN 'video'::text     WHEN (product_id IS NOT NULL) THEN 'product'::text     WHEN (case_study_id IS NOT NULL) THEN 'case_study'::text     WHEN (concept_id IS NOT NULL) THEN 'concept'::text     WHEN (dataset_id IS NOT NULL) THEN 'dataset'::text     WHEN (benchmark_id IS NOT NULL) THEN 'benchmark'::text     WHEN (ai_model_id IS NOT NULL) THEN 'ai_model'::text     WHEN (ai_protocol_id IS NOT NULL) THEN 'ai_protocol'::text     WHEN (mcp_server_id IS NOT NULL) THEN 'mcp_server'::text     WHEN (agent_skill_id IS NOT NULL) THEN 'agent_skill'::text     WHEN (technical_problem_id IS NOT NULL) THEN 'technical_problem'::text     WHEN (solution_pattern_id IS NOT NULL) THEN 'solution_pattern'::text     WHEN (advanced_usage_pattern_id IS NOT NULL) THEN 'advanced_usage_pattern'::text     WHEN (failure_mode_id IS NOT NULL) THEN 'failure_mode'::text     WHEN (lesson_id IS NOT NULL) THEN 'lesson'::text     ELSE NULL::text END` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `assignment_exactly_one_target` | `check` | `CHECK (num_nonnulls(library_id, repository_id, person_id, organization_id, paper_id, talk_id, video_id, product_id, case_study_id, concept_id, dataset_id, benchmark_id, ai_model_id, ai_protocol_id, mcp_server_id, agent_skill_id, technical_problem_id, solution_pattern_id, advanced_usage_pattern_id, failure_mode_id, lesson_id) = 1)` | — |
| `assignment_method_check` | `check` | `CHECK (method = ANY (ARRAY['rule'::text, 'model'::text, 'human'::text]))` | — |
| `assignment_advanced_usage_pattern_id_fkey` | `foreign_key` | `FOREIGN KEY (advanced_usage_pattern_id) REFERENCES knowledge.advanced_usage_pattern(id) ON DELETE CASCADE` | `knowledge.advanced_usage_pattern` |
| `assignment_agent_skill_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) |
| `assignment_ai_model_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) |
| `assignment_ai_protocol_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_protocol_id) REFERENCES corpus.ai_protocol(id) ON DELETE CASCADE` | [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) |
| `assignment_benchmark_id_fkey` | `foreign_key` | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) |
| `assignment_case_study_id_fkey` | `foreign_key` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` | [`corpus.case_study`](../../corpus/tables/case_study.md) |
| `assignment_concept_id_fkey` | `foreign_key` | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` | [`corpus.concept`](../../corpus/tables/concept.md) |
| `assignment_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `assignment_dataset_id_fkey` | `foreign_key` | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id) ON DELETE CASCADE` | [`corpus.dataset`](../../corpus/tables/dataset.md) |
| `assignment_failure_mode_id_fkey` | `foreign_key` | `FOREIGN KEY (failure_mode_id) REFERENCES knowledge.failure_mode(id) ON DELETE CASCADE` | `knowledge.failure_mode` |
| `assignment_lesson_id_fkey` | `foreign_key` | `FOREIGN KEY (lesson_id) REFERENCES curriculum.lesson(id) ON DELETE CASCADE` | `curriculum.lesson` |
| `assignment_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` | [`corpus.library`](../../corpus/tables/library.md) |
| `assignment_mcp_server_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `assignment_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `assignment_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `assignment_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` | [`corpus.person`](../../corpus/tables/person.md) |
| `assignment_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` | [`corpus.product`](../../corpus/tables/product.md) |
| `assignment_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `assignment_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `assignment_review_task_id_fkey` | `foreign_key` | `FOREIGN KEY (review_task_id) REFERENCES evaluation.review_task(id)` | `evaluation.review_task` |
| `assignment_solution_pattern_id_fkey` | `foreign_key` | `FOREIGN KEY (solution_pattern_id) REFERENCES knowledge.solution_pattern(id) ON DELETE CASCADE` | `knowledge.solution_pattern` |
| `assignment_talk_id_fkey` | `foreign_key` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` | [`corpus.talk`](../../corpus/tables/talk.md) |
| `assignment_technical_problem_id_fkey` | `foreign_key` | `FOREIGN KEY (technical_problem_id) REFERENCES knowledge.technical_problem(id) ON DELETE CASCADE` | `knowledge.technical_problem` |
| `assignment_term_id_fkey` | `foreign_key` | `FOREIGN KEY (term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` | [`taxonomy.term`](../../taxonomy/tables/term.md) |
| `assignment_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` | [`corpus.video`](../../corpus/tables/video.md) |
| `assignment_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `assignment_advanced_usage_pattern_id_fkey` | `knowledge.advanced_usage_pattern` | `FOREIGN KEY (advanced_usage_pattern_id) REFERENCES knowledge.advanced_usage_pattern(id) ON DELETE CASCADE` |
| `assignment_agent_skill_id_fkey` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id) ON DELETE CASCADE` |
| `assignment_ai_model_id_fkey` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` |
| `assignment_ai_protocol_id_fkey` | [`corpus.ai_protocol`](../../corpus/tables/ai_protocol.md) | `FOREIGN KEY (ai_protocol_id) REFERENCES corpus.ai_protocol(id) ON DELETE CASCADE` |
| `assignment_benchmark_id_fkey` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id) ON DELETE CASCADE` |
| `assignment_case_study_id_fkey` | [`corpus.case_study`](../../corpus/tables/case_study.md) | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id) ON DELETE CASCADE` |
| `assignment_concept_id_fkey` | [`corpus.concept`](../../corpus/tables/concept.md) | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` |
| `assignment_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `assignment_dataset_id_fkey` | [`corpus.dataset`](../../corpus/tables/dataset.md) | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id) ON DELETE CASCADE` |
| `assignment_failure_mode_id_fkey` | `knowledge.failure_mode` | `FOREIGN KEY (failure_mode_id) REFERENCES knowledge.failure_mode(id) ON DELETE CASCADE` |
| `assignment_lesson_id_fkey` | `curriculum.lesson` | `FOREIGN KEY (lesson_id) REFERENCES curriculum.lesson(id) ON DELETE CASCADE` |
| `assignment_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id) ON DELETE CASCADE` |
| `assignment_mcp_server_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id) ON DELETE CASCADE` |
| `assignment_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id) ON DELETE CASCADE` |
| `assignment_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| `assignment_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id) ON DELETE CASCADE` |
| `assignment_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id) ON DELETE CASCADE` |
| `assignment_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `assignment_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id) ON DELETE CASCADE` |
| `assignment_review_task_id_fkey` | `evaluation.review_task` | `FOREIGN KEY (review_task_id) REFERENCES evaluation.review_task(id)` |
| `assignment_solution_pattern_id_fkey` | `knowledge.solution_pattern` | `FOREIGN KEY (solution_pattern_id) REFERENCES knowledge.solution_pattern(id) ON DELETE CASCADE` |
| `assignment_talk_id_fkey` | [`corpus.talk`](../../corpus/tables/talk.md) | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id) ON DELETE CASCADE` |
| `assignment_technical_problem_id_fkey` | `knowledge.technical_problem` | `FOREIGN KEY (technical_problem_id) REFERENCES knowledge.technical_problem(id) ON DELETE CASCADE` |
| `assignment_term_id_fkey` | [`taxonomy.term`](../../taxonomy/tables/term.md) | `FOREIGN KEY (term_id) REFERENCES taxonomy.term(id) ON DELETE CASCADE` |
| `assignment_video_id_fkey` | [`corpus.video`](../../corpus/tables/video.md) | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `assignment_advanced_usage_pattern_id_idx` | `CREATE INDEX assignment_advanced_usage_pattern_id_idx ON taxonomy.assignment USING btree (advanced_usage_pattern_id) WHERE (advanced_usage_pattern_id IS NOT NULL)` |
| `assignment_agent_skill_id_idx` | `CREATE INDEX assignment_agent_skill_id_idx ON taxonomy.assignment USING btree (agent_skill_id) WHERE (agent_skill_id IS NOT NULL)` |
| `assignment_ai_model_id_idx` | `CREATE INDEX assignment_ai_model_id_idx ON taxonomy.assignment USING btree (ai_model_id) WHERE (ai_model_id IS NOT NULL)` |
| `assignment_ai_protocol_id_idx` | `CREATE INDEX assignment_ai_protocol_id_idx ON taxonomy.assignment USING btree (ai_protocol_id) WHERE (ai_protocol_id IS NOT NULL)` |
| `assignment_benchmark_id_idx` | `CREATE INDEX assignment_benchmark_id_idx ON taxonomy.assignment USING btree (benchmark_id) WHERE (benchmark_id IS NOT NULL)` |
| `assignment_case_study_id_idx` | `CREATE INDEX assignment_case_study_id_idx ON taxonomy.assignment USING btree (case_study_id) WHERE (case_study_id IS NOT NULL)` |
| `assignment_concept_id_idx` | `CREATE INDEX assignment_concept_id_idx ON taxonomy.assignment USING btree (concept_id) WHERE (concept_id IS NOT NULL)` |
| `assignment_current_idx` | `CREATE INDEX assignment_current_idx ON taxonomy.assignment USING btree (term_id) WHERE (valid_to IS NULL)` |
| `assignment_dataset_id_idx` | `CREATE INDEX assignment_dataset_id_idx ON taxonomy.assignment USING btree (dataset_id) WHERE (dataset_id IS NOT NULL)` |
| `assignment_failure_mode_id_idx` | `CREATE INDEX assignment_failure_mode_id_idx ON taxonomy.assignment USING btree (failure_mode_id) WHERE (failure_mode_id IS NOT NULL)` |
| `assignment_lesson_id_idx` | `CREATE INDEX assignment_lesson_id_idx ON taxonomy.assignment USING btree (lesson_id) WHERE (lesson_id IS NOT NULL)` |
| `assignment_library_id_idx` | `CREATE INDEX assignment_library_id_idx ON taxonomy.assignment USING btree (library_id) WHERE (library_id IS NOT NULL)` |
| `assignment_mcp_server_id_idx` | `CREATE INDEX assignment_mcp_server_id_idx ON taxonomy.assignment USING btree (mcp_server_id) WHERE (mcp_server_id IS NOT NULL)` |
| `assignment_organization_id_idx` | `CREATE INDEX assignment_organization_id_idx ON taxonomy.assignment USING btree (organization_id) WHERE (organization_id IS NOT NULL)` |
| `assignment_paper_id_idx` | `CREATE INDEX assignment_paper_id_idx ON taxonomy.assignment USING btree (paper_id) WHERE (paper_id IS NOT NULL)` |
| `assignment_person_id_idx` | `CREATE INDEX assignment_person_id_idx ON taxonomy.assignment USING btree (person_id) WHERE (person_id IS NOT NULL)` |
| `assignment_pkey` | `CREATE UNIQUE INDEX assignment_pkey ON taxonomy.assignment USING btree (id)` |
| `assignment_product_id_idx` | `CREATE INDEX assignment_product_id_idx ON taxonomy.assignment USING btree (product_id) WHERE (product_id IS NOT NULL)` |
| `assignment_repository_id_idx` | `CREATE INDEX assignment_repository_id_idx ON taxonomy.assignment USING btree (repository_id) WHERE (repository_id IS NOT NULL)` |
| `assignment_solution_pattern_id_idx` | `CREATE INDEX assignment_solution_pattern_id_idx ON taxonomy.assignment USING btree (solution_pattern_id) WHERE (solution_pattern_id IS NOT NULL)` |
| `assignment_talk_id_idx` | `CREATE INDEX assignment_talk_id_idx ON taxonomy.assignment USING btree (talk_id) WHERE (talk_id IS NOT NULL)` |
| `assignment_target_idx` | `CREATE INDEX assignment_target_idx ON taxonomy.assignment USING btree (target_kind)` |
| `assignment_technical_problem_id_idx` | `CREATE INDEX assignment_technical_problem_id_idx ON taxonomy.assignment USING btree (technical_problem_id) WHERE (technical_problem_id IS NOT NULL)` |
| `assignment_term_idx` | `CREATE INDEX assignment_term_idx ON taxonomy.assignment USING btree (term_id)` |
| `assignment_video_id_idx` | `CREATE INDEX assignment_video_id_idx ON taxonomy.assignment USING btree (video_id) WHERE (video_id IS NOT NULL)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `assignment_facet_cardinality` | `taxonomy.enforce_facet_cardinality` | `CREATE TRIGGER assignment_facet_cardinality BEFORE INSERT OR UPDATE ON taxonomy.assignment FOR EACH ROW EXECUTE FUNCTION taxonomy.enforce_facet_cardinality()` |
| `assignment_term_target_scope` | `taxonomy.enforce_term_target_scope` | `CREATE TRIGGER assignment_term_target_scope BEFORE INSERT OR UPDATE OF term_id, library_id, repository_id, person_id, organization_id, paper_id, product_id, case_study_id, dataset_id, benchmark_id, ai_model_id, ai_protocol_id ON taxonomy.assignment FOR EACH ROW EXECUTE FUNCTION taxonomy.enforce_term_target_scope()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

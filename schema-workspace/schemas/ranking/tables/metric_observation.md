---
schema: ranking
relation: metric_observation
qualified_name: ranking.metric_observation
kind: table
---

# ranking.metric_observation

Database table ranking.metric_observation.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["metric_observation"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking metric_observation ranking.metric_observation id tenant_id definition_version_id library_id repository_id person_id organization_id paper_id video_id ai_model_version_id mcp_server_id agent_skill_id product_id observed_at value_numeric value_text value_jsonb locator_id run_id created_at dataset_id benchmark_id talk_id ai_model_id collected_at observation_window dimensions measurement_kind is_estimate visibility access_tier raw_capture_id collector_version source_policy_version quality_flags provenance unavailable_reason case_study_id entity_kind`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `definition_version_id` | `uuid` | no | — | — |
| 4 | `library_id` | `uuid` | yes | — | — |
| 5 | `repository_id` | `uuid` | yes | — | — |
| 6 | `person_id` | `uuid` | yes | — | — |
| 7 | `organization_id` | `uuid` | yes | — | — |
| 8 | `paper_id` | `uuid` | yes | — | — |
| 9 | `video_id` | `uuid` | yes | — | — |
| 10 | `ai_model_version_id` | `uuid` | yes | — | — |
| 11 | `mcp_server_id` | `uuid` | yes | — | — |
| 12 | `agent_skill_id` | `uuid` | yes | — | — |
| 13 | `product_id` | `uuid` | yes | — | — |
| 15 | `observed_at` | `timestamp with time zone` | no | — | — |
| 16 | `value_numeric` | `numeric` | yes | — | — |
| 17 | `value_text` | `text` | yes | — | — |
| 18 | `value_jsonb` | `jsonb` | yes | — | — |
| 19 | `locator_id` | `uuid` | yes | — | — |
| 20 | `run_id` | `uuid` | yes | — | — |
| 21 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 22 | `dataset_id` | `uuid` | yes | — | — |
| 23 | `benchmark_id` | `uuid` | yes | — | — |
| 24 | `talk_id` | `uuid` | yes | — | — |
| 25 | `ai_model_id` | `uuid` | yes | — | — |
| 26 | `collected_at` | `timestamp with time zone` | no | `now()` | — |
| 27 | `observation_window` | `text` | yes | — | — |
| 28 | `dimensions` | `jsonb` | no | `'{}'::jsonb` | — |
| 29 | `measurement_kind` | `text` | yes | — | — |
| 30 | `is_estimate` | `boolean` | no | `false` | — |
| 31 | `visibility` | `text` | no | `'public'::text` | — |
| 32 | `access_tier` | `text` | yes | — | — |
| 33 | `raw_capture_id` | `uuid` | yes | — | Immutable raw provider response whose SHA-256 and storage pointer establish metric provenance. |
| 34 | `collector_version` | `text` | yes | — | — |
| 35 | `source_policy_version` | `text` | yes | — | — |
| 36 | `quality_flags` | `text[]` | no | `'{}'::text[]` | — |
| 37 | `provenance` | `jsonb` | no | `'{}'::jsonb` | — |
| 38 | `unavailable_reason` | `text` | yes | — | Explicit missingness. Unavailable observations are recorded as null, never coerced to zero. |
| 40 | `case_study_id` | `uuid` | yes | — | — |
| 41 | `entity_kind` | `text` | yes | ` CASE     WHEN (library_id IS NOT NULL) THEN 'library'::text     WHEN (repository_id IS NOT NULL) THEN 'repository'::text     WHEN (person_id IS NOT NULL) THEN 'person'::text     WHEN (organization_id IS NOT NULL) THEN 'organization'::text     WHEN (paper_id IS NOT NULL) THEN 'paper'::text     WHEN (video_id IS NOT NULL) THEN 'video'::text     WHEN (talk_id IS NOT NULL) THEN 'talk'::text     WHEN (dataset_id IS NOT NULL) THEN 'dataset'::text     WHEN (benchmark_id IS NOT NULL) THEN 'benchmark'::text     WHEN (ai_model_id IS NOT NULL) THEN 'ai_model'::text     WHEN (ai_model_version_id IS NOT NULL) THEN 'ai_model_version'::text     WHEN (mcp_server_id IS NOT NULL) THEN 'mcp_server'::text     WHEN (agent_skill_id IS NOT NULL) THEN 'agent_skill'::text     WHEN (product_id IS NOT NULL) THEN 'product'::text     WHEN (case_study_id IS NOT NULL) THEN 'case_study'::text     ELSE NULL::text END` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `metric_observation_exactly_one_entity` | `check` | `CHECK (num_nonnulls(library_id, repository_id, person_id, organization_id, paper_id, video_id, talk_id, dataset_id, benchmark_id, ai_model_id, ai_model_version_id, mcp_server_id, agent_skill_id, product_id, case_study_id) = 1)` | — |
| `metric_observation_has_value_or_unavailable` | `check` | `CHECK (num_nonnulls(value_numeric, value_text, value_jsonb) >= 1 OR unavailable_reason IS NOT NULL)` | — |
| `metric_observation_time_order` | `check` | `CHECK (collected_at >= observed_at)` | — |
| `metric_observation_agent_skill_id_fkey` | `foreign_key` | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id)` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) |
| `metric_observation_ai_model_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id)` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) |
| `metric_observation_ai_model_version_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id)` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) |
| `metric_observation_benchmark_id_fkey` | `foreign_key` | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id)` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) |
| `metric_observation_case_study_id_fkey` | `foreign_key` | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id)` | [`corpus.case_study`](../../corpus/tables/case_study.md) |
| `metric_observation_dataset_id_fkey` | `foreign_key` | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id)` | [`corpus.dataset`](../../corpus/tables/dataset.md) |
| `metric_observation_definition_version_id_fkey` | `foreign_key` | `FOREIGN KEY (definition_version_id) REFERENCES ranking.metric_definition_version(id)` | [`ranking.metric_definition_version`](../../ranking/tables/metric_definition_version.md) |
| `metric_observation_library_id_fkey` | `foreign_key` | `FOREIGN KEY (library_id) REFERENCES corpus.library(id)` | [`corpus.library`](../../corpus/tables/library.md) |
| `metric_observation_locator_id_fkey` | `foreign_key` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` | [`evidence.locator`](../../evidence/tables/locator.md) |
| `metric_observation_mcp_server_id_fkey` | `foreign_key` | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id)` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) |
| `metric_observation_organization_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id)` | [`corpus.organization`](../../corpus/tables/organization.md) |
| `metric_observation_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id)` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `metric_observation_person_id_fkey` | `foreign_key` | `FOREIGN KEY (person_id) REFERENCES corpus.person(id)` | [`corpus.person`](../../corpus/tables/person.md) |
| `metric_observation_product_id_fkey` | `foreign_key` | `FOREIGN KEY (product_id) REFERENCES corpus.product(id)` | [`corpus.product`](../../corpus/tables/product.md) |
| `metric_observation_raw_capture_id_fkey` | `foreign_key` | `FOREIGN KEY (raw_capture_id) REFERENCES evidence.source_capture(id)` | [`evidence.source_capture`](../../evidence/tables/source_capture.md) |
| `metric_observation_repository_id_fkey` | `foreign_key` | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` | [`corpus.repository`](../../corpus/tables/repository.md) |
| `metric_observation_run_fk` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES ranking.ranking_run(id)` | [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) |
| `metric_observation_talk_id_fkey` | `foreign_key` | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id)` | [`corpus.talk`](../../corpus/tables/talk.md) |
| `metric_observation_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id)` | [`corpus.video`](../../corpus/tables/video.md) |
| `metric_observation_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `metric_observation_agent_skill_id_fkey` | [`corpus.agent_skill`](../../corpus/tables/agent_skill.md) | `FOREIGN KEY (agent_skill_id) REFERENCES corpus.agent_skill(id)` |
| `metric_observation_ai_model_id_fkey` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id)` |
| `metric_observation_ai_model_version_id_fkey` | [`corpus.ai_model_version`](../../corpus/tables/ai_model_version.md) | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id)` |
| `metric_observation_benchmark_id_fkey` | [`corpus.benchmark`](../../corpus/tables/benchmark.md) | `FOREIGN KEY (benchmark_id) REFERENCES corpus.benchmark(id)` |
| `metric_observation_case_study_id_fkey` | [`corpus.case_study`](../../corpus/tables/case_study.md) | `FOREIGN KEY (case_study_id) REFERENCES corpus.case_study(id)` |
| `metric_observation_dataset_id_fkey` | [`corpus.dataset`](../../corpus/tables/dataset.md) | `FOREIGN KEY (dataset_id) REFERENCES corpus.dataset(id)` |
| `metric_observation_definition_version_id_fkey` | [`ranking.metric_definition_version`](../../ranking/tables/metric_definition_version.md) | `FOREIGN KEY (definition_version_id) REFERENCES ranking.metric_definition_version(id)` |
| `metric_observation_library_id_fkey` | [`corpus.library`](../../corpus/tables/library.md) | `FOREIGN KEY (library_id) REFERENCES corpus.library(id)` |
| `metric_observation_locator_id_fkey` | [`evidence.locator`](../../evidence/tables/locator.md) | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| `metric_observation_mcp_server_id_fkey` | [`corpus.mcp_server`](../../corpus/tables/mcp_server.md) | `FOREIGN KEY (mcp_server_id) REFERENCES corpus.mcp_server(id)` |
| `metric_observation_organization_id_fkey` | [`corpus.organization`](../../corpus/tables/organization.md) | `FOREIGN KEY (organization_id) REFERENCES corpus.organization(id)` |
| `metric_observation_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id)` |
| `metric_observation_person_id_fkey` | [`corpus.person`](../../corpus/tables/person.md) | `FOREIGN KEY (person_id) REFERENCES corpus.person(id)` |
| `metric_observation_product_id_fkey` | [`corpus.product`](../../corpus/tables/product.md) | `FOREIGN KEY (product_id) REFERENCES corpus.product(id)` |
| `metric_observation_raw_capture_id_fkey` | [`evidence.source_capture`](../../evidence/tables/source_capture.md) | `FOREIGN KEY (raw_capture_id) REFERENCES evidence.source_capture(id)` |
| `metric_observation_repository_id_fkey` | [`corpus.repository`](../../corpus/tables/repository.md) | `FOREIGN KEY (repository_id) REFERENCES corpus.repository(id)` |
| `metric_observation_run_fk` | [`ranking.ranking_run`](../../ranking/tables/ranking_run.md) | `FOREIGN KEY (run_id) REFERENCES ranking.ranking_run(id)` |
| `metric_observation_talk_id_fkey` | [`corpus.talk`](../../corpus/tables/talk.md) | `FOREIGN KEY (talk_id) REFERENCES corpus.talk(id)` |
| `metric_observation_video_id_fkey` | [`corpus.video`](../../corpus/tables/video.md) | `FOREIGN KEY (video_id) REFERENCES corpus.video(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `metric_observation_agent_skill_id_idx` | `CREATE INDEX metric_observation_agent_skill_id_idx ON ranking.metric_observation USING btree (agent_skill_id, observed_at DESC) WHERE (agent_skill_id IS NOT NULL)` |
| `metric_observation_ai_model_id_idx` | `CREATE INDEX metric_observation_ai_model_id_idx ON ranking.metric_observation USING btree (ai_model_id, observed_at DESC) WHERE (ai_model_id IS NOT NULL)` |
| `metric_observation_ai_model_version_id_idx` | `CREATE INDEX metric_observation_ai_model_version_id_idx ON ranking.metric_observation USING btree (ai_model_version_id, observed_at DESC) WHERE (ai_model_version_id IS NOT NULL)` |
| `metric_observation_benchmark_id_idx` | `CREATE INDEX metric_observation_benchmark_id_idx ON ranking.metric_observation USING btree (benchmark_id, observed_at DESC) WHERE (benchmark_id IS NOT NULL)` |
| `metric_observation_capture_idx` | `CREATE INDEX metric_observation_capture_idx ON ranking.metric_observation USING btree (raw_capture_id) WHERE (raw_capture_id IS NOT NULL)` |
| `metric_observation_case_study_id_idx` | `CREATE INDEX metric_observation_case_study_id_idx ON ranking.metric_observation USING btree (case_study_id, observed_at DESC) WHERE (case_study_id IS NOT NULL)` |
| `metric_observation_dataset_id_idx` | `CREATE INDEX metric_observation_dataset_id_idx ON ranking.metric_observation USING btree (dataset_id, observed_at DESC) WHERE (dataset_id IS NOT NULL)` |
| `metric_observation_def_time_idx` | `CREATE INDEX metric_observation_def_time_idx ON ranking.metric_observation USING btree (definition_version_id, observed_at DESC)` |
| `metric_observation_entity_idx` | `CREATE INDEX metric_observation_entity_idx ON ranking.metric_observation USING btree (entity_kind, observed_at DESC)` |
| `metric_observation_library_id_idx` | `CREATE INDEX metric_observation_library_id_idx ON ranking.metric_observation USING btree (library_id, observed_at DESC) WHERE (library_id IS NOT NULL)` |
| `metric_observation_locator_idx` | `CREATE INDEX metric_observation_locator_idx ON ranking.metric_observation USING btree (locator_id) WHERE (locator_id IS NOT NULL)` |
| `metric_observation_mcp_server_id_idx` | `CREATE INDEX metric_observation_mcp_server_id_idx ON ranking.metric_observation USING btree (mcp_server_id, observed_at DESC) WHERE (mcp_server_id IS NOT NULL)` |
| `metric_observation_organization_id_idx` | `CREATE INDEX metric_observation_organization_id_idx ON ranking.metric_observation USING btree (organization_id, observed_at DESC) WHERE (organization_id IS NOT NULL)` |
| `metric_observation_paper_id_idx` | `CREATE INDEX metric_observation_paper_id_idx ON ranking.metric_observation USING btree (paper_id, observed_at DESC) WHERE (paper_id IS NOT NULL)` |
| `metric_observation_person_id_idx` | `CREATE INDEX metric_observation_person_id_idx ON ranking.metric_observation USING btree (person_id, observed_at DESC) WHERE (person_id IS NOT NULL)` |
| `metric_observation_pkey` | `CREATE UNIQUE INDEX metric_observation_pkey ON ranking.metric_observation USING btree (id)` |
| `metric_observation_product_id_idx` | `CREATE INDEX metric_observation_product_id_idx ON ranking.metric_observation USING btree (product_id, observed_at DESC) WHERE (product_id IS NOT NULL)` |
| `metric_observation_repository_id_idx` | `CREATE INDEX metric_observation_repository_id_idx ON ranking.metric_observation USING btree (repository_id, observed_at DESC) WHERE (repository_id IS NOT NULL)` |
| `metric_observation_run_idx` | `CREATE INDEX metric_observation_run_idx ON ranking.metric_observation USING btree (run_id) WHERE (run_id IS NOT NULL)` |
| `metric_observation_talk_id_idx` | `CREATE INDEX metric_observation_talk_id_idx ON ranking.metric_observation USING btree (talk_id, observed_at DESC) WHERE (talk_id IS NOT NULL)` |
| `metric_observation_video_id_idx` | `CREATE INDEX metric_observation_video_id_idx ON ranking.metric_observation USING btree (video_id, observed_at DESC) WHERE (video_id IS NOT NULL)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `metric_observation_immutable` | `util.reject_mutation` | `CREATE TRIGGER metric_observation_immutable BEFORE DELETE OR UPDATE ON ranking.metric_observation FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

---
schema: staging
relation: candidate
qualified_name: staging.candidate
kind: table
---

# staging.candidate

Database table staging.candidate.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["staging"]["Tables"]["candidate"]["Row"]`
- Row-level security: enabled
- Search tokens: `staging candidate staging.candidate id tenant_id candidate_kind status raw discovered_by_attempt_id discovery_method provider capture_id locator_id mission_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `candidate_kind` | `text` | no | — | — |
| 4 | `status` | `staging.candidate_status` | no | `'discovered'::staging.candidate_status` | — |
| 5 | `raw` | `jsonb` | no | `'{}'::jsonb` | — |
| 6 | `discovered_by_attempt_id` | `uuid` | yes | — | — |
| 7 | `discovery_method` | `text` | yes | — | — |
| 8 | `provider` | `text` | yes | — | — |
| 9 | `capture_id` | `uuid` | yes | — | — |
| 10 | `locator_id` | `uuid` | yes | — | — |
| 11 | `mission_id` | `uuid` | yes | — | — |
| 12 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 13 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `candidate_candidate_kind_check` | `check` | `CHECK (candidate_kind = ANY (ARRAY['library'::text, 'repository'::text, 'person'::text, 'organization'::text, 'paper'::text, 'video'::text, 'talk'::text, 'product'::text, 'case_study'::text, 'concept'::text, 'dataset'::text, 'benchmark'::text, 'ai_model'::text, 'ai_protocol'::text, 'mcp_server'::text, 'agent_skill'::text, 'technical_record'::text]))` | — |
| `candidate_capture_id_fkey` | `foreign_key` | `FOREIGN KEY (capture_id) REFERENCES evidence.source_capture(id)` | [`evidence.source_capture`](../../evidence/tables/source_capture.md) |
| `candidate_discovered_by_attempt_id_fkey` | `foreign_key` | `FOREIGN KEY (discovered_by_attempt_id) REFERENCES orchestration.attempt(id)` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) |
| `candidate_locator_id_fkey` | `foreign_key` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` | [`evidence.locator`](../../evidence/tables/locator.md) |
| `candidate_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `candidate_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `candidate_id_candidate_kind_key` | `unique` | `UNIQUE (id, candidate_kind)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `candidate_capture_id_fkey` | [`evidence.source_capture`](../../evidence/tables/source_capture.md) | `FOREIGN KEY (capture_id) REFERENCES evidence.source_capture(id)` |
| `candidate_discovered_by_attempt_id_fkey` | [`orchestration.attempt`](../../orchestration/tables/attempt.md) | `FOREIGN KEY (discovered_by_attempt_id) REFERENCES orchestration.attempt(id)` |
| `candidate_locator_id_fkey` | [`evidence.locator`](../../evidence/tables/locator.md) | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| `candidate_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE SET NULL` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`staging.candidate_agent_skill`](../../staging/tables/candidate_agent_skill.md) | `candidate_agent_skill_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_agent_skill`](../../staging/tables/candidate_agent_skill.md) | `candidate_agent_skill_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_ai_model`](../../staging/tables/candidate_ai_model.md) | `candidate_ai_model_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_ai_model`](../../staging/tables/candidate_ai_model.md) | `candidate_ai_model_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_ai_protocol`](../../staging/tables/candidate_ai_protocol.md) | `candidate_ai_protocol_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_ai_protocol`](../../staging/tables/candidate_ai_protocol.md) | `candidate_ai_protocol_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_benchmark`](../../staging/tables/candidate_benchmark.md) | `candidate_benchmark_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_benchmark`](../../staging/tables/candidate_benchmark.md) | `candidate_benchmark_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_case_study`](../../staging/tables/candidate_case_study.md) | `candidate_case_study_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_case_study`](../../staging/tables/candidate_case_study.md) | `candidate_case_study_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_concept`](../../staging/tables/candidate_concept.md) | `candidate_concept_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_concept`](../../staging/tables/candidate_concept.md) | `candidate_concept_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_dataset`](../../staging/tables/candidate_dataset.md) | `candidate_dataset_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_dataset`](../../staging/tables/candidate_dataset.md) | `candidate_dataset_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_library`](../../staging/tables/candidate_library.md) | `candidate_library_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_library`](../../staging/tables/candidate_library.md) | `candidate_library_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_mcp_server`](../../staging/tables/candidate_mcp_server.md) | `candidate_mcp_server_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_mcp_server`](../../staging/tables/candidate_mcp_server.md) | `candidate_mcp_server_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_organization`](../../staging/tables/candidate_organization.md) | `candidate_organization_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_organization`](../../staging/tables/candidate_organization.md) | `candidate_organization_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_paper`](../../staging/tables/candidate_paper.md) | `candidate_paper_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_paper`](../../staging/tables/candidate_paper.md) | `candidate_paper_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_person`](../../staging/tables/candidate_person.md) | `candidate_person_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_person`](../../staging/tables/candidate_person.md) | `candidate_person_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_product`](../../staging/tables/candidate_product.md) | `candidate_product_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_product`](../../staging/tables/candidate_product.md) | `candidate_product_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_repository`](../../staging/tables/candidate_repository.md) | `candidate_repository_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_repository`](../../staging/tables/candidate_repository.md) | `candidate_repository_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_talk`](../../staging/tables/candidate_talk.md) | `candidate_talk_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_talk`](../../staging/tables/candidate_talk.md) | `candidate_talk_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_technical_record`](../../staging/tables/candidate_technical_record.md) | `candidate_technical_record_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_technical_record`](../../staging/tables/candidate_technical_record.md) | `candidate_technical_record_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.candidate_video`](../../staging/tables/candidate_video.md) | `candidate_video_candidate_id_candidate_kind_fkey` | `FOREIGN KEY (candidate_id, candidate_kind) REFERENCES staging.candidate(id, candidate_kind)` |
| [`staging.candidate_video`](../../staging/tables/candidate_video.md) | `candidate_video_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.mention`](../../staging/tables/mention.md) | `mention_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.resolution_decision`](../../staging/tables/resolution_decision.md) | `resolution_decision_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |
| [`staging.vetting_decision`](../../staging/tables/vetting_decision.md) | `vetting_decision_candidate_id_fkey` | `FOREIGN KEY (candidate_id) REFERENCES staging.candidate(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `candidate_attempt_idx` | `CREATE INDEX candidate_attempt_idx ON staging.candidate USING btree (discovered_by_attempt_id)` |
| `candidate_id_candidate_kind_key` | `CREATE UNIQUE INDEX candidate_id_candidate_kind_key ON staging.candidate USING btree (id, candidate_kind)` |
| `candidate_kind_status_idx` | `CREATE INDEX candidate_kind_status_idx ON staging.candidate USING btree (candidate_kind, status)` |
| `candidate_mission_idx` | `CREATE INDEX candidate_mission_idx ON staging.candidate USING btree (mission_id)` |
| `candidate_pkey` | `CREATE UNIQUE INDEX candidate_pkey ON staging.candidate USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

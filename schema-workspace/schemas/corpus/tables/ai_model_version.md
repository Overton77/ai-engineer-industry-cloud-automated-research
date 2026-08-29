---
schema: corpus
relation: ai_model_version
qualified_name: corpus.ai_model_version
kind: table
---

# corpus.ai_model_version

Database table corpus.ai_model_version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["ai_model_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus ai_model_version corpus.ai_model_version id ai_model_id version_label released_on context_window_tokens max_output_tokens knowledge_cutoff_on deprecation_state created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `ai_model_id` | `uuid` | no | — | — |
| 3 | `version_label` | `text` | no | — | — |
| 4 | `released_on` | `date` | yes | — | — |
| 5 | `context_window_tokens` | `integer` | yes | — | — |
| 6 | `max_output_tokens` | `integer` | yes | — | — |
| 7 | `knowledge_cutoff_on` | `date` | yes | — | — |
| 8 | `deprecation_state` | `text` | yes | — | — |
| 9 | `created_by_receipt_id` | `uuid` | no | — | — |
| 10 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ai_model_version_deprecation_state_check` | `check` | `CHECK (deprecation_state = ANY (ARRAY['ga'::text, 'preview'::text, 'deprecated'::text, 'retired'::text]))` | — |
| `ai_model_version_ai_model_id_fkey` | `foreign_key` | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) |
| `ai_model_version_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `ai_model_version_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `ai_model_version_ai_model_id_version_label_key` | `unique` | `UNIQUE (ai_model_id, version_label)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `ai_model_version_ai_model_id_fkey` | [`corpus.ai_model`](../../corpus/tables/ai_model.md) | `FOREIGN KEY (ai_model_id) REFERENCES corpus.ai_model(id) ON DELETE CASCADE` |
| `ai_model_version_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.ai_model_availability_fact`](../../corpus/tables/ai_model_availability_fact.md) | `ai_model_availability_fact_ai_model_version_id_fkey` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| [`corpus.benchmark_evaluates_model_version`](../../corpus/tables/benchmark_evaluates_model_version.md) | `benchmark_evaluates_model_version_ai_model_version_id_fkey` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| [`corpus.case_study_uses_model_version`](../../corpus/tables/case_study_uses_model_version.md) | `case_study_uses_model_version_ai_model_version_id_fkey` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| [`corpus.library_supports_model_version`](../../corpus/tables/library_supports_model_version.md) | `library_supports_model_version_ai_model_version_id_fkey` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| [`corpus.product_built_on_model_version`](../../corpus/tables/product_built_on_model_version.md) | `product_built_on_model_version_ai_model_version_id_fkey` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| [`evidence.claim_ai_model_version`](../../evidence/tables/claim_ai_model_version.md) | `claim_ai_model_version_ai_model_version_id_fkey` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_ai_model_version_id_fkey` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_ai_model_version_id_fkey` | `FOREIGN KEY (ai_model_version_id) REFERENCES corpus.ai_model_version(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `ai_model_version_ai_model_id_version_label_key` | `CREATE UNIQUE INDEX ai_model_version_ai_model_id_version_label_key ON corpus.ai_model_version USING btree (ai_model_id, version_label)` |
| `ai_model_version_pkey` | `CREATE UNIQUE INDEX ai_model_version_pkey ON corpus.ai_model_version USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

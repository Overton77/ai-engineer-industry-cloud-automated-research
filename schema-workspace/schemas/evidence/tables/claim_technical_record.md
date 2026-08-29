---
schema: evidence
relation: claim_technical_record
qualified_name: evidence.claim_technical_record
kind: table
---

# evidence.claim_technical_record

Database table evidence.claim_technical_record.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_technical_record"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_technical_record evidence.claim_technical_record id claim_id technical_problem_id solution_pattern_id advanced_usage_pattern_id implementation_example_id failure_mode_id benchmark_result_id compatibility_constraint_id operational_practice_id security_consideration_id record_kind role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `claim_id` | `uuid` | no | — | — |
| 3 | `technical_problem_id` | `uuid` | yes | — | — |
| 4 | `solution_pattern_id` | `uuid` | yes | — | — |
| 5 | `advanced_usage_pattern_id` | `uuid` | yes | — | — |
| 6 | `implementation_example_id` | `uuid` | yes | — | — |
| 7 | `failure_mode_id` | `uuid` | yes | — | — |
| 8 | `benchmark_result_id` | `uuid` | yes | — | — |
| 9 | `compatibility_constraint_id` | `uuid` | yes | — | — |
| 10 | `operational_practice_id` | `uuid` | yes | — | — |
| 11 | `security_consideration_id` | `uuid` | yes | — | — |
| 12 | `record_kind` | `text` | yes | ` CASE     WHEN (technical_problem_id IS NOT NULL) THEN 'technical_problem'::text     WHEN (solution_pattern_id IS NOT NULL) THEN 'solution_pattern'::text     WHEN (advanced_usage_pattern_id IS NOT NULL) THEN 'advanced_usage_pattern'::text     WHEN (implementation_example_id IS NOT NULL) THEN 'implementation_example'::text     WHEN (failure_mode_id IS NOT NULL) THEN 'failure_mode'::text     WHEN (benchmark_result_id IS NOT NULL) THEN 'benchmark_result'::text     WHEN (compatibility_constraint_id IS NOT NULL) THEN 'compatibility_constraint'::text     WHEN (operational_practice_id IS NOT NULL) THEN 'operational_practice'::text     WHEN (security_consideration_id IS NOT NULL) THEN 'security_consideration'::text     ELSE NULL::text END` | — |
| 13 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 14 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_technical_record_exactly_one` | `check` | `CHECK (num_nonnulls(technical_problem_id, solution_pattern_id, advanced_usage_pattern_id, implementation_example_id, failure_mode_id, benchmark_result_id, compatibility_constraint_id, operational_practice_id, security_consideration_id) = 1)` | — |
| `claim_technical_record_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text, 'comparison'::text]))` | — |
| `claim_technical_record_advanced_usage_pattern_id_fkey` | `foreign_key` | `FOREIGN KEY (advanced_usage_pattern_id) REFERENCES knowledge.advanced_usage_pattern(id) ON DELETE CASCADE` | `knowledge.advanced_usage_pattern` |
| `claim_technical_record_benchmark_result_id_fkey` | `foreign_key` | `FOREIGN KEY (benchmark_result_id) REFERENCES knowledge.benchmark_result(id) ON DELETE CASCADE` | `knowledge.benchmark_result` |
| `claim_technical_record_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_technical_record_compatibility_constraint_id_fkey` | `foreign_key` | `FOREIGN KEY (compatibility_constraint_id) REFERENCES knowledge.compatibility_constraint(id) ON DELETE CASCADE` | `knowledge.compatibility_constraint` |
| `claim_technical_record_failure_mode_id_fkey` | `foreign_key` | `FOREIGN KEY (failure_mode_id) REFERENCES knowledge.failure_mode(id) ON DELETE CASCADE` | `knowledge.failure_mode` |
| `claim_technical_record_implementation_example_id_fkey` | `foreign_key` | `FOREIGN KEY (implementation_example_id) REFERENCES knowledge.implementation_example(id) ON DELETE CASCADE` | `knowledge.implementation_example` |
| `claim_technical_record_operational_practice_id_fkey` | `foreign_key` | `FOREIGN KEY (operational_practice_id) REFERENCES knowledge.operational_practice(id) ON DELETE CASCADE` | `knowledge.operational_practice` |
| `claim_technical_record_security_consideration_id_fkey` | `foreign_key` | `FOREIGN KEY (security_consideration_id) REFERENCES knowledge.security_consideration(id) ON DELETE CASCADE` | `knowledge.security_consideration` |
| `claim_technical_record_solution_pattern_id_fkey` | `foreign_key` | `FOREIGN KEY (solution_pattern_id) REFERENCES knowledge.solution_pattern(id) ON DELETE CASCADE` | `knowledge.solution_pattern` |
| `claim_technical_record_technical_problem_id_fkey` | `foreign_key` | `FOREIGN KEY (technical_problem_id) REFERENCES knowledge.technical_problem(id) ON DELETE CASCADE` | `knowledge.technical_problem` |
| `claim_technical_record_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_technical_record_advanced_usage_pattern_id_fkey` | `knowledge.advanced_usage_pattern` | `FOREIGN KEY (advanced_usage_pattern_id) REFERENCES knowledge.advanced_usage_pattern(id) ON DELETE CASCADE` |
| `claim_technical_record_benchmark_result_id_fkey` | `knowledge.benchmark_result` | `FOREIGN KEY (benchmark_result_id) REFERENCES knowledge.benchmark_result(id) ON DELETE CASCADE` |
| `claim_technical_record_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_technical_record_compatibility_constraint_id_fkey` | `knowledge.compatibility_constraint` | `FOREIGN KEY (compatibility_constraint_id) REFERENCES knowledge.compatibility_constraint(id) ON DELETE CASCADE` |
| `claim_technical_record_failure_mode_id_fkey` | `knowledge.failure_mode` | `FOREIGN KEY (failure_mode_id) REFERENCES knowledge.failure_mode(id) ON DELETE CASCADE` |
| `claim_technical_record_implementation_example_id_fkey` | `knowledge.implementation_example` | `FOREIGN KEY (implementation_example_id) REFERENCES knowledge.implementation_example(id) ON DELETE CASCADE` |
| `claim_technical_record_operational_practice_id_fkey` | `knowledge.operational_practice` | `FOREIGN KEY (operational_practice_id) REFERENCES knowledge.operational_practice(id) ON DELETE CASCADE` |
| `claim_technical_record_security_consideration_id_fkey` | `knowledge.security_consideration` | `FOREIGN KEY (security_consideration_id) REFERENCES knowledge.security_consideration(id) ON DELETE CASCADE` |
| `claim_technical_record_solution_pattern_id_fkey` | `knowledge.solution_pattern` | `FOREIGN KEY (solution_pattern_id) REFERENCES knowledge.solution_pattern(id) ON DELETE CASCADE` |
| `claim_technical_record_technical_problem_id_fkey` | `knowledge.technical_problem` | `FOREIGN KEY (technical_problem_id) REFERENCES knowledge.technical_problem(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_technical_record_claim_idx` | `CREATE INDEX claim_technical_record_claim_idx ON evidence.claim_technical_record USING btree (claim_id)` |
| `claim_technical_record_kind_idx` | `CREATE INDEX claim_technical_record_kind_idx ON evidence.claim_technical_record USING btree (record_kind)` |
| `claim_technical_record_pkey` | `CREATE UNIQUE INDEX claim_technical_record_pkey ON evidence.claim_technical_record USING btree (id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `claim_entity_association_immutable` | `util.reject_mutation` | `CREATE TRIGGER claim_entity_association_immutable BEFORE DELETE OR UPDATE ON evidence.claim_technical_record FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |
| `claim_entity_association_proposed` | `evidence.enforce_claim_association_proposed` | `CREATE TRIGGER claim_entity_association_proposed BEFORE INSERT ON evidence.claim_technical_record FOR EACH ROW EXECUTE FUNCTION evidence.enforce_claim_association_proposed()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: api
relation: technical_record_search
qualified_name: api.technical_record_search
kind: view
---

# api.technical_record_search

Database view api.technical_record_search.

## Quick facts

- Kind: `view`
- TypeScript row: `Database["api"]["Views"]["technical_record_search"]["Row"]`
- Row-level security: disabled
- Search tokens: `api technical_record_search api.technical_record_search record_kind id title statement scope maturity assurance_level confidence revalidation_state next_revalidation_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `record_kind` | `text` | yes | — | — |
| 2 | `id` | `uuid` | yes | — | — |
| 3 | `title` | `text` | yes | — | — |
| 4 | `statement` | `text` | yes | — | — |
| 5 | `scope` | `jsonb` | yes | — | — |
| 6 | `maturity` | `knowledge.maturity` | yes | — | — |
| 7 | `assurance_level` | `text` | yes | — | — |
| 8 | `confidence` | `corpus.confidence` | yes | — | — |
| 9 | `revalidation_state` | `knowledge.revalidation_state` | yes | — | — |
| 10 | `next_revalidation_at` | `timestamp with time zone` | yes | — | — |
| 11 | `updated_at` | `timestamp with time zone` | yes | — | — |

## Constraints

_None._

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

_None._

## Indexes

_None._

## RLS policies

_None._

## View definition

```sql
SELECT record_kind,
    id,
    title,
    statement,
    scope,
    maturity,
    assurance_level,
    confidence,
    revalidation_state,
    next_revalidation_at,
    updated_at
   FROM ( SELECT 'technical_problem'::text AS record_kind,
            technical_problem.id,
            technical_problem.title,
            technical_problem.statement,
            technical_problem.scope,
            technical_problem.maturity,
            technical_problem.assurance_level,
            technical_problem.confidence,
            technical_problem.revalidation_state,
            technical_problem.next_revalidation_at,
            technical_problem.updated_at
           FROM knowledge.technical_problem
        UNION ALL
         SELECT 'solution_pattern'::text,
            solution_pattern.id,
            solution_pattern.title,
            solution_pattern.statement,
            solution_pattern.scope,
            solution_pattern.maturity,
            solution_pattern.assurance_level,
            solution_pattern.confidence,
            solution_pattern.revalidation_state,
            solution_pattern.next_revalidation_at,
            solution_pattern.updated_at
           FROM knowledge.solution_pattern
        UNION ALL
         SELECT 'advanced_usage_pattern'::text,
            advanced_usage_pattern.id,
            advanced_usage_pattern.title,
            advanced_usage_pattern.statement,
            advanced_usage_pattern.scope,
            advanced_usage_pattern.maturity,
            advanced_usage_pattern.assurance_level,
            advanced_usage_pattern.confidence,
            advanced_usage_pattern.revalidation_state,
            advanced_usage_pattern.next_revalidation_at,
            advanced_usage_pattern.updated_at
           FROM knowledge.advanced_usage_pattern
        UNION ALL
         SELECT 'implementation_example'::text,
            implementation_example.id,
            implementation_example.title,
            implementation_example.statement,
            implementation_example.scope,
            implementation_example.maturity,
            implementation_example.assurance_level,
            implementation_example.confidence,
            implementation_example.revalidation_state,
            implementation_example.next_revalidation_at,
            implementation_example.updated_at
           FROM knowledge.implementation_example
        UNION ALL
         SELECT 'failure_mode'::text,
            failure_mode.id,
            failure_mode.title,
            failure_mode.statement,
            failure_mode.scope,
            failure_mode.maturity,
            failure_mode.assurance_level,
            failure_mode.confidence,
            failure_mode.revalidation_state,
            failure_mode.next_revalidation_at,
            failure_mode.updated_at
           FROM knowledge.failure_mode
        UNION ALL
         SELECT 'benchmark_result'::text,
            benchmark_result.id,
            benchmark_result.title,
            benchmark_result.statement,
            benchmark_result.scope,
            benchmark_result.maturity,
            benchmark_result.assurance_level,
            benchmark_result.confidence,
            benchmark_result.revalidation_state,
            benchmark_result.next_revalidation_at,
            benchmark_result.updated_at
           FROM knowledge.benchmark_result
        UNION ALL
         SELECT 'compatibility_constraint'::text,
            compatibility_constraint.id,
            compatibility_constraint.title,
            compatibility_constraint.statement,
            compatibility_constraint.scope,
            compatibility_constraint.maturity,
            compatibility_constraint.assurance_level,
            compatibility_constraint.confidence,
            compatibility_constraint.revalidation_state,
            compatibility_constraint.next_revalidation_at,
            compatibility_constraint.updated_at
           FROM knowledge.compatibility_constraint
        UNION ALL
         SELECT 'operational_practice'::text,
            operational_practice.id,
            operational_practice.title,
            operational_practice.statement,
            operational_practice.scope,
            operational_practice.maturity,
            operational_practice.assurance_level,
            operational_practice.confidence,
            operational_practice.revalidation_state,
            operational_practice.next_revalidation_at,
            operational_practice.updated_at
           FROM knowledge.operational_practice
        UNION ALL
         SELECT 'security_consideration'::text,
            security_consideration.id,
            security_consideration.title,
            security_consideration.statement,
            security_consideration.scope,
            security_consideration.maturity,
            security_consideration.assurance_level,
            security_consideration.confidence,
            security_consideration.revalidation_state,
            security_consideration.next_revalidation_at,
            security_consideration.updated_at
           FROM knowledge.security_consideration) r;
```

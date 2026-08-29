---
schema: api
relation: lesson_freshness
qualified_name: api.lesson_freshness
kind: view
---

# api.lesson_freshness

Database view api.lesson_freshness.

## Quick facts

- Kind: `view`
- TypeScript row: `Database["api"]["Views"]["lesson_freshness"]["Row"]`
- Row-level security: disabled
- Search tokens: `api lesson_freshness api.lesson_freshness lesson_id slug title version status backing_records stale_records freshness`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `lesson_id` | `uuid` | yes | — | — |
| 2 | `slug` | `text` | yes | — | — |
| 3 | `title` | `text` | yes | — | — |
| 4 | `version` | `integer` | yes | — | — |
| 5 | `status` | `curriculum.publish_status` | yes | — | — |
| 6 | `backing_records` | `bigint` | yes | — | — |
| 7 | `stale_records` | `bigint` | yes | — | — |
| 8 | `freshness` | `text` | yes | — | — |

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
SELECT l.id AS lesson_id,
    l.slug,
    l.title,
    lv.version,
    lv.status,
    count(b.id) AS backing_records,
    count(b.id) FILTER (WHERE tr.revalidation_state = ANY (ARRAY['stale'::knowledge.revalidation_state, 'failed'::knowledge.revalidation_state])) AS stale_records,
        CASE
            WHEN count(b.id) = 0 THEN 'unbacked'::text
            WHEN count(b.id) FILTER (WHERE tr.revalidation_state = ANY (ARRAY['stale'::knowledge.revalidation_state, 'failed'::knowledge.revalidation_state])) > 0 THEN 'stale'::text
            WHEN count(b.id) FILTER (WHERE tr.revalidation_state = 'due'::knowledge.revalidation_state) > 0 THEN 'due'::text
            ELSE 'fresh'::text
        END AS freshness
   FROM curriculum.lesson l
     JOIN curriculum.lesson_version lv ON lv.lesson_id = l.id
     LEFT JOIN curriculum.lesson_backed_by b ON b.lesson_version_id = lv.id
     LEFT JOIN api.technical_record_search tr ON tr.record_kind = b.record_kind AND tr.id = COALESCE(b.technical_problem_id, b.solution_pattern_id, b.advanced_usage_pattern_id, b.implementation_example_id, b.failure_mode_id, b.benchmark_result_id, b.compatibility_constraint_id, b.operational_practice_id, b.security_consideration_id)
  GROUP BY l.id, l.slug, l.title, lv.version, lv.status;
```

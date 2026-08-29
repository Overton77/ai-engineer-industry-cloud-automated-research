---
schema: api
relation: mission_progress
qualified_name: api.mission_progress
kind: view
---

# api.mission_progress

Database view api.mission_progress.

## Quick facts

- Kind: `view`
- TypeScript row: `Database["api"]["Views"]["mission_progress"]["Row"]`
- Row-level security: disabled
- Search tokens: `api mission_progress api.mission_progress mission_id slug goal status started_at ended_at work_items succeeded failed outstanding cost_usd budget_cost_usd`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `mission_id` | `uuid` | yes | — | — |
| 2 | `slug` | `text` | yes | — | — |
| 3 | `goal` | `text` | yes | — | — |
| 4 | `status` | `orchestration.mission_status` | yes | — | — |
| 5 | `started_at` | `timestamp with time zone` | yes | — | — |
| 6 | `ended_at` | `timestamp with time zone` | yes | — | — |
| 7 | `work_items` | `bigint` | yes | — | — |
| 8 | `succeeded` | `bigint` | yes | — | — |
| 9 | `failed` | `bigint` | yes | — | — |
| 10 | `outstanding` | `bigint` | yes | — | — |
| 11 | `cost_usd` | `numeric` | yes | — | — |
| 12 | `budget_cost_usd` | `numeric(12,4)` | yes | — | — |

## Constraints

_None._

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

_None._

## Indexes

_None._

## Triggers

_None._

## RLS policies

_None._

## View definition

```sql
SELECT m.id AS mission_id,
    m.slug,
    m.goal,
    m.status,
    m.started_at,
    m.ended_at,
    count(w.id) AS work_items,
    count(w.id) FILTER (WHERE w.status = 'succeeded'::orchestration.work_item_status) AS succeeded,
    count(w.id) FILTER (WHERE w.status = 'failed'::orchestration.work_item_status) AS failed,
    count(w.id) FILTER (WHERE w.status = ANY (ARRAY['pending'::orchestration.work_item_status, 'ready'::orchestration.work_item_status, 'running'::orchestration.work_item_status])) AS outstanding,
    COALESCE(sum(u.cost_usd), 0::numeric) AS cost_usd,
    m.budget_cost_usd
   FROM orchestration.mission m
     LEFT JOIN orchestration.work_item w ON w.mission_id = m.id
     LEFT JOIN observability.usage_rollup u ON u.mission_id = m.id
  GROUP BY m.id;
```

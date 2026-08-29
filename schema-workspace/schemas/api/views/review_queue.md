---
schema: api
relation: review_queue
qualified_name: api.review_queue
kind: view
---

# api.review_queue

Database view api.review_queue.

## Quick facts

- Kind: `view`
- TypeScript row: `Database["api"]["Views"]["review_queue"]["Row"]`
- Row-level security: disabled
- Search tokens: `api review_queue api.review_queue review_task_id task_kind state priority assignee summary subject_kind quorum_required created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `review_task_id` | `uuid` | yes | — | — |
| 2 | `task_kind` | `text` | yes | — | — |
| 3 | `state` | `evaluation.review_state` | yes | — | — |
| 4 | `priority` | `integer` | yes | — | — |
| 5 | `assignee` | `text` | yes | — | — |
| 6 | `summary` | `text` | yes | — | — |
| 7 | `subject_kind` | `text` | yes | — | — |
| 8 | `quorum_required` | `integer` | yes | — | — |
| 9 | `created_at` | `timestamp with time zone` | yes | — | — |
| 10 | `updated_at` | `timestamp with time zone` | yes | — | — |

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
SELECT id AS review_task_id,
    task_kind,
    state,
    priority,
    assignee,
    summary,
    subject_kind,
    quorum_required,
    created_at,
    updated_at
   FROM evaluation.review_task
  WHERE state = ANY (ARRAY['open'::evaluation.review_state, 'claimed'::evaluation.review_state, 'in_review'::evaluation.review_state]);
```

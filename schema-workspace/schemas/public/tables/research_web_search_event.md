---
schema: public
relation: research_web_search_event
qualified_name: public.research_web_search_event
kind: table
---

# public.research_web_search_event

Database table public.research_web_search_event.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_web_search_event"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_web_search_event public.research_web_search_event search_event_id run_id subagent query provider searched_at result_urls selected_urls search_purpose`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `search_event_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `run_id` | `uuid` | no | — | — |
| 3 | `subagent` | `text` | no | — | — |
| 4 | `query` | `text` | no | — | — |
| 5 | `provider` | `text` | no | `'exa'::text` | — |
| 6 | `searched_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 7 | `result_urls` | `jsonb` | no | `'[]'::jsonb` | — |
| 8 | `selected_urls` | `jsonb` | no | `'[]'::jsonb` | — |
| 9 | `search_purpose` | `text` | no | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_web_search_event_result_urls_check` | `check` | `CHECK (jsonb_typeof(result_urls) = 'array'::text)` | — |
| `research_web_search_event_selected_urls_check` | `check` | `CHECK (jsonb_typeof(selected_urls) = 'array'::text)` | — |
| `research_web_search_event_run_id_fkey` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` | `research_pre_research_run` |
| `research_web_search_event_pkey` | `primary_key` | `PRIMARY KEY (search_event_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_web_search_event_run_id_fkey` | `research_pre_research_run` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_web_search_event_pkey` | `CREATE UNIQUE INDEX research_web_search_event_pkey ON public.research_web_search_event USING btree (search_event_id)` |
| `research_web_search_event_run_idx` | `CREATE INDEX research_web_search_event_run_idx ON public.research_web_search_event USING btree (run_id, searched_at)` |

## RLS policies

_None._

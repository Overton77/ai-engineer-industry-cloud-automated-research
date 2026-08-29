---
schema: public
relation: research_pre_research_session
qualified_name: public.research_pre_research_session
kind: table
---

# public.research_pre_research_session

Database table public.research_pre_research_session.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_pre_research_session"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_pre_research_session public.research_pre_research_session pre_research_session_id run_id phase attempt eve_session_id status started_at completed_at error_code error_detail result_summary`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `pre_research_session_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `run_id` | `uuid` | no | — | — |
| 3 | `phase` | `text` | no | — | — |
| 4 | `attempt` | `integer` | no | — | — |
| 5 | `eve_session_id` | `text` | no | — | — |
| 6 | `status` | `text` | no | — | — |
| 7 | `started_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 8 | `completed_at` | `timestamp with time zone` | yes | — | — |
| 9 | `error_code` | `text` | yes | — | — |
| 10 | `error_detail` | `text` | yes | — | — |
| 11 | `result_summary` | `jsonb` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_pre_research_session_attempt_check` | `check` | `CHECK (attempt >= 1)` | — |
| `research_pre_research_session_phase_check` | `check` | `CHECK (phase = ANY (ARRAY['research'::text, 'synthesis'::text]))` | — |
| `research_pre_research_session_status_check` | `check` | `CHECK (status = ANY (ARRAY['started'::text, 'completed'::text, 'failed'::text, 'cancelled'::text]))` | — |
| `research_pre_research_session_run_id_fkey` | `foreign_key` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` | `research_pre_research_run` |
| `research_pre_research_session_pkey` | `primary_key` | `PRIMARY KEY (pre_research_session_id)` | — |
| `research_pre_research_session_eve_session_id_key` | `unique` | `UNIQUE (eve_session_id)` | — |
| `research_pre_research_session_run_id_phase_attempt_key` | `unique` | `UNIQUE (run_id, phase, attempt)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_pre_research_session_run_id_fkey` | `research_pre_research_run` | `FOREIGN KEY (run_id) REFERENCES research_pre_research_run(run_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_pre_research_session_eve_session_id_key` | `CREATE UNIQUE INDEX research_pre_research_session_eve_session_id_key ON public.research_pre_research_session USING btree (eve_session_id)` |
| `research_pre_research_session_pkey` | `CREATE UNIQUE INDEX research_pre_research_session_pkey ON public.research_pre_research_session USING btree (pre_research_session_id)` |
| `research_pre_research_session_run_id_phase_attempt_key` | `CREATE UNIQUE INDEX research_pre_research_session_run_id_phase_attempt_key ON public.research_pre_research_session USING btree (run_id, phase, attempt)` |
| `research_pre_research_session_run_idx` | `CREATE INDEX research_pre_research_session_run_idx ON public.research_pre_research_session USING btree (run_id, phase, attempt DESC)` |

## RLS policies

_None._

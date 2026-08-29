---
schema: public
relation: factory_trace_span_ref
qualified_name: public.factory_trace_span_ref
kind: table
---

# public.factory_trace_span_ref

Database table public.factory_trace_span_ref.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_trace_span_ref"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_trace_span_ref public.factory_trace_span_ref factory_trace_span_ref_id factory_episode_id trace_id span_id parent_span_id agent_role operation_name artifact_id started_at finished_at attributes`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_trace_span_ref_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `factory_episode_id` | `uuid` | no | — | — |
| 3 | `trace_id` | `text` | no | — | — |
| 4 | `span_id` | `text` | no | — | — |
| 5 | `parent_span_id` | `text` | yes | — | — |
| 6 | `agent_role` | `text` | yes | — | — |
| 7 | `operation_name` | `text` | no | — | — |
| 8 | `artifact_id` | `uuid` | yes | — | — |
| 9 | `started_at` | `timestamp with time zone` | yes | — | — |
| 10 | `finished_at` | `timestamp with time zone` | yes | — | — |
| 11 | `attributes` | `jsonb` | no | `'{}'::jsonb` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_trace_span_ref_artifact_id_fkey` | `foreign_key` | `FOREIGN KEY (artifact_id) REFERENCES factory_artifact(factory_artifact_id) ON DELETE SET NULL` | `factory_artifact` |
| `factory_trace_span_ref_factory_episode_id_fkey` | `foreign_key` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` | `factory_episode` |
| `factory_trace_span_ref_pkey` | `primary_key` | `PRIMARY KEY (factory_trace_span_ref_id)` | — |
| `factory_trace_span_uniq` | `unique` | `UNIQUE (trace_id, span_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_trace_span_ref_artifact_id_fkey` | `factory_artifact` | `FOREIGN KEY (artifact_id) REFERENCES factory_artifact(factory_artifact_id) ON DELETE SET NULL` |
| `factory_trace_span_ref_factory_episode_id_fkey` | `factory_episode` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `factory_trace_span_ref_pkey` | `CREATE UNIQUE INDEX factory_trace_span_ref_pkey ON public.factory_trace_span_ref USING btree (factory_trace_span_ref_id)` |
| `factory_trace_span_uniq` | `CREATE UNIQUE INDEX factory_trace_span_uniq ON public.factory_trace_span_ref USING btree (trace_id, span_id)` |

## Triggers

_None._

## RLS policies

_None._

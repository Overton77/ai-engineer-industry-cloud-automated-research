---
schema: public
relation: research_ingestion_intent_event
qualified_name: public.research_ingestion_intent_event
kind: table
---

# public.research_ingestion_intent_event

Database table public.research_ingestion_intent_event.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_ingestion_intent_event"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_ingestion_intent_event public.research_ingestion_intent_event event_id intent_id operation_index operation_kind status affected_table affected_key error_detail created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `event_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `intent_id` | `uuid` | no | — | — |
| 3 | `operation_index` | `integer` | no | — | — |
| 4 | `operation_kind` | `text` | no | — | — |
| 5 | `status` | `research_intent_event_status` | no | — | — |
| 6 | `affected_table` | `text` | yes | — | — |
| 7 | `affected_key` | `text` | yes | — | — |
| 8 | `error_detail` | `text` | yes | — | — |
| 9 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_ingestion_intent_event_operation_index_check` | `check` | `CHECK (operation_index >= 0)` | — |
| `research_ingestion_intent_event_intent_id_fkey` | `foreign_key` | `FOREIGN KEY (intent_id) REFERENCES research_ingestion_intent(intent_id) ON DELETE CASCADE` | `research_ingestion_intent` |
| `research_ingestion_intent_event_pkey` | `primary_key` | `PRIMARY KEY (event_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_ingestion_intent_event_intent_id_fkey` | `research_ingestion_intent` | `FOREIGN KEY (intent_id) REFERENCES research_ingestion_intent(intent_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_ingestion_intent_event_intent_idx` | `CREATE INDEX research_ingestion_intent_event_intent_idx ON public.research_ingestion_intent_event USING btree (intent_id, operation_index)` |
| `research_ingestion_intent_event_pkey` | `CREATE UNIQUE INDEX research_ingestion_intent_event_pkey ON public.research_ingestion_intent_event USING btree (event_id)` |

## RLS policies

_None._

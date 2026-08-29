---
schema: public
relation: factory_runtime_event
qualified_name: public.factory_runtime_event
kind: table
---

# public.factory_runtime_event

Append-only, redacted copy of Eve root-agent durable stream events. Eve event ids provide idempotency; session ids bind events to factory episodes.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_runtime_event"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_runtime_event public.factory_runtime_event eve_event_id factory_episode_id eve_session_id event_type event_data event_meta payload_sha256 payload_byte_size redaction_version payload_truncated agent_name agent_node_id channel_kind subagent_name call_id emitted_at ingested_at event_ordinal repository issue_number sensitivity_class retention_until`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `eve_event_id` | `text` | no | — | — |
| 2 | `factory_episode_id` | `uuid` | no | — | — |
| 3 | `eve_session_id` | `text` | no | — | — |
| 4 | `event_type` | `text` | no | — | — |
| 5 | `event_data` | `jsonb` | yes | — | — |
| 6 | `event_meta` | `jsonb` | no | — | — |
| 7 | `payload_sha256` | `text` | no | — | — |
| 8 | `payload_byte_size` | `bigint` | no | — | — |
| 9 | `redaction_version` | `text` | no | `'factory-event-redaction-v1'::text` | — |
| 10 | `payload_truncated` | `boolean` | no | `false` | — |
| 11 | `agent_name` | `text` | no | — | — |
| 12 | `agent_node_id` | `text` | yes | — | — |
| 13 | `channel_kind` | `text` | yes | — | — |
| 14 | `subagent_name` | `text` | yes | — | — |
| 15 | `call_id` | `text` | yes | — | — |
| 16 | `emitted_at` | `timestamp with time zone` | no | — | — |
| 17 | `ingested_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 18 | `event_ordinal` | `bigint` | no | — | Episode-local total order allocated under a Postgres advisory lock. |
| 19 | `repository` | `text` | yes | — | — |
| 20 | `issue_number` | `bigint` | yes | — | — |
| 21 | `sensitivity_class` | `text` | no | `'confidential'::text` | — |
| 22 | `retention_until` | `timestamp with time zone` | no | `(timezone('utc'::text, now()) + '30 days'::interval)` | Governed retention boundary; payload erasure requires a separately audited process. |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_runtime_event_digest_check` | `check` | `CHECK (payload_sha256 ~ '^sha256:[0-9a-f]{64}$'::text)` | — |
| `factory_runtime_event_ordinal_positive` | `check` | `CHECK (event_ordinal > 0)` | — |
| `factory_runtime_event_sensitivity_check` | `check` | `CHECK (sensitivity_class = ANY (ARRAY['internal'::text, 'confidential'::text, 'restricted'::text]))` | — |
| `factory_runtime_event_size_check` | `check` | `CHECK (payload_byte_size >= 0)` | — |
| `factory_runtime_event_factory_episode_id_fkey` | `foreign_key` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE RESTRICT` | `factory_episode` |
| `factory_runtime_event_pkey` | `primary_key` | `PRIMARY KEY (eve_event_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_runtime_event_factory_episode_id_fkey` | `factory_episode` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE RESTRICT` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `factory_runtime_event_episode_idx` | `CREATE INDEX factory_runtime_event_episode_idx ON public.factory_runtime_event USING btree (factory_episode_id, emitted_at, eve_event_id)` |
| `factory_runtime_event_episode_ordinal_uniq` | `CREATE UNIQUE INDEX factory_runtime_event_episode_ordinal_uniq ON public.factory_runtime_event USING btree (factory_episode_id, event_ordinal)` |
| `factory_runtime_event_pkey` | `CREATE UNIQUE INDEX factory_runtime_event_pkey ON public.factory_runtime_event USING btree (eve_event_id)` |
| `factory_runtime_event_session_idx` | `CREATE INDEX factory_runtime_event_session_idx ON public.factory_runtime_event USING btree (eve_session_id, emitted_at, eve_event_id)` |
| `factory_runtime_event_station_idx` | `CREATE INDEX factory_runtime_event_station_idx ON public.factory_runtime_event USING btree (subagent_name, emitted_at) WHERE (subagent_name IS NOT NULL)` |

## RLS policies

_None._

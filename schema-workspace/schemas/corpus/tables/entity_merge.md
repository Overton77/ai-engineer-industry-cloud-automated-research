---
schema: corpus
relation: entity_merge
qualified_name: corpus.entity_merge
kind: table
---

# corpus.entity_merge

Merge history for canonical entities. The review that authorized a merge is found through evaluation.review_task.entity_merge_id, never by a column here -- corpus must not reference evaluation.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["entity_merge"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus entity_merge corpus.entity_merge id entity_kind winner_id loser_id merge_reason created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `entity_kind` | `text` | no | — | — |
| 3 | `winner_id` | `uuid` | no | — | — |
| 4 | `loser_id` | `uuid` | no | — | — |
| 5 | `merge_reason` | `text` | no | — | — |
| 7 | `created_by_receipt_id` | `uuid` | no | — | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `entity_merge_distinct` | `check` | `CHECK (winner_id <> loser_id)` | — |
| `entity_merge_kind` | `check` | `CHECK (entity_kind = ANY (ARRAY['organization'::text, 'person'::text, 'library'::text, 'repository'::text, 'paper'::text, 'talk'::text, 'video'::text, 'product'::text, 'concept'::text, 'dataset'::text, 'benchmark'::text, 'ai_model'::text, 'ai_protocol'::text, 'mcp_server'::text, 'agent_skill'::text]))` | — |
| `entity_merge_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `entity_merge_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `entity_merge_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `entity_merge_loser_idx` | `CREATE INDEX entity_merge_loser_idx ON corpus.entity_merge USING btree (entity_kind, loser_id)` |
| `entity_merge_pkey` | `CREATE UNIQUE INDEX entity_merge_pkey ON corpus.entity_merge USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

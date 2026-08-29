---
schema: evidence
relation: source_support
qualified_name: evidence.source_support
kind: table
---

# evidence.source_support

Why a retrieval mattered to an operation. This is an operational audit statement, not a canonical factual claim.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["source_support"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence source_support evidence.source_support id tenant_id retrieval_id work_item_id operation support_role statement locator_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `retrieval_id` | `uuid` | no | — | — |
| 4 | `work_item_id` | `uuid` | no | — | — |
| 5 | `operation` | `text` | no | — | — |
| 6 | `support_role` | `text` | no | — | — |
| 7 | `statement` | `text` | no | — | — |
| 8 | `locator_id` | `uuid` | yes | — | — |
| 9 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `source_support_nonempty` | `check` | `CHECK (btrim(operation) <> ''::text AND btrim(statement) <> ''::text)` | — |
| `source_support_support_role_check` | `check` | `CHECK (support_role = ANY (ARRAY['supports'::text, 'challenges'::text, 'context'::text, 'background'::text, 'discarded'::text]))` | — |
| `source_support_locator_id_fkey` | `foreign_key` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` | [`evidence.locator`](../../evidence/tables/locator.md) |
| `source_support_retrieval_id_fkey` | `foreign_key` | `FOREIGN KEY (retrieval_id) REFERENCES evidence.source_retrieval(id) ON DELETE CASCADE` | [`evidence.source_retrieval`](../../evidence/tables/source_retrieval.md) |
| `source_support_work_item_id_fkey` | `foreign_key` | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) |
| `source_support_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `source_support_retrieval_id_work_item_id_operation_support__key` | `unique` | `UNIQUE (retrieval_id, work_item_id, operation, support_role, statement)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `source_support_locator_id_fkey` | [`evidence.locator`](../../evidence/tables/locator.md) | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| `source_support_retrieval_id_fkey` | [`evidence.source_retrieval`](../../evidence/tables/source_retrieval.md) | `FOREIGN KEY (retrieval_id) REFERENCES evidence.source_retrieval(id) ON DELETE CASCADE` |
| `source_support_work_item_id_fkey` | [`orchestration.work_item`](../../orchestration/tables/work_item.md) | `FOREIGN KEY (work_item_id) REFERENCES orchestration.work_item(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `source_support_locator_idx` | `CREATE INDEX source_support_locator_idx ON evidence.source_support USING btree (locator_id) WHERE (locator_id IS NOT NULL)` |
| `source_support_pkey` | `CREATE UNIQUE INDEX source_support_pkey ON evidence.source_support USING btree (id)` |
| `source_support_retrieval_id_work_item_id_operation_support__key` | `CREATE UNIQUE INDEX source_support_retrieval_id_work_item_id_operation_support__key ON evidence.source_support USING btree (retrieval_id, work_item_id, operation, support_role, statement)` |
| `source_support_retrieval_idx` | `CREATE INDEX source_support_retrieval_idx ON evidence.source_support USING btree (retrieval_id)` |
| `source_support_work_item_idx` | `CREATE INDEX source_support_work_item_idx ON evidence.source_support USING btree (work_item_id, operation, created_at)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `source_support_immutable` | `util.reject_mutation` | `CREATE TRIGGER source_support_immutable BEFORE DELETE OR UPDATE ON evidence.source_support FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

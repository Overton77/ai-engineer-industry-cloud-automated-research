---
schema: public
relation: factory_canary_result
qualified_name: public.factory_canary_result
kind: table
---

# public.factory_canary_result

Database table public.factory_canary_result.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_canary_result"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_canary_result public.factory_canary_result factory_canary_result_id promotion_decision_id traffic_fraction started_at finished_at status metrics rollback_reason created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_canary_result_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `promotion_decision_id` | `uuid` | no | — | — |
| 3 | `traffic_fraction` | `numeric` | no | — | — |
| 4 | `started_at` | `timestamp with time zone` | no | — | — |
| 5 | `finished_at` | `timestamp with time zone` | yes | — | — |
| 6 | `status` | `text` | no | `'running'::text` | — |
| 7 | `metrics` | `jsonb` | no | `'{}'::jsonb` | — |
| 8 | `rollback_reason` | `text` | yes | — | — |
| 9 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_canary_fraction_check` | `check` | `CHECK (traffic_fraction > 0::numeric AND traffic_fraction <= 1::numeric)` | — |
| `factory_canary_status_check` | `check` | `CHECK (status = ANY (ARRAY['running'::text, 'passed'::text, 'failed'::text, 'rolled_back'::text, 'cancelled'::text]))` | — |
| `factory_canary_result_promotion_decision_id_fkey` | `foreign_key` | `FOREIGN KEY (promotion_decision_id) REFERENCES factory_promotion_decision(factory_promotion_decision_id) ON DELETE CASCADE` | `factory_promotion_decision` |
| `factory_canary_result_pkey` | `primary_key` | `PRIMARY KEY (factory_canary_result_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_canary_result_promotion_decision_id_fkey` | `factory_promotion_decision` | `FOREIGN KEY (promotion_decision_id) REFERENCES factory_promotion_decision(factory_promotion_decision_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `factory_canary_result_pkey` | `CREATE UNIQUE INDEX factory_canary_result_pkey ON public.factory_canary_result USING btree (factory_canary_result_id)` |

## RLS policies

_None._

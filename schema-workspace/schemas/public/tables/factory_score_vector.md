---
schema: public
relation: factory_score_vector
qualified_name: public.factory_score_vector
kind: table
---

# public.factory_score_vector

Database table public.factory_score_vector.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_score_vector"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_score_vector public.factory_score_vector factory_score_vector_id factory_episode_id reward_contract_version vector weighted_score eligible_for_promotion ineligibility_reasons created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_score_vector_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `factory_episode_id` | `uuid` | no | — | — |
| 3 | `reward_contract_version` | `text` | no | — | — |
| 4 | `vector` | `jsonb` | no | — | — |
| 5 | `weighted_score` | `numeric` | yes | — | — |
| 6 | `eligible_for_promotion` | `boolean` | no | `false` | — |
| 7 | `ineligibility_reasons` | `text[]` | no | `'{}'::text[]` | — |
| 8 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_score_weighted_check` | `check` | `CHECK (weighted_score IS NULL OR weighted_score >= 0::numeric AND weighted_score <= 1::numeric)` | — |
| `factory_score_vector_factory_episode_id_fkey` | `foreign_key` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` | `factory_episode` |
| `factory_score_vector_pkey` | `primary_key` | `PRIMARY KEY (factory_score_vector_id)` | — |
| `factory_score_episode_contract_uniq` | `unique` | `UNIQUE (factory_episode_id, reward_contract_version)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_score_vector_factory_episode_id_fkey` | `factory_episode` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `factory_score_episode_contract_uniq` | `CREATE UNIQUE INDEX factory_score_episode_contract_uniq ON public.factory_score_vector USING btree (factory_episode_id, reward_contract_version)` |
| `factory_score_vector_pkey` | `CREATE UNIQUE INDEX factory_score_vector_pkey ON public.factory_score_vector USING btree (factory_score_vector_id)` |

## Triggers

_None._

## RLS policies

_None._

---
schema: public
relation: research_taxonomy_version
qualified_name: public.research_taxonomy_version
kind: table
---

# public.research_taxonomy_version

Versioned AI engineering taxonomy. Exactly one row may be active.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_taxonomy_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_taxonomy_version public.research_taxonomy_version taxonomy_version_id version status definition_sha256 created_at activated_at retired_at notes`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `taxonomy_version_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `version` | `text` | no | — | — |
| 3 | `status` | `research_taxonomy_status` | no | `'draft'::research_taxonomy_status` | — |
| 4 | `definition_sha256` | `text` | no | — | — |
| 5 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |
| 6 | `activated_at` | `timestamp with time zone` | yes | — | — |
| 7 | `retired_at` | `timestamp with time zone` | yes | — | — |
| 8 | `notes` | `text` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_taxonomy_version_sha256_check` | `check` | `CHECK (definition_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `research_taxonomy_version_pkey` | `primary_key` | `PRIMARY KEY (taxonomy_version_id)` | — |
| `research_taxonomy_version_version_key` | `unique` | `UNIQUE (version)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.research_category_definition`](../../public/tables/research_category_definition.md) | `research_category_definition_taxonomy_version_id_fkey` | `FOREIGN KEY (taxonomy_version_id) REFERENCES research_taxonomy_version(taxonomy_version_id) ON DELETE CASCADE` |
| [`public.research_pre_research_run`](../../public/tables/research_pre_research_run.md) | `research_pre_research_run_taxonomy_version_id_fkey` | `FOREIGN KEY (taxonomy_version_id) REFERENCES research_taxonomy_version(taxonomy_version_id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `research_taxonomy_version_one_active_uidx` | `CREATE UNIQUE INDEX research_taxonomy_version_one_active_uidx ON public.research_taxonomy_version USING btree (status) WHERE (status = 'active'::research_taxonomy_status)` |
| `research_taxonomy_version_pkey` | `CREATE UNIQUE INDEX research_taxonomy_version_pkey ON public.research_taxonomy_version USING btree (taxonomy_version_id)` |
| `research_taxonomy_version_version_key` | `CREATE UNIQUE INDEX research_taxonomy_version_version_key ON public.research_taxonomy_version USING btree (version)` |

## Triggers

_None._

## RLS policies

_None._

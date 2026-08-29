---
schema: public
relation: research_category_definition
qualified_name: public.research_category_definition
kind: table
---

# public.research_category_definition

Per-version definitions for the stable engineering category enum.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_category_definition"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_category_definition public.research_category_definition taxonomy_version_id category_code label description inclusion_criteria exclusion_criteria example_topics sort_order`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `taxonomy_version_id` | `uuid` | no | — | — |
| 2 | `category_code` | `research_engineering_category_code` | no | — | — |
| 3 | `label` | `text` | no | — | — |
| 4 | `description` | `text` | no | — | — |
| 5 | `inclusion_criteria` | `text[]` | no | `'{}'::text[]` | — |
| 6 | `exclusion_criteria` | `text[]` | no | `'{}'::text[]` | — |
| 7 | `example_topics` | `text[]` | no | `'{}'::text[]` | — |
| 8 | `sort_order` | `integer` | no | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_category_definition_taxonomy_version_id_fkey` | `foreign_key` | `FOREIGN KEY (taxonomy_version_id) REFERENCES research_taxonomy_version(taxonomy_version_id) ON DELETE CASCADE` | `research_taxonomy_version` |
| `research_category_definition_pkey` | `primary_key` | `PRIMARY KEY (taxonomy_version_id, category_code)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_category_definition_taxonomy_version_id_fkey` | `research_taxonomy_version` | `FOREIGN KEY (taxonomy_version_id) REFERENCES research_taxonomy_version(taxonomy_version_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_category_definition_pkey` | `CREATE UNIQUE INDEX research_category_definition_pkey ON public.research_category_definition USING btree (taxonomy_version_id, category_code)` |
| `research_category_definition_sort_idx` | `CREATE INDEX research_category_definition_sort_idx ON public.research_category_definition USING btree (taxonomy_version_id, sort_order)` |

## RLS policies

_None._

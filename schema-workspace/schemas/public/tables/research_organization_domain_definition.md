---
schema: public
relation: research_organization_domain_definition
qualified_name: public.research_organization_domain_definition
kind: table
---

# public.research_organization_domain_definition

Database table public.research_organization_domain_definition.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_organization_domain_definition"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_organization_domain_definition public.research_organization_domain_definition domain_code label description inclusion_criteria exclusion_criteria example_organizations active sort_order definition_version`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `domain_code` | `research_organization_domain_code` | no | — | — |
| 2 | `label` | `text` | no | — | — |
| 3 | `description` | `text` | no | — | — |
| 4 | `inclusion_criteria` | `text[]` | no | `'{}'::text[]` | — |
| 5 | `exclusion_criteria` | `text[]` | no | `'{}'::text[]` | — |
| 6 | `example_organizations` | `text[]` | no | `'{}'::text[]` | — |
| 7 | `active` | `boolean` | no | `true` | — |
| 8 | `sort_order` | `integer` | no | — | — |
| 9 | `definition_version` | `text` | no | `'1.0.0'::text` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_organization_domain_definition_pkey` | `primary_key` | `PRIMARY KEY (domain_code)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_organization_domain_definition_pkey` | `CREATE UNIQUE INDEX research_organization_domain_definition_pkey ON public.research_organization_domain_definition USING btree (domain_code)` |

## Triggers

_None._

## RLS policies

_None._

---
schema: public
relation: research_application_domain
qualified_name: public.research_application_domain
kind: table
---

# public.research_application_domain

Evolving application-domain lookup. Not a Postgres enum.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_application_domain"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_application_domain public.research_application_domain domain_code label description parent_domain_code active sort_order`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `domain_code` | `text` | no | — | — |
| 2 | `label` | `text` | no | — | — |
| 3 | `description` | `text` | no | — | — |
| 4 | `parent_domain_code` | `text` | yes | — | — |
| 5 | `active` | `boolean` | no | `true` | — |
| 6 | `sort_order` | `integer` | no | `100` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_application_domain_parent_domain_code_fkey` | `foreign_key` | `FOREIGN KEY (parent_domain_code) REFERENCES research_application_domain(domain_code)` | `research_application_domain` |
| `research_application_domain_pkey` | `primary_key` | `PRIMARY KEY (domain_code)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_application_domain_parent_domain_code_fkey` | `research_application_domain` | `FOREIGN KEY (parent_domain_code) REFERENCES research_application_domain(domain_code)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.research_application_domain`](../../public/tables/research_application_domain.md) | `research_application_domain_parent_domain_code_fkey` | `FOREIGN KEY (parent_domain_code) REFERENCES research_application_domain(domain_code)` |
| [`public.research_video_domain`](../../public/tables/research_video_domain.md) | `research_video_domain_domain_code_fkey` | `FOREIGN KEY (domain_code) REFERENCES research_application_domain(domain_code)` |

## Indexes

| Name | Definition |
| --- | --- |
| `research_application_domain_pkey` | `CREATE UNIQUE INDEX research_application_domain_pkey ON public.research_application_domain USING btree (domain_code)` |

## RLS policies

_None._

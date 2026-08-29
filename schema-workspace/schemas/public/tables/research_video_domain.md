---
schema: public
relation: research_video_domain
qualified_name: public.research_video_domain
kind: table
---

# public.research_video_domain

Database table public.research_video_domain.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_video_domain"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_video_domain public.research_video_domain analysis_id domain_code confidence rationale`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `analysis_id` | `uuid` | no | — | — |
| 2 | `domain_code` | `text` | no | — | — |
| 3 | `confidence` | `numeric(4,3)` | no | — | — |
| 4 | `rationale` | `text` | no | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_video_domain_confidence_check` | `check` | `CHECK (confidence >= 0::numeric AND confidence <= 1::numeric)` | — |
| `research_video_domain_analysis_id_fkey` | `foreign_key` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` | `research_video_analysis` |
| `research_video_domain_domain_code_fkey` | `foreign_key` | `FOREIGN KEY (domain_code) REFERENCES research_application_domain(domain_code)` | `research_application_domain` |
| `research_video_domain_pkey` | `primary_key` | `PRIMARY KEY (analysis_id, domain_code)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_video_domain_analysis_id_fkey` | `research_video_analysis` | `FOREIGN KEY (analysis_id) REFERENCES research_video_analysis(analysis_id) ON DELETE CASCADE` |
| `research_video_domain_domain_code_fkey` | `research_application_domain` | `FOREIGN KEY (domain_code) REFERENCES research_application_domain(domain_code)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_video_domain_pkey` | `CREATE UNIQUE INDEX research_video_domain_pkey ON public.research_video_domain USING btree (analysis_id, domain_code)` |

## RLS policies

_None._

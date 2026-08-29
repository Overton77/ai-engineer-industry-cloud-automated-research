---
schema: public
relation: research_organization_source
qualified_name: public.research_organization_source
kind: table
---

# public.research_organization_source

Database table public.research_organization_source.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["research_organization_source"]["Row"]`
- Row-level security: enabled
- Search tokens: `public research_organization_source public.research_organization_source organization_source_id organization_candidate_id source_rank source_role authority_tier title publisher url normalized_url publicly_retrievable retrieved_at source_published_at supports verification_status is_required_core_source evidence_id`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `organization_source_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `organization_candidate_id` | `uuid` | no | — | — |
| 3 | `source_rank` | `integer` | no | — | — |
| 4 | `source_role` | `text` | no | — | — |
| 5 | `authority_tier` | `text` | no | — | — |
| 6 | `title` | `text` | no | — | — |
| 7 | `publisher` | `text` | no | — | — |
| 8 | `url` | `text` | no | — | — |
| 9 | `normalized_url` | `text` | no | — | — |
| 10 | `publicly_retrievable` | `boolean` | no | — | — |
| 11 | `retrieved_at` | `timestamp with time zone` | no | — | — |
| 12 | `source_published_at` | `timestamp with time zone` | yes | — | — |
| 13 | `supports` | `jsonb` | no | `'[]'::jsonb` | — |
| 14 | `verification_status` | `research_verification_status` | no | — | — |
| 15 | `is_required_core_source` | `boolean` | no | `false` | — |
| 16 | `evidence_id` | `uuid` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `research_organization_source_authority_check` | `check` | `CHECK (authority_tier = ANY (ARRAY['first_party'::text, 'official_registry'::text, 'standards_body'::text, 'reputable_secondary'::text]))` | — |
| `research_organization_source_rank_check` | `check` | `CHECK (source_rank >= 1)` | — |
| `research_organization_source_role_check` | `check` | `CHECK (source_role = ANY (ARRAY['official_homepage'::text, 'official_about'::text, 'official_product'::text, 'official_documentation'::text, 'official_research'::text, 'official_model_or_system_card'::text, 'official_repository'::text, 'official_engineering_blog'::text, 'official_changelog'::text, 'official_press_release'::text, 'regulatory_or_company_registry'::text, 'standards_specification'::text, 'conference_primary_material'::text, 'reputable_secondary_context'::text]))` | — |
| `research_organization_source_supports_check` | `check` | `CHECK (jsonb_typeof(supports) = 'array'::text)` | — |
| `research_organization_source_evidence_id_fkey` | `foreign_key` | `FOREIGN KEY (evidence_id) REFERENCES research_evidence_anchor(evidence_id)` | `research_evidence_anchor` |
| `research_organization_source_organization_candidate_id_fkey` | `foreign_key` | `FOREIGN KEY (organization_candidate_id) REFERENCES research_organization_candidate(organization_candidate_id) ON DELETE CASCADE` | `research_organization_candidate` |
| `research_organization_source_pkey` | `primary_key` | `PRIMARY KEY (organization_source_id)` | — |
| `research_organization_source_organization_candidate_id_norm_key` | `unique` | `UNIQUE (organization_candidate_id, normalized_url)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `research_organization_source_evidence_id_fkey` | `research_evidence_anchor` | `FOREIGN KEY (evidence_id) REFERENCES research_evidence_anchor(evidence_id)` |
| `research_organization_source_organization_candidate_id_fkey` | `research_organization_candidate` | `FOREIGN KEY (organization_candidate_id) REFERENCES research_organization_candidate(organization_candidate_id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `research_organization_source_candidate_idx` | `CREATE INDEX research_organization_source_candidate_idx ON public.research_organization_source USING btree (organization_candidate_id, source_rank)` |
| `research_organization_source_organization_candidate_id_norm_key` | `CREATE UNIQUE INDEX research_organization_source_organization_candidate_id_norm_key ON public.research_organization_source USING btree (organization_candidate_id, normalized_url)` |
| `research_organization_source_pkey` | `CREATE UNIQUE INDEX research_organization_source_pkey ON public.research_organization_source USING btree (organization_source_id)` |

## RLS policies

_None._

---
schema: api
relation: library_profile
qualified_name: api.library_profile
kind: view
---

# api.library_profile

Database view api.library_profile.

## Quick facts

- Kind: `view`
- TypeScript row: `Database["api"]["Views"]["library_profile"]["Row"]`
- Row-level security: disabled
- Search tokens: `api library_profile api.library_profile id ecosystem package_name display_name description primary_language homepage_url first_released_on lifecycle_state current_license maintenance_status taxonomy_terms created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | yes | — | — |
| 2 | `ecosystem` | `text` | yes | — | — |
| 3 | `package_name` | `text` | yes | — | — |
| 4 | `display_name` | `text` | yes | — | — |
| 5 | `description` | `text` | yes | — | — |
| 6 | `primary_language` | `text` | yes | — | — |
| 7 | `homepage_url` | `text` | yes | — | — |
| 8 | `first_released_on` | `date` | yes | — | — |
| 9 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 10 | `current_license` | `text` | yes | — | — |
| 11 | `maintenance_status` | `text` | yes | — | — |
| 12 | `taxonomy_terms` | `jsonb` | yes | — | — |
| 13 | `created_at` | `timestamp with time zone` | yes | — | — |
| 14 | `updated_at` | `timestamp with time zone` | yes | — | — |

## Constraints

_None._

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

_None._

## Indexes

_None._

## Triggers

_None._

## RLS policies

_None._

## View definition

```sql
SELECT l.id,
    l.ecosystem,
    l.package_name,
    l.display_name,
    l.description,
    l.primary_language,
    l.homepage_url,
    l.first_released_on,
    l.lifecycle_state,
    lic.license_spdx AS current_license,
    ms.status AS maintenance_status,
    COALESCE(tax.terms, '[]'::jsonb) AS taxonomy_terms,
    l.created_at,
    l.updated_at
   FROM corpus.library l
     LEFT JOIN LATERAL ( SELECT f.license_spdx
           FROM corpus.library_license_fact f
          WHERE f.library_id = l.id AND f.valid_to IS NULL AND f.lifecycle_state::text = 'active'::text
          ORDER BY f.valid_from DESC
         LIMIT 1) lic ON true
     LEFT JOIN LATERAL ( SELECT f.status
           FROM corpus.library_maintenance_status_fact f
          WHERE f.library_id = l.id AND f.valid_to IS NULL AND f.lifecycle_state::text = 'active'::text
          ORDER BY f.valid_from DESC
         LIMIT 1) ms ON true
     LEFT JOIN LATERAL ( SELECT jsonb_agg(jsonb_build_object('facet', fa.slug, 'term', t.slug, 'label', t.label)) AS terms
           FROM taxonomy.assignment a
             JOIN taxonomy.term t ON t.id = a.term_id
             JOIN taxonomy.facet_version fv ON fv.id = t.facet_version_id
             JOIN taxonomy.facet fa ON fa.id = fv.facet_id
          WHERE a.library_id = l.id AND a.valid_to IS NULL) tax ON true
  WHERE l.lifecycle_state::text = 'active'::text;
```

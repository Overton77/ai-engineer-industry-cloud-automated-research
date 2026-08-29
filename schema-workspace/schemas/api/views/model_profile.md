---
schema: api
relation: model_profile
qualified_name: api.model_profile
kind: view
---

# api.model_profile

Database view api.model_profile.

## Quick facts

- Kind: `view`
- TypeScript row: `Database["api"]["Views"]["model_profile"]["Row"]`
- Row-level security: disabled
- Search tokens: `api model_profile api.model_profile id model_slug display_name family modality model_kind openness provider latest_version latest_released_on context_window_tokens availability created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | yes | — | — |
| 2 | `model_slug` | `text` | yes | — | — |
| 3 | `display_name` | `text` | yes | — | — |
| 4 | `family` | `text` | yes | — | — |
| 5 | `modality` | `text[]` | yes | — | — |
| 6 | `model_kind` | `text` | yes | — | — |
| 7 | `openness` | `text` | yes | — | — |
| 8 | `provider` | `text` | yes | — | — |
| 9 | `latest_version` | `text` | yes | — | — |
| 10 | `latest_released_on` | `date` | yes | — | — |
| 11 | `context_window_tokens` | `integer` | yes | — | — |
| 12 | `availability` | `text` | yes | — | — |
| 13 | `created_at` | `timestamp with time zone` | yes | — | — |

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
SELECT m.id,
    m.model_slug,
    m.display_name,
    m.family,
    m.modality,
    m.model_kind,
    m.openness,
    o.display_name AS provider,
    mv.version_label AS latest_version,
    mv.released_on AS latest_released_on,
    mv.context_window_tokens,
    av.availability,
    m.created_at
   FROM corpus.ai_model m
     JOIN corpus.organization o ON o.id = m.provider_organization_id
     LEFT JOIN LATERAL ( SELECT v.id,
            v.ai_model_id,
            v.version_label,
            v.released_on,
            v.context_window_tokens,
            v.max_output_tokens,
            v.knowledge_cutoff_on,
            v.deprecation_state,
            v.created_by_receipt_id,
            v.created_at
           FROM corpus.ai_model_version v
          WHERE v.ai_model_id = m.id
          ORDER BY v.released_on DESC NULLS LAST
         LIMIT 1) mv ON true
     LEFT JOIN LATERAL ( SELECT f.availability
           FROM corpus.ai_model_availability_fact f
          WHERE f.ai_model_version_id = mv.id AND f.valid_to IS NULL AND f.lifecycle_state::text = 'active'::text
          ORDER BY f.valid_from DESC
         LIMIT 1) av ON true
  WHERE m.lifecycle_state::text = 'active'::text;
```

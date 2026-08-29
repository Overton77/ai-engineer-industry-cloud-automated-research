---
schema: api
relation: claim_with_evidence
qualified_name: api.claim_with_evidence
kind: view
---

# api.claim_with_evidence

Database view api.claim_with_evidence.

## Quick facts

- Kind: `view`
- TypeScript row: `Database["api"]["Views"]["claim_with_evidence"]["Row"]`
- Row-level security: disabled
- Search tokens: `api claim_with_evidence api.claim_with_evidence claim_id claim_type statement status created_at evidence`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | yes | — | — |
| 2 | `claim_type` | `text` | yes | — | — |
| 3 | `statement` | `text` | yes | — | — |
| 4 | `status` | `evidence.claim_status` | yes | — | — |
| 5 | `created_at` | `timestamp with time zone` | yes | — | — |
| 6 | `evidence` | `jsonb` | yes | — | — |

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
SELECT c.id AS claim_id,
    c.claim_type,
    c.statement,
    c.status,
    c.created_at,
    COALESCE(jsonb_agg(jsonb_build_object('link_id', el.id, 'role', el.role, 'support_verdict', el.support_verdict, 'locator_id', el.locator_id, 'capture_id', loc.capture_id, 'source_id', cap.source_id, 'canonical_url', src.canonical_url, 'captured_at', cap.captured_at) ORDER BY el.created_at) FILTER (WHERE el.id IS NOT NULL), '[]'::jsonb) AS evidence
   FROM evidence.claim c
     LEFT JOIN evidence.claim_evidence_link el ON el.claim_id = c.id
     LEFT JOIN evidence.locator loc ON loc.id = el.locator_id
     LEFT JOIN evidence.source_capture cap ON cap.id = loc.capture_id
     LEFT JOIN evidence.source src ON src.id = cap.source_id
  WHERE c.status = 'verified'::evidence.claim_status
  GROUP BY c.id;
```

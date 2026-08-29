---
schema: api
relation: mcp_server_profile
qualified_name: api.mcp_server_profile
kind: view
---

# api.mcp_server_profile

Database view api.mcp_server_profile.

## Quick facts

- Kind: `view`
- TypeScript row: `Database["api"]["Views"]["mcp_server_profile"]["Row"]`
- Row-level security: disabled
- Search tokens: `api mcp_server_profile api.mcp_server_profile id name description registry_id ecosystem package_name distribution_kind transport_kinds license_spdx lifecycle_state registry_status version_count latest_release created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | yes | — | — |
| 2 | `name` | `text` | yes | — | — |
| 3 | `description` | `text` | yes | — | — |
| 4 | `registry_id` | `text` | yes | — | — |
| 5 | `ecosystem` | `text` | yes | — | — |
| 6 | `package_name` | `text` | yes | — | — |
| 7 | `distribution_kind` | `text` | yes | — | — |
| 8 | `transport_kinds` | `text[]` | yes | — | — |
| 9 | `license_spdx` | `text` | yes | — | — |
| 10 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 11 | `registry_status` | `text` | yes | — | — |
| 12 | `version_count` | `bigint` | yes | — | — |
| 13 | `latest_release` | `date` | yes | — | — |
| 14 | `created_at` | `timestamp with time zone` | yes | — | — |
| 15 | `updated_at` | `timestamp with time zone` | yes | — | — |

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
SELECT s.id,
    s.name,
    s.description,
    s.registry_id,
    s.ecosystem,
    s.package_name,
    s.distribution_kind,
    s.transport_kinds,
    s.license_spdx,
    s.lifecycle_state,
    reg.status AS registry_status,
    ( SELECT count(*) AS count
           FROM corpus.mcp_server_version v
          WHERE v.mcp_server_id = s.id) AS version_count,
    ( SELECT max(v.released_on) AS max
           FROM corpus.mcp_server_version v
          WHERE v.mcp_server_id = s.id) AS latest_release,
    s.created_at,
    s.updated_at
   FROM corpus.mcp_server s
     LEFT JOIN LATERAL ( SELECT f.status
           FROM corpus.mcp_server_registry_status_fact f
          WHERE f.mcp_server_id = s.id AND f.valid_to IS NULL AND f.lifecycle_state::text = 'active'::text
          ORDER BY f.valid_from DESC
         LIMIT 1) reg ON true
  WHERE s.lifecycle_state::text = 'active'::text;
```

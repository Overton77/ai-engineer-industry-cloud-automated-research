---
schema: api
relation: agent_skill_profile
qualified_name: api.agent_skill_profile
kind: view
---

# api.agent_skill_profile

Database view api.agent_skill_profile.

## Quick facts

- Kind: `view`
- TypeScript row: `Database["api"]["Views"]["agent_skill_profile"]["Row"]`
- Row-level security: disabled
- Search tokens: `api agent_skill_profile api.agent_skill_profile id name slug distribution description skill_format format_version license_spdx lifecycle_state latest_release created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | yes | — | — |
| 2 | `name` | `text` | yes | — | — |
| 3 | `slug` | `text` | yes | — | — |
| 4 | `distribution` | `text` | yes | — | — |
| 5 | `description` | `text` | yes | — | — |
| 6 | `skill_format` | `text` | yes | — | — |
| 7 | `format_version` | `text` | yes | — | — |
| 8 | `license_spdx` | `text` | yes | — | — |
| 9 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 10 | `latest_release` | `date` | yes | — | — |
| 11 | `created_at` | `timestamp with time zone` | yes | — | — |
| 12 | `updated_at` | `timestamp with time zone` | yes | — | — |

## Constraints

_None._

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

_None._

## Indexes

_None._

## RLS policies

_None._

## View definition

```sql
SELECT id,
    name,
    slug,
    distribution,
    description,
    skill_format,
    format_version,
    license_spdx,
    lifecycle_state,
    ( SELECT max(v.released_on) AS max
           FROM corpus.agent_skill_version v
          WHERE v.agent_skill_id = k.id) AS latest_release,
    created_at,
    updated_at
   FROM corpus.agent_skill k
  WHERE lifecycle_state::text = 'active'::text;
```

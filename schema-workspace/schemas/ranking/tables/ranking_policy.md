---
schema: ranking
relation: ranking_policy
qualified_name: ranking.ranking_policy
kind: table
---

# ranking.ranking_policy

Database table ranking.ranking_policy.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["ranking"]["Tables"]["ranking_policy"]["Row"]`
- Row-level security: enabled
- Search tokens: `ranking ranking_policy ranking.ranking_policy id tenant_id slug purpose created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `purpose` | `text` | no | — | — |
| 5 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `ranking_policy_purpose_check` | `check` | `CHECK (purpose = ANY (ARRAY['research_priority'::text, 'curriculum_value'::text, 'production_readiness'::text, 'frontier_monitoring'::text, 'challenge_feasibility'::text, 'verification_priority'::text, 'underexplored_discovery'::text]))` | — |
| `ranking_policy_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `ranking_policy_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`ranking.ranking_policy_version`](../../ranking/tables/ranking_policy_version.md) | `ranking_policy_version_ranking_policy_id_fkey` | `FOREIGN KEY (ranking_policy_id) REFERENCES ranking.ranking_policy(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `ranking_policy_pkey` | `CREATE UNIQUE INDEX ranking_policy_pkey ON ranking.ranking_policy USING btree (id)` |
| `ranking_policy_tenant_id_slug_key` | `CREATE UNIQUE INDEX ranking_policy_tenant_id_slug_key ON ranking.ranking_policy USING btree (tenant_id, slug)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

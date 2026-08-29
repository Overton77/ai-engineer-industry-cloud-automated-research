---
schema: evidence
relation: source
qualified_name: evidence.source
kind: table
---

# evidence.source

Database table evidence.source.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["source"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence source evidence.source id tenant_id source_class canonical_url url_pattern publisher sensitivity license_spdx license_notes terms_url robots_policy created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `source_class` | `text` | no | — | — |
| 4 | `canonical_url` | `text` | yes | — | — |
| 5 | `url_pattern` | `text` | yes | — | — |
| 6 | `publisher` | `text` | yes | — | — |
| 7 | `sensitivity` | `text` | no | `'public'::text` | — |
| 8 | `license_spdx` | `text` | yes | — | — |
| 9 | `license_notes` | `text` | yes | — | — |
| 10 | `terms_url` | `text` | yes | — | — |
| 11 | `robots_policy` | `text` | yes | — | — |
| 12 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 13 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `source_sensitivity_check` | `check` | `CHECK (sensitivity = ANY (ARRAY['public'::text, 'restricted'::text, 'confidential'::text]))` | — |
| `source_source_class_check` | `check` | `CHECK (source_class = ANY (ARRAY['web_page'::text, 'api'::text, 'repository'::text, 'pdf'::text, 'transcript'::text, 'dataset'::text, 'registry'::text, 'other'::text]))` | — |
| `source_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

_None._

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`evidence.degraded_assurance`](../../evidence/tables/degraded_assurance.md) | `degraded_assurance_source_id_fkey` | `FOREIGN KEY (source_id) REFERENCES evidence.source(id)` |
| [`evidence.source_capture`](../../evidence/tables/source_capture.md) | `source_capture_source_id_fkey` | `FOREIGN KEY (source_id) REFERENCES evidence.source(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `source_canonical_url_uq` | `CREATE UNIQUE INDEX source_canonical_url_uq ON evidence.source USING btree (canonical_url) WHERE (canonical_url IS NOT NULL)` |
| `source_pkey` | `CREATE UNIQUE INDEX source_pkey ON evidence.source USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

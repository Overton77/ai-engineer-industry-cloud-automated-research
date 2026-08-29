---
schema: orchestration
relation: capability
qualified_name: orchestration.capability
kind: table
---

# orchestration.capability

Database table orchestration.capability.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["orchestration"]["Tables"]["capability"]["Row"]`
- Row-level security: enabled
- Search tokens: `orchestration capability orchestration.capability id tenant_id slug kind purpose operations packages_mcp_server_version_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `kind` | `text` | no | — | — |
| 5 | `purpose` | `text` | no | — | — |
| 6 | `operations` | `text[]` | no | `'{}'::text[]` | — |
| 7 | `packages_mcp_server_version_id` | `uuid` | yes | — | — |
| 8 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 9 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `capability_kind_fkey` | `foreign_key` | `FOREIGN KEY (kind) REFERENCES orchestration.capability_kind(code)` | [`orchestration.capability_kind`](../../orchestration/tables/capability_kind.md) |
| `capability_packages_mcp_server_version_fk` | `foreign_key` | `FOREIGN KEY (packages_mcp_server_version_id) REFERENCES corpus.mcp_server_version(id)` | [`corpus.mcp_server_version`](../../corpus/tables/mcp_server_version.md) |
| `capability_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `capability_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `capability_kind_fkey` | [`orchestration.capability_kind`](../../orchestration/tables/capability_kind.md) | `FOREIGN KEY (kind) REFERENCES orchestration.capability_kind(code)` |
| `capability_packages_mcp_server_version_fk` | [`corpus.mcp_server_version`](../../corpus/tables/mcp_server_version.md) | `FOREIGN KEY (packages_mcp_server_version_id) REFERENCES corpus.mcp_server_version(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`orchestration.capability_version`](../../orchestration/tables/capability_version.md) | `capability_version_capability_id_fkey` | `FOREIGN KEY (capability_id) REFERENCES orchestration.capability(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `capability_pkey` | `CREATE UNIQUE INDEX capability_pkey ON orchestration.capability USING btree (id)` |
| `capability_tenant_id_slug_key` | `CREATE UNIQUE INDEX capability_tenant_id_slug_key ON orchestration.capability USING btree (tenant_id, slug)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

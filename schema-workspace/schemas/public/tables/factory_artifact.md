---
schema: public
relation: factory_artifact
qualified_name: public.factory_artifact
kind: table
---

# public.factory_artifact

Database table public.factory_artifact.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["public"]["Tables"]["factory_artifact"]["Row"]`
- Row-level security: enabled
- Search tokens: `public factory_artifact public.factory_artifact factory_artifact_id factory_episode_id artifact_kind content_digest storage_uri media_type byte_size retention_class contains_sensitive_data metadata created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `factory_artifact_id` | `uuid` | no | `gen_random_uuid()` | — |
| 2 | `factory_episode_id` | `uuid` | no | — | — |
| 3 | `artifact_kind` | `text` | no | — | — |
| 4 | `content_digest` | `text` | no | — | — |
| 5 | `storage_uri` | `text` | no | — | — |
| 6 | `media_type` | `text` | yes | — | — |
| 7 | `byte_size` | `bigint` | yes | — | — |
| 8 | `retention_class` | `text` | no | `'standard'::text` | — |
| 9 | `contains_sensitive_data` | `boolean` | no | `false` | — |
| 10 | `metadata` | `jsonb` | no | `'{}'::jsonb` | — |
| 11 | `created_at` | `timestamp with time zone` | no | `timezone('utc'::text, now())` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `factory_artifact_kind_check` | `check` | `CHECK (artifact_kind = ANY (ARRAY['trace'::text, 'patch'::text, 'repository'::text, 'build'::text, 'log'::text, 'sbom'::text, 'screenshot'::text, 'video'::text, 'playwright_trace'::text, 'test_report'::text, 'deployment'::text, 'dataset'::text, 'research_bundle'::text, 'challenge_spec'::text, 'other'::text]))` | — |
| `factory_artifact_retention_check` | `check` | `CHECK (retention_class = ANY (ARRAY['ephemeral'::text, 'standard'::text, 'long_term'::text, 'legal_hold'::text]))` | — |
| `factory_artifact_size_check` | `check` | `CHECK (byte_size IS NULL OR byte_size >= 0)` | — |
| `factory_artifact_factory_episode_id_fkey` | `foreign_key` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` | `factory_episode` |
| `factory_artifact_pkey` | `primary_key` | `PRIMARY KEY (factory_artifact_id)` | — |
| `factory_artifact_episode_digest_uniq` | `unique` | `UNIQUE (factory_episode_id, artifact_kind, content_digest)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `factory_artifact_factory_episode_id_fkey` | `factory_episode` | `FOREIGN KEY (factory_episode_id) REFERENCES factory_episode(factory_episode_id) ON DELETE CASCADE` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`public.factory_trace_span_ref`](../../public/tables/factory_trace_span_ref.md) | `factory_trace_span_ref_artifact_id_fkey` | `FOREIGN KEY (artifact_id) REFERENCES factory_artifact(factory_artifact_id) ON DELETE SET NULL` |

## Indexes

| Name | Definition |
| --- | --- |
| `factory_artifact_episode_digest_uniq` | `CREATE UNIQUE INDEX factory_artifact_episode_digest_uniq ON public.factory_artifact USING btree (factory_episode_id, artifact_kind, content_digest)` |
| `factory_artifact_pkey` | `CREATE UNIQUE INDEX factory_artifact_pkey ON public.factory_artifact USING btree (factory_artifact_id)` |

## RLS policies

_None._

---
schema: evidence
relation: claim_video
qualified_name: evidence.claim_video
kind: table
---

# evidence.claim_video

Database table evidence.claim_video.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_video"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_video evidence.claim_video claim_id video_id role_in_claim created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `video_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |
| 4 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_video_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text]))` | — |
| `claim_video_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_video_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` | [`corpus.video`](../../corpus/tables/video.md) |
| `claim_video_pkey` | `primary_key` | `PRIMARY KEY (claim_id, video_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_video_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_video_video_id_fkey` | [`corpus.video`](../../corpus/tables/video.md) | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_video_pkey` | `CREATE UNIQUE INDEX claim_video_pkey ON evidence.claim_video USING btree (claim_id, video_id, role_in_claim)` |
| `claim_video_target_idx` | `CREATE INDEX claim_video_target_idx ON evidence.claim_video USING btree (video_id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

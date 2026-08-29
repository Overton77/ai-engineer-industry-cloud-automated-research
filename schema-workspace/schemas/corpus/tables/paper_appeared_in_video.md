---
schema: corpus
relation: paper_appeared_in_video
qualified_name: corpus.paper_appeared_in_video
kind: table
---

# corpus.paper_appeared_in_video

Database table corpus.paper_appeared_in_video.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["paper_appeared_in_video"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus paper_appeared_in_video corpus.paper_appeared_in_video id paper_id video_id treatment locator_id valid_from valid_to confidence lifecycle_state provenance_claim_id created_by_receipt_id created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `paper_id` | `uuid` | no | — | — |
| 3 | `video_id` | `uuid` | no | — | — |
| 4 | `treatment` | `text` | yes | — | — |
| 5 | `locator_id` | `uuid` | yes | — | — |
| 6 | `valid_from` | `timestamp with time zone` | no | `now()` | — |
| 7 | `valid_to` | `timestamp with time zone` | yes | — | — |
| 8 | `confidence` | `corpus.confidence` | yes | — | — |
| 9 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 10 | `provenance_claim_id` | `uuid` | yes | — | — |
| 11 | `created_by_receipt_id` | `uuid` | no | — | — |
| 12 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `paper_appeared_in_video_treatment_check` | `check` | `CHECK (treatment = ANY (ARRAY['cited'::text, 'summarized'::text, 'critiqued'::text, 'presented'::text]))` | — |
| `paper_appeared_in_video_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `paper_appeared_in_video_locator_id_fkey` | `foreign_key` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` | [`evidence.locator`](../../evidence/tables/locator.md) |
| `paper_appeared_in_video_paper_id_fkey` | `foreign_key` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `paper_appeared_in_video_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `paper_appeared_in_video_video_id_fkey` | `foreign_key` | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` | [`corpus.video`](../../corpus/tables/video.md) |
| `paper_appeared_in_video_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `paper_appeared_in_video_paper_id_video_id_key` | `unique` | `UNIQUE (paper_id, video_id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `paper_appeared_in_video_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `paper_appeared_in_video_locator_id_fkey` | [`evidence.locator`](../../evidence/tables/locator.md) | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| `paper_appeared_in_video_paper_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| `paper_appeared_in_video_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |
| `paper_appeared_in_video_video_id_fkey` | [`corpus.video`](../../corpus/tables/video.md) | `FOREIGN KEY (video_id) REFERENCES corpus.video(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `paper_appeared_in_video_paper_id_video_id_key` | `CREATE UNIQUE INDEX paper_appeared_in_video_paper_id_video_id_key ON corpus.paper_appeared_in_video USING btree (paper_id, video_id)` |
| `paper_appeared_in_video_pkey` | `CREATE UNIQUE INDEX paper_appeared_in_video_pkey ON corpus.paper_appeared_in_video USING btree (id)` |

## Triggers

_None._

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

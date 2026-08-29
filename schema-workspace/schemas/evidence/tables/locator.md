---
schema: evidence
relation: locator
qualified_name: evidence.locator
kind: table
---

# evidence.locator

Database table evidence.locator.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["locator"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence locator evidence.locator id capture_id media_type selector selected_content_sha256 normalized_value context_fingerprint extractor_name extractor_version extraction_params created_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `capture_id` | `uuid` | no | — | — |
| 3 | `media_type` | `text` | no | — | — |
| 4 | `selector` | `jsonb` | no | — | — |
| 5 | `selected_content_sha256` | `text` | no | — | — |
| 6 | `normalized_value` | `text` | yes | — | — |
| 7 | `context_fingerprint` | `text` | yes | — | — |
| 8 | `extractor_name` | `text` | no | — | — |
| 9 | `extractor_version` | `text` | no | — | — |
| 10 | `extraction_params` | `jsonb` | no | `'{}'::jsonb` | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `locator_selected_content_sha256_check` | `check` | `CHECK (selected_content_sha256 ~ '^[0-9a-f]{64}$'::text)` | — |
| `locator_capture_id_fkey` | `foreign_key` | `FOREIGN KEY (capture_id) REFERENCES evidence.source_capture(id)` | [`evidence.source_capture`](../../evidence/tables/source_capture.md) |
| `locator_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `locator_capture_id_fkey` | [`evidence.source_capture`](../../evidence/tables/source_capture.md) | `FOREIGN KEY (capture_id) REFERENCES evidence.source_capture(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.library_appeared_in_video`](../../corpus/tables/library_appeared_in_video.md) | `library_appeared_in_video_locator_id_fkey` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| [`corpus.paper_appeared_in_video`](../../corpus/tables/paper_appeared_in_video.md) | `paper_appeared_in_video_locator_id_fkey` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| [`corpus.person_appeared_in_video`](../../corpus/tables/person_appeared_in_video.md) | `person_appeared_in_video_locator_id_fkey` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| [`corpus.product_appeared_in_video`](../../corpus/tables/product_appeared_in_video.md) | `product_appeared_in_video_locator_id_fkey` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| [`evidence.claim_evidence_link`](../../evidence/tables/claim_evidence_link.md) | `claim_evidence_link_locator_id_fkey` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| [`evidence.extraction_signature`](../../evidence/tables/extraction_signature.md) | `extraction_signature_locator_id_fkey` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| [`evidence.source_support`](../../evidence/tables/source_support.md) | `source_support_locator_id_fkey` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_locator_id_fkey` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| [`staging.candidate`](../../staging/tables/candidate.md) | `candidate_locator_id_fkey` | `FOREIGN KEY (locator_id) REFERENCES evidence.locator(id)` |
| [`staging.mention`](../../staging/tables/mention.md) | `mention_snippet_locator_id_fkey` | `FOREIGN KEY (snippet_locator_id) REFERENCES evidence.locator(id)` |

## Indexes

| Name | Definition |
| --- | --- |
| `locator_capture_idx` | `CREATE INDEX locator_capture_idx ON evidence.locator USING btree (capture_id)` |
| `locator_pkey` | `CREATE UNIQUE INDEX locator_pkey ON evidence.locator USING btree (id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `locator_immutable` | `util.reject_mutation` | `CREATE TRIGGER locator_immutable BEFORE DELETE OR UPDATE ON evidence.locator FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

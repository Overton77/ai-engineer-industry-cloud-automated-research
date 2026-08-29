---
schema: corpus
relation: paper
qualified_name: corpus.paper
kind: table
---

# corpus.paper

Database table corpus.paper.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["paper"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus paper corpus.paper id tenant_id title abstract venue published_on paper_kind doi arxiv_id openreview_id lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `title` | `text` | no | — | — |
| 4 | `abstract` | `text` | yes | — | — |
| 5 | `venue` | `text` | yes | — | — |
| 6 | `published_on` | `date` | yes | — | — |
| 7 | `paper_kind` | `text` | yes | — | — |
| 8 | `doi` | `text` | yes | — | — |
| 9 | `arxiv_id` | `text` | yes | — | — |
| 10 | `openreview_id` | `text` | yes | — | — |
| 11 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 12 | `merged_into_id` | `uuid` | yes | — | — |
| 13 | `created_by_receipt_id` | `uuid` | no | — | — |
| 14 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 15 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 16 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `paper_has_identity` | `check` | `CHECK (num_nonnulls(doi, arxiv_id, openreview_id) >= 1)` | — |
| `paper_paper_kind_check` | `check` | `CHECK (paper_kind = ANY (ARRAY['preprint'::text, 'conference'::text, 'journal'::text, 'workshop'::text, 'tech_report'::text, 'thesis'::text, 'other'::text]))` | — |
| `paper_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `paper_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.paper(id)` | [`corpus.paper`](../../corpus/tables/paper.md) |
| `paper_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `paper_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `paper_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `paper_merged_into_id_fkey` | [`corpus.paper`](../../corpus/tables/paper.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.paper(id)` |
| `paper_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.paper`](../../corpus/tables/paper.md) | `paper_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.paper(id)` |
| [`corpus.paper_appeared_in_talk`](../../corpus/tables/paper_appeared_in_talk.md) | `paper_appeared_in_talk_paper_id_fkey` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| [`corpus.paper_appeared_in_video`](../../corpus/tables/paper_appeared_in_video.md) | `paper_appeared_in_video_paper_id_fkey` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| [`corpus.paper_authored_by_person`](../../corpus/tables/paper_authored_by_person.md) | `paper_authored_by_person_paper_id_fkey` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| [`corpus.paper_retraction_fact`](../../corpus/tables/paper_retraction_fact.md) | `paper_retraction_fact_paper_id_fkey` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| [`corpus.repository_implements_paper`](../../corpus/tables/repository_implements_paper.md) | `repository_implements_paper_paper_id_fkey` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| [`evidence.claim_paper`](../../evidence/tables/claim_paper.md) | `claim_paper_paper_id_fkey` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |
| [`ranking.group_membership`](../../ranking/tables/group_membership.md) | `group_membership_paper_id_fkey` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id)` |
| [`ranking.metric_observation`](../../ranking/tables/metric_observation.md) | `metric_observation_paper_id_fkey` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id)` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_paper_id_fkey` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_paper_id_fkey` | `FOREIGN KEY (paper_id) REFERENCES corpus.paper(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `paper_arxiv_uq` | `CREATE UNIQUE INDEX paper_arxiv_uq ON corpus.paper USING btree (arxiv_id) WHERE (arxiv_id IS NOT NULL)` |
| `paper_doi_uq` | `CREATE UNIQUE INDEX paper_doi_uq ON corpus.paper USING btree (doi) WHERE (doi IS NOT NULL)` |
| `paper_openreview_uq` | `CREATE UNIQUE INDEX paper_openreview_uq ON corpus.paper USING btree (openreview_id) WHERE (openreview_id IS NOT NULL)` |
| `paper_pkey` | `CREATE UNIQUE INDEX paper_pkey ON corpus.paper USING btree (id)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

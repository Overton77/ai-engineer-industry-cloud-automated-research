---
schema: corpus
relation: concept
qualified_name: corpus.concept
kind: table
---

# corpus.concept

Database table corpus.concept.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["corpus"]["Tables"]["concept"]["Row"]`
- Row-level security: enabled
- Search tokens: `corpus concept corpus.concept id tenant_id slug preferred_label definition concept_kind lifecycle_state merged_into_id created_by_receipt_id updated_by_receipt_id created_at updated_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `tenant_id` | `uuid` | no | `util.default_tenant_id()` | — |
| 3 | `slug` | `text` | no | — | — |
| 4 | `preferred_label` | `text` | no | — | — |
| 5 | `definition` | `text` | yes | — | — |
| 6 | `concept_kind` | `text` | yes | — | — |
| 7 | `lifecycle_state` | `corpus.lifecycle_state` | yes | — | — |
| 8 | `merged_into_id` | `uuid` | yes | — | — |
| 9 | `created_by_receipt_id` | `uuid` | no | — | — |
| 10 | `updated_by_receipt_id` | `uuid` | yes | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 12 | `updated_at` | `timestamp with time zone` | no | `now()` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `concept_concept_kind_check` | `check` | `CHECK (concept_kind = ANY (ARRAY['technique'::text, 'architecture'::text, 'metric'::text, 'artifact'::text, 'role'::text, 'phenomenon'::text, 'other'::text]))` | — |
| `concept_created_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `concept_merged_into_id_fkey` | `foreign_key` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.concept(id)` | [`corpus.concept`](../../corpus/tables/concept.md) |
| `concept_updated_by_receipt_id_fkey` | `foreign_key` | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) |
| `concept_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |
| `concept_tenant_id_slug_key` | `unique` | `UNIQUE (tenant_id, slug)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `concept_created_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (created_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |
| `concept_merged_into_id_fkey` | [`corpus.concept`](../../corpus/tables/concept.md) | `FOREIGN KEY (merged_into_id) REFERENCES corpus.concept(id)` |
| `concept_updated_by_receipt_id_fkey` | [`orchestration.operation_receipt`](../../orchestration/tables/operation_receipt.md) | `FOREIGN KEY (updated_by_receipt_id) REFERENCES orchestration.operation_receipt(id)` |

### Inbound foreign keys

| Source | Constraint | Definition |
| --- | --- | --- |
| [`corpus.concept`](../../corpus/tables/concept.md) | `concept_merged_into_id_fkey` | `FOREIGN KEY (merged_into_id) REFERENCES corpus.concept(id)` |
| [`corpus.concept_alias`](../../corpus/tables/concept_alias.md) | `concept_alias_concept_id_fkey` | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` |
| [`corpus.talk_explains_concept`](../../corpus/tables/talk_explains_concept.md) | `talk_explains_concept_concept_id_fkey` | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` |
| [`evidence.claim_concept`](../../evidence/tables/claim_concept.md) | `claim_concept_concept_id_fkey` | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` |
| [`staging.identity_match`](../../staging/tables/identity_match.md) | `identity_match_concept_id_fkey` | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id)` |
| [`taxonomy.assignment`](../../taxonomy/tables/assignment.md) | `assignment_concept_id_fkey` | `FOREIGN KEY (concept_id) REFERENCES corpus.concept(id) ON DELETE CASCADE` |

## Indexes

| Name | Definition |
| --- | --- |
| `concept_pkey` | `CREATE UNIQUE INDEX concept_pkey ON corpus.concept USING btree (id)` |
| `concept_tenant_id_slug_key` | `CREATE UNIQUE INDEX concept_tenant_id_slug_key ON corpus.concept USING btree (tenant_id, slug)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `concept_set_updated_at` | `util.set_updated_at` | `CREATE TRIGGER concept_set_updated_at BEFORE UPDATE ON corpus.concept FOR EACH ROW EXECUTE FUNCTION util.set_updated_at()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `(tenant_id = util.current_tenant_id())` | `(tenant_id = util.current_tenant_id())` |

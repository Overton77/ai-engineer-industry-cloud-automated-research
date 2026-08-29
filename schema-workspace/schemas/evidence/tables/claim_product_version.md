---
schema: evidence
relation: claim_product_version
qualified_name: evidence.claim_product_version
kind: table
---

# evidence.claim_product_version

Typed claim association for an exact SaaS or product release/version.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["evidence"]["Tables"]["claim_product_version"]["Row"]`
- Row-level security: enabled
- Search tokens: `evidence claim_product_version evidence.claim_product_version claim_id product_version_id role_in_claim`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `claim_id` | `uuid` | no | — | — |
| 2 | `product_version_id` | `uuid` | no | — | — |
| 3 | `role_in_claim` | `text` | no | `'subject'::text` | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `claim_product_version_role_in_claim_check` | `check` | `CHECK (role_in_claim = ANY (ARRAY['subject'::text, 'object'::text, 'context'::text, 'qualifier'::text, 'comparison'::text]))` | — |
| `claim_product_version_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `claim_product_version_product_version_id_fkey` | `foreign_key` | `FOREIGN KEY (product_version_id) REFERENCES corpus.product_version(id) ON DELETE CASCADE` | [`corpus.product_version`](../../corpus/tables/product_version.md) |
| `claim_product_version_pkey` | `primary_key` | `PRIMARY KEY (claim_id, product_version_id, role_in_claim)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `claim_product_version_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (claim_id) REFERENCES evidence.claim(id) ON DELETE CASCADE` |
| `claim_product_version_product_version_id_fkey` | [`corpus.product_version`](../../corpus/tables/product_version.md) | `FOREIGN KEY (product_version_id) REFERENCES corpus.product_version(id) ON DELETE CASCADE` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `claim_product_version_pkey` | `CREATE UNIQUE INDEX claim_product_version_pkey ON evidence.claim_product_version USING btree (claim_id, product_version_id, role_in_claim)` |
| `claim_product_version_target_idx` | `CREATE INDEX claim_product_version_target_idx ON evidence.claim_product_version USING btree (product_version_id)` |

## Triggers

| Trigger | Function | Definition |
| --- | --- | --- |
| `claim_entity_association_immutable` | `util.reject_mutation` | `CREATE TRIGGER claim_entity_association_immutable BEFORE DELETE OR UPDATE ON evidence.claim_product_version FOR EACH ROW EXECUTE FUNCTION util.reject_mutation()` |
| `claim_entity_association_proposed` | `evidence.enforce_claim_association_proposed` | `CREATE TRIGGER claim_entity_association_proposed BEFORE INSERT ON evidence.claim_product_version FOR EACH ROW EXECUTE FUNCTION evidence.enforce_claim_association_proposed()` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

---
schema: research
relation: finding
qualified_name: research.finding
kind: table
---

# research.finding

Database table research.finding.

## Quick facts

- Kind: `table`
- TypeScript row: `Database["research"]["Tables"]["finding"]["Row"]`
- Row-level security: enabled
- Search tokens: `research finding research.finding id mission_id title statement structured proposed_record_kind resolution resolved_record_id rejection_reason provenance_claim_id created_at resolved_at`

## Columns

| # | Column | Postgres type | Nullable | Default / generated | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `id` | `uuid` | no | `util.uuidv7()` | — |
| 2 | `mission_id` | `uuid` | no | — | — |
| 3 | `title` | `text` | no | — | — |
| 4 | `statement` | `text` | no | — | — |
| 5 | `structured` | `jsonb` | yes | — | — |
| 6 | `proposed_record_kind` | `text` | yes | — | — |
| 7 | `resolution` | `research.finding_resolution` | no | `'pending'::research.finding_resolution` | — |
| 8 | `resolved_record_id` | `uuid` | yes | — | — |
| 9 | `rejection_reason` | `text` | yes | — | — |
| 10 | `provenance_claim_id` | `uuid` | yes | — | — |
| 11 | `created_at` | `timestamp with time zone` | no | `now()` | — |
| 12 | `resolved_at` | `timestamp with time zone` | yes | — | — |

## Constraints

| Name | Type | Definition | References |
| --- | --- | --- | --- |
| `finding_promoted_has_record` | `check` | `CHECK ((resolution = 'promoted'::research.finding_resolution) = (resolved_record_id IS NOT NULL))` | — |
| `finding_proposed_record_kind_check` | `check` | `CHECK (proposed_record_kind = ANY (ARRAY['technical_problem'::text, 'solution_pattern'::text, 'advanced_usage_pattern'::text, 'implementation_example'::text, 'failure_mode'::text, 'benchmark_result'::text, 'compatibility_constraint'::text, 'operational_practice'::text, 'security_consideration'::text]))` | — |
| `finding_rejected_has_reason` | `check` | `CHECK (resolution <> 'rejected'::research.finding_resolution OR rejection_reason IS NOT NULL)` | — |
| `finding_mission_id_fkey` | `foreign_key` | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` | [`orchestration.mission`](../../orchestration/tables/mission.md) |
| `finding_provenance_claim_id_fkey` | `foreign_key` | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` | [`evidence.claim`](../../evidence/tables/claim.md) |
| `finding_pkey` | `primary_key` | `PRIMARY KEY (id)` | — |

## Relationships

### Outbound foreign keys

| Constraint | Target | Definition |
| --- | --- | --- |
| `finding_mission_id_fkey` | [`orchestration.mission`](../../orchestration/tables/mission.md) | `FOREIGN KEY (mission_id) REFERENCES orchestration.mission(id) ON DELETE CASCADE` |
| `finding_provenance_claim_id_fkey` | [`evidence.claim`](../../evidence/tables/claim.md) | `FOREIGN KEY (provenance_claim_id) REFERENCES evidence.claim(id)` |

### Inbound foreign keys

_None._

## Indexes

| Name | Definition |
| --- | --- |
| `finding_mission_idx` | `CREATE INDEX finding_mission_idx ON research.finding USING btree (mission_id, resolution)` |
| `finding_pkey` | `CREATE UNIQUE INDEX finding_pkey ON research.finding USING btree (id)` |
| `finding_unresolved_idx` | `CREATE INDEX finding_unresolved_idx ON research.finding USING btree (created_at) WHERE (resolution = 'pending'::research.finding_resolution)` |

## RLS policies

| Policy | Mode | Command | Roles | Using | With check |
| --- | --- | --- | --- | --- | --- |
| `bounded_role_access` | PERMISSIVE | `ALL` | `app_reader, control_plane, executor_service, pipeline_agent, verifier_agent` | `true` | `true` |

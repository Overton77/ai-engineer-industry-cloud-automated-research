# orchestration schema

Searchable inventory for `orchestration`. Every relation has a dedicated file containing columns, constraints, inbound and outbound relationships, indexes, triggers, and RLS policies.

- Tables: 23
- Views: 0
- Functions: [1](functions.md)
- Enums: [4](enums.md)

## Tables

| Relation | Columns | RLS | Description |
| --- | --- | --- | --- |
| [`agent_session`](tables/agent_session.md) | 10 | enabled | — |
| [`artifact`](tables/artifact.md) | 14 | enabled | — |
| [`artifact_manifest`](tables/artifact_manifest.md) | 9 | enabled | — |
| [`artifact_type`](tables/artifact_type.md) | 3 | enabled | — |
| [`attempt`](tables/attempt.md) | 15 | enabled | — |
| [`capability`](tables/capability.md) | 9 | enabled | — |
| [`capability_kind`](tables/capability_kind.md) | 3 | enabled | — |
| [`capability_profile`](tables/capability_profile.md) | 5 | enabled | — |
| [`capability_profile_item`](tables/capability_profile_item.md) | 3 | enabled | — |
| [`capability_version`](tables/capability_version.md) | 9 | enabled | — |
| [`continuation_checkpoint`](tables/continuation_checkpoint.md) | 15 | enabled | — |
| [`intent_type`](tables/intent_type.md) | 4 | enabled | — |
| [`mission`](tables/mission.md) | 19 | enabled | — |
| [`mission_event`](tables/mission_event.md) | 9 | enabled | — |
| [`operation_intent`](tables/operation_intent.md) | 12 | enabled | — |
| [`operation_receipt`](tables/operation_receipt.md) | 8 | enabled | — |
| [`outbox_event`](tables/outbox_event.md) | 7 | enabled | — |
| [`provider_route`](tables/provider_route.md) | 9 | enabled | — |
| [`work_item`](tables/work_item.md) | 18 | enabled | — |
| [`work_item_artifact`](tables/work_item_artifact.md) | 3 | enabled | — |
| [`work_item_dependency`](tables/work_item_dependency.md) | 4 | enabled | — |
| [`work_item_event`](tables/work_item_event.md) | 9 | enabled | Append-only cross-agent progress ledger. Lease state remains on work_item; every transition and checkpoint is recorded here. |
| [`work_item_kind`](tables/work_item_kind.md) | 3 | enabled | — |

## Views

_None._

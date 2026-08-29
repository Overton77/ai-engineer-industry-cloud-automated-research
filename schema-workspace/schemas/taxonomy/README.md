# taxonomy schema

Searchable inventory for `taxonomy`. Every relation has a dedicated file containing columns, constraints, inbound and outbound relationships, indexes, triggers, and RLS policies.

- Tables: 8
- Views: 0
- Functions: [2](functions.md)
- Enums: [1](enums.md)

## Tables

| Relation | Columns | RLS | Description |
| --- | --- | --- | --- |
| [`assignment`](tables/assignment.md) | 33 | enabled | — |
| [`assignment_review_requirement`](tables/assignment_review_requirement.md) | 4 | enabled | — |
| [`entity_kind`](tables/entity_kind.md) | 5 | enabled | Primary canonical AI knowledge entity divisions and their typed corpus tables. |
| [`facet`](tables/facet.md) | 8 | enabled | — |
| [`facet_version`](tables/facet_version.md) | 8 | enabled | — |
| [`term`](tables/term.md) | 8 | enabled | — |
| [`term_relation`](tables/term_relation.md) | 4 | enabled | — |
| [`term_target_kind`](tables/term_target_kind.md) | 3 | enabled | Restricts secondary taxonomy terms to compatible primary entity kinds. |

## Views

_None._

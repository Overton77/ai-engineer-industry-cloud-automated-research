---
name: intent-builder
description: Converts verified reports into schema-valid deterministic ingestion intents without executing them.
---

Use `contracts/ingestion-intent.schema.json`. Emit only allowlisted insert/upsert operations, stable idempotency keys, explicit preconditions, and `$ref` links. Validate and dry-run submission. Do not approve or execute.

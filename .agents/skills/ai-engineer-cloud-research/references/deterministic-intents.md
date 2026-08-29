# Deterministic intents

Validate against `contracts/ingestion-intent.schema.json`. An operation is an `insert` or `upsert` with parameter values. Use `{"$ref":"operation-id.id"}` to reference a prior operation's reserved UUID.

```json
{
  "schema_version": "ai-engineer-ingestion-intent/1",
  "intent_type": "upsert_entity",
  "idempotency_key": "video:abc123:entity:organization:acme:v1",
  "mission_id": null,
  "attempt_id": null,
  "preconditions": {"identity_resolution": "accepted"},
  "payload": {"operations": [
    {"id":"org","action":"upsert","target":"corpus.organization","conflict_columns":["tenant_id","slug"],"values":{"slug":"acme","display_name":"Acme","lifecycle_state":"active"}},
    {"id":"identifier","action":"upsert","target":"corpus.organization_identifier","conflict_columns":["scheme","value"],"values":{"organization_id":{"$ref":"org.id"},"scheme":"domain","value":"acme.example"}}
  ]}
}
```

Submission uploads canonical JSON to a content-addressed path and registers the artifact and intent idempotently. Execution is separate and refuses `pending`, `denied`, or `escalated` intents.

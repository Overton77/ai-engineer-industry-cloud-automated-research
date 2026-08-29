# api functions

| Function | Arguments | Returns | Volatility | Security | Description |
| --- | --- | --- | --- | --- | --- |
| `evidence_packet` | `p_packet_id uuid` | `jsonb` | stable | security definer | — |
| `leaderboard` | `p_slug text` | `TABLE(rank integer, entity_kind text, entity_id uuid, score numeric, explanation text)` | stable | security definer | — |
| `submit_intent` | `p_intent_type text, p_payload jsonb, p_idempotency_key text, p_mission_id uuid, p_attempt_id uuid, p_preconditions jsonb` | `uuid` | volatile | security definer | — |

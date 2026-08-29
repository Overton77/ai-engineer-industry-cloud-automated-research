# Database readiness audit — 2026-08-29

Live project: `supabase-blue-ocean` (`wkythqbofmckbuoothhn`), Postgres 17. The private `ai-engineer-cloud-bucket` exists.

- Audit inventory found 1,049 starter videos and 965 applied analyses.
- Canonical entities now include a first-class case-study contract.
- Metrics now target datasets, benchmarks, talks, model families, and case studies and preserve collection/provenance/missingness fields.
- Shared progress has idempotent keys, leases, heartbeats, and an append-only event ledger.
- New work, artifact, and intent kinds cover selection, probes, verification, deterministic ingestion, and timeline updates.

Applied migrations: `cloud_agent_research_operations`, `cloud_agent_research_index_advisors`, `case_study_entity_contract`, and `case_study_index_advisors`. The schema migrations passed a fresh local `supabase db reset`; the follow-up advisor indexes passed local `supabase migration up` before live application.

The new contract introduced no security-advisor findings. Existing advisories remain: 40 informational RLS-enabled/no-policy notices on service-only `public` tables, warnings for broadly executable legacy `SECURITY DEFINER` functions, and leaked-password protection disabled. Performance notices are mostly unused indexes on empty new-schema tables and pre-existing uncovered FKs. See [database linter guidance](https://supabase.com/docs/guides/database/database-linter).

The table inventory also flagged observability child partitions without RLS. Review schema exposure and partition policy before any client access.

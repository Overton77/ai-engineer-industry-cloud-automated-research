# Research reports

Committed briefs live here. Disposable fetches stay in gitignored `.firecrawl/` and `artifacts/`.

## Naming

```
reports/YYYY-MM-DD-<topic>.md
```

Example: `reports/2026-08-28-openai-anthropic-weekly.md`

## Required brief sections

1. Coverage window and compile date
2. Method / tool status (what ran, what failed)
3. Findings with publication date, event date, and a source URL on every time-sensitive claim
4. A short “outside this window” note for immediately adjacent context
5. Tooling proof table when the run is also an environment test

## Weekly company brief workflow

```text
verify:environment → (verify:secrets if APIs needed)
tvly search --time-range week          # discovery
firecrawl search / scrape / developer  # primary pages + SDK evidence
gh                                     # official repos and releases
Context7 HTTP or MCP                   # current API docs, not news
agent-browser                          # only when rendered UI matters
write reports/YYYY-MM-DD-*.md
```

Do not commit `.firecrawl/` or `artifacts/`.

#!/usr/bin/env bash
set -euo pipefail

npm run verify:secrets

mkdir -p artifacts/smoke .firecrawl

query="AI coding agents developer tools latest releases"

echo "Running Tavily search..."
tvly search "$query" \
  --time-range month \
  --max-results 2 \
  --json \
  -o artifacts/smoke/tavily-search.json

echo "Running Firecrawl search..."
firecrawl search "$query" \
  --tbs qdr:m \
  --json \
  -o .firecrawl/smoke-search.json

browser_open=false
close_browser() {
  if [[ "$browser_open" == "true" ]]; then
    agent-browser close >/dev/null 2>&1 || true
  fi
}
trap close_browser EXIT

echo "Running Agent Browser..."
agent-browser open "https://example.com"
browser_open=true
agent-browser get title | tee artifacts/smoke/browser-title.txt
agent-browser screenshot artifacts/smoke/browser.png
agent-browser close
browser_open=false

echo "Smoke test passed."
echo "Tavily output: artifacts/smoke/tavily-search.json"
echo "Firecrawl output: .firecrawl/smoke-search.json"
echo "Browser outputs: artifacts/smoke/browser-title.txt and browser.png"

# Video selection workspace

This workspace is the durable policy and query entry point for choosing one research video. Candidate data stays in Postgres and is queried at run time; do not commit a soon-stale queue snapshot as operational truth.

## Default outcome

If the operator supplies a video ID, use it. Otherwise:

```bash
npm run research:cloud -- videos prioritize --strategy=balanced --limit=20
```

Choose exactly one result and explain its score components. Then create the UUID run directory, inspect the video, and persist the mandatory entity grounding query:

```bash
npm run research:cloud -- video get --video-id=<youtube-id>
npm run research:cloud -- mission preflight \
  --video-id=<youtube-id> \
  --output=artifacts/runs/<run-id>/inputs/pre-mission-context.json
npm run research:cloud -- progress seed --video-id=<youtube-id>
```

`progress seed` repeats the pre-mission query before both its dry run and mutation. The saved preflight file is still required because it becomes part of the attempt archive and gives the researcher an explicit baseline.

## Why this is a workspace, not a new subagent

Video ranking and pre-mission retrieval are deterministic database operations. They belong in the CLI and the existing project skill, where every agent receives identical current state. The `entity-selector` remains responsible for interpreting overlaps, resolving ambiguity, and deciding what matters. The existing `source-intelligence` role remains responsible for web discovery after a work item is claimed.

A separate retrieval subagent would add handoff cost and could silently diverge from the database between selection and mission start. Introduce one later only if retrieval itself becomes a long-running semantic task rather than a bounded query.

## Ranking policy

Readiness is a hard gate: stored private transcript, valid duration, completed latest pre-research, and no existing mission. The balanced score then uses:

| Signal | Weight | Purpose |
| --- | ---: | --- |
| Oldest-first chronology | 35% | Builds a coherent historical baseline and prevents permanent starvation of older talks. |
| Person/organization continuity | 30% | Compounds entity knowledge across videos and exposes identity conflicts early. |
| Research opportunity | 15% | Rewards packets with uncertain or under-resolved identity candidates. |
| Log-scaled views | 10% | Adds audience importance without letting viral videos dominate. |
| Like/view engagement | 5% | Weak supporting signal only. |
| Shorter duration | 5% | Improves throughput and makes early operational tests cheaper. |

The first bounded run remains `dQmseZ6kz8w`. It is nearly the oldest eligible item, only 464 seconds long, contains uncertain people and a product/repository, and connects AI Engineer to many other pre-research packets. That makes it a better systems proof than the global top-ranked balanced candidate.

## Selection modes

- `balanced`: default for one autonomous interactive run.
- `popular-media`: stronger log-scaled reach and engagement signals while retaining entity continuity, research opportunity, chronology, and cost; use when popular content is the desired starter packet.
- `chronology`: timeline backfill; heavily favors oldest unpublished work while retaining a small continuity signal.
- `entity-cluster --entity=<normalized-name>`: an explicitly declared campaign such as `anthropic`, `github`, or `ai engineer`.

Do not use newest-first by default. It starves the historical timeline. Do not use likes or views as the primary key; they are age-biased, topic-biased, and do not measure research value. Do not let parallel cron workers independently choose: the scheduler should rank once, assign distinct IDs, and pass each worker an explicit video or mission scope.

## Query playbook

```bash
# Best general candidates
npm run research:cloud -- videos prioritize --strategy=balanced --limit=20

# Popular-media starter packets, persisted into the run workspace
npm run research:cloud -- videos prioritize --strategy=popular-media --limit=20 \
  --output=artifacts/runs/<run-id>/inputs/video-candidates.json

# Oldest-first timeline backfill with secondary entity continuity
npm run research:cloud -- videos prioritize --strategy=chronology --limit=20

# Group work around one exact normalized entity name
npm run research:cloud -- videos prioritize --strategy=entity-cluster --entity=anthropic --limit=20

# Inspect the raw eligible queue when debugging hard gates
npm run research:cloud -- videos list --order=asc --limit=50 \
  --eligible --pre-research-complete --without-mission

# Retrieve current context for the chosen video
npm run research:cloud -- mission preflight --video-id=<youtube-id>
```

The preflight result contains the current pre-research candidates, their occurrences in other latest video packets, any missions already associated with those videos, exact canonical person/organization matches, and the timestamps needed to distinguish video-time from current-time assertions.

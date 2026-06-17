# Source: llm-wiki.md

> Raw source: `llm-wiki.md` (76 lines). This is the **knowledge source** that describes the methodology for building a wiki — and is now itself ingested into the wiki it inspired.

## What It Describes

A pattern for building personal knowledge bases using LLMs. Instead of RAG (retrieve at query time), the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between the user and raw sources.

## Core Principles Applied Here

### The Wiki Is a Persistent, Compounding Artifact
> "The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read."

Applied: This `wiki/` directory is the compounding artifact for the Pomodoro Timer project. Each page cross-references related entities, concepts, and sources. Future additions (new features, design changes, bug investigations) can be ingested here.

### Three-Layer Architecture
1. **Raw sources** — `index.html`, `main.js`, `style.css`, `CLAUDE.md`, agent definitions, slide deck. Immutable — read from, never modified.
2. **The wiki** — This `wiki/` directory. LLM-generated and maintained.
3. **The schema** — [[source-CLAUDE-md]]. Tells the LLM how the wiki is structured.

### Index and Log
- **[[index]]** — catalog of all pages with one-line summaries, organized by category
- **[[log]]** — chronological append-only record of all wiki operations

### The Human's Job vs. the LLM's Job
> "The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else."

Applied: You (the human) directed the wiki build. The LLM read all sources, extracted entities, wrote cross-referenced pages, and maintains consistency.

### Operations Defined

| Operation | Description | Applied |
|-----------|-------------|---------|
| **Ingest** | Process a source → write summary, update entity pages, update index, append to log | Initial bootstrap: 13 sources ingested in one pass |
| **Query** | Ask questions against the wiki → synthesize answer with citations | Ready for future use |
| **Lint** | Health-check: find contradictions, stale claims, orphans, gaps | Not yet performed |

### Why This Works
> "The tedious part of maintaining a knowledge base is...the bookkeeping. LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass."

Applied: This initial bootstrap wrote 17 wiki files with ~100 cross-references in one pass. Maintaining this as the project evolves is similarly low-cost.

## Related Pages
- [[source-CLAUDE-md]] — the schema that references this file as a knowledge source
- [[index]] — the wiki catalog this methodology produced
- [[log]] — the chronological log this methodology prescribes
- [[project-overview]] — synthesis of everything ingested

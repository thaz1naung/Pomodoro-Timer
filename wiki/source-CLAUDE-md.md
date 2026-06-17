# Source: CLAUDE.md

> Raw source: `CLAUDE.md` (~240 lines). This is the **schema** in the llm-wiki architecture — the configuration file that tells the LLM how to build and how to maintain the knowledge base.

## Overview

The master instruction file for any LLM agent working on this project. Defines the knowledge sources, workflow rules, design system, feature checklist, deployment config, agent responsibilities, hard constraints, and build order. Acts as the project's "schema" layer — the LLM reads it first and follows it top to bottom.

## Sections

### Knowledge Sources
- **`llm-wiki.md`**: Guides how to think, prompt, and reason. Apply Karpathy's principle: clarity over cleverness.
- **UI UX Pro Max Skill**: Plugin providing design tokens, spacing rules, typography, component patterns.
- **`wiki/`**: Persistent, structured knowledge base built following the `llm-wiki.md` methodology. Read `wiki/index.md` first before any session. Contains source extractions, entity pages, concept pages, and a synthesis. Defines wiki operations: read-before-change, ingest-after-change, lint periodically, query workflow.

### GSD Workflow Rules
The core operating principle: "Ship first. Polish second. Never over-engineer." Specific rules:
- Build simplest working version first
- One feature at a time — no bundling
- If it works, ship it — don't refactor unless broken
- No extra features unless requested
- No abstractions, no premature optimization
- Decision rule: "Does the user need this right now?" → No → Don't build it

### Design System
- **Style**: Lofi / Minimal / Calm
- **Colors**: `#0f0f0f` background, `#1a1a2e` surface, accent per mood
- **Typography**: Inter + JetBrains Mono via Google Fonts CDN
- **Spacing**: Centered single column, generous padding, mobile-first

### Feature Checklist
10 checkboxes covering: core timer, streak counter, mood themes, sound, animated background, responsive design. (All checked — implemented.)

### Deployment Config
Static Vercel deployment: `@vercel/static` build, catch-all route to `index.html`. No backend, no serverless functions.

### Agent Responsibilities
Table mapping 4 agents (UI, Logic, QA, Deploy) to their file scopes and handoff rules.

### Hard Rules
❌ No external JS libraries, no backend, no audio files, no over-commenting, no unrequested features.
✅ Vanilla HTML + CSS + JS only, every change browser-testable, GSD: if it works it ships.

### Build Order
10 sequential steps from HTML skeleton → CSS → timer logic → themes → streak → sound → responsive → QA check → deployment config → deploy.

## Role in llm-wiki Architecture

Per [[source-llm-wiki]], there are three layers:
- **Raw sources**: Project files (immutable)
- **The wiki**: LLM-generated markdown (this directory)
- **The schema**: `CLAUDE.md` ← this file

CLAUDE.md is the schema. It tells the LLM:
- What knowledge sources to consult (`llm-wiki.md`, UI UX Pro Max Skill, `wiki/`)
- What conventions to follow (GSD, design system)
- What to build and in what order
- What never to do
- **How to maintain the wiki**: read `wiki/index.md` first, update affected pages on changes, lint periodically, file query answers back into the wiki

## Related Pages
- [[source-llm-wiki]] — the knowledge source CLAUDE.md tells the LLM to read
- [[index]] — the wiki catalog CLAUDE.md now points to as a knowledge source
- [[log]] — the chronological log CLAUDE.md tells the LLM to consult and update
- [[design-decisions]] — decisions derived from CLAUDE.md's rules
- [[agent-workflow]] — the agent orchestration specified in CLAUDE.md
- [[project-overview]] — the result of following CLAUDE.md's build order

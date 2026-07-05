# Wiki Log

Append-only chronological record of all wiki operations. Each entry uses a consistent prefix for parseability: `## [YYYY-MM-DD] <operation> | <detail>`.

---

## [2026-06-17] ingest | Initial wiki bootstrap from all project sources

Ingested all raw sources: `index.html`, `main.js`, `style.css`, `CLAUDE.md`, `llm-wiki.md`, `.claude/agents/ui-agent.md`, `.claude/agents/logic-agent.md`, `.claude/agents/qa-agent.md`, `.claude/agents/deploy-agent.md`, `.claude/skills/gsd-skill.md`, `slides/pitch.md`, `vercel.json`, `README.md`.

Created pages:
- [[index]] — wiki catalog
- [[log]] — this file
- [[source-index-html]] — DOM structure extraction
- [[source-main-js]] — application logic extraction
- [[source-style-css]] — styles extraction
- [[timer-engine]] — core timer entity
- [[theme-system]] — mood theme entity
- [[streak-persistence]] — streak storage entity
- [[sound-engine]] — Web Audio chime entity
- [[transition-dialog]] — confirmation dialog entity
- [[animated-background]] — CSS blob animation entity
- [[responsive-design]] — responsive layout entity
- [[architecture]] — cross-cutting architecture concept
- [[design-decisions]] — design rationale concept
- [[agent-workflow]] — agent orchestration concept
- [[mcp-tools-used]] — MCP tooling concept
- [[project-overview]] — synthesis

Cross-referenced every page to related entities, concepts, and source files.

---

## [2026-06-17] update | Added wiki knowledge source to CLAUDE.md (schema)

Updated `CLAUDE.md` Knowledge Sources section with a new **Project Wiki** subsection. Changes:
- Added `wiki/` as a third knowledge source alongside `llm-wiki.md` and UI UX Pro Max Skill
- Documented wiki operations: read-before-change, ingest-after-change, lint periodically, query workflow
- Future sessions will now read `wiki/index.md` first, update affected pages on changes, and maintain cross-references

Updated pages:
- [[source-CLAUDE-md]] needs to reflect the new wiki section addition

Also created:
- [[source-CLAUDE-md]] — schema source page
- [[source-llm-wiki]] — llm-wiki methodology source page

---

## [2026-07-05] ingest | Added tech-stack Marp slide deck

Created `slides/tech-stack.md` (and rendered `slides/tech-stack.html`) — a Marp deck covering the build process behind the app.

Slides cover:
1. Tech stack (vanilla HTML/CSS/JS, Vercel)
2. UI Agent — builds the HTML + CSS shell
3. GSD Skill — ship first, one feature at a time
4. GSD Methodology — enforced build order (10 steps)
5. Trigger — how agents/skills activate
6. Commands — exact phrases to invoke them

Follows same Marp style as `slides/product-intro.md`.

---

## [2026-07-05] feature | Added task label input above timer

Added a text input above the timer ring where users can type what they're working on (e.g. "Writing essay"). Shows as plain text while the timer runs. Clears on reset.

Updated pages:
- [[source-index-html]] — new `.task-section` with input + hidden span
- [[source-main-js]] — `showTaskLabel()`, `clearTaskLabel()`
- [[source-style-css]] — `.task-section`, `.task-input`, `.task-label` styles
- [[timer-engine]] — task label section added

---

## [2026-07-05] feature | Added custom duration inputs

Added three number inputs (Focus / Short Break / Long Break) with defaults 25 / 5 / 15 minutes. Values are read from the DOM only on `reset()`, never mid-session.

Updated pages:
- [[source-index-html]] — new `.duration-section` with 3 number inputs
- [[source-main-js]] — `applyDurations()` called inside `reset()`
- [[source-style-css]] — `.duration-section`, `.duration-group`, `.duration-input` styles
- [[timer-engine]] — custom durations section added

---

## [2026-07-05] feature | Added browser notifications (Notification API)

Browser notification fires when timer ends, only if the page isn't focused. Permission is requested on first Start click. Falls back to existing sound if denied.

Updated pages:
- [[source-main-js]] — `requestNotifPermission()`, `notify()` functions
- [[timer-engine]] — notifications called in `timerComplete()`

---

## [2026-07-05] feature | Added background sound toggle (Rain / White Noise / Lofi)

Three ambient sound options using Web Audio API. Toggle buttons near the volume slider. One plays at a time. Volume follows the existing slider.

Updated pages:
- [[source-index-html]] — `.bg-sound-group` with 3 buttons
- [[source-main-js]] — `createNoiseBuffer()`, `createBrownNoise()`, `startBgSound()`, `stopBgSound()`, `toggleBgSound()`, `updateBgSoundVolume()`
- [[source-style-css]] — `.bg-sound-group`, `.bg-sound-btn` styles
- [[sound-engine]] — background sounds section added

---

## [2026-07-05] feature | Added dark/light mode toggle with localStorage persistence

Toggle button (☀️/🌙) in the theme switcher. CSS variables only — no new classes. Persists preference in localStorage.

Updated pages:
- [[source-index-html]] — `#btn-mode` added to theme switcher
- [[source-main-js]] — `setMode()`, `toggleMode()`, `loadMode()` functions
- [[source-style-css]] — `[data-mode="light"]` variable overrides, `--border` variable added
- [[design-decisions]] — "What Was Added Later" table added
- [[project-overview]] — features list, file inventory, future directions updated

---

## [2026-07-05] ingest | Added user interview notes

Created `feedback/interview-notes.md` from in-person interview with Khant Thuta Maung. Key feedback: custom durations, light mode, task label — all implemented.

---

## [2026-07-05] deploy | Deployed to Vercel production

`vercel --prod` deployed successfully. Live at https://pomodoro-vibes.vercel.app

# Wiki Index — Pomodoro Timer with Vibes

Catalog of all pages in the wiki, organized by category. Each entry includes a one-line summary.

---

## 📄 Source Pages
Documents extracted and synthesized from the raw source files.

- [[source-index-html]] — DOM structure: timer ring, controls, theme switcher, streak, sound, dialog
- [[source-main-js]] — Application logic: STATE object, timer core, sound, streak, themes, event wiring
- [[source-style-css]] — All styles: CSS variables, dark theme, blob animation, responsive breakpoints
- [[source-CLAUDE-md]] — Master instruction file (schema): workflow rules, design system, build order, hard constraints
- [[source-llm-wiki]] — Karpathy's LLM Wiki methodology: the pattern that inspired this knowledge base

## 🧱 Entity Pages
Key components and subsystems of the application.

- [[timer-engine]] — Core timer: STATE, tick loop, start/pause/reset, mode transitions
- [[theme-system]] — CSS variable–driven mood themes (Focus / Chill / Deep Work) with smooth transitions
- [[streak-persistence]] — localStorage-based daily streak counter with midnight reset
- [[sound-engine]] — Web Audio API chime: C-E-G chord, volume control, mute toggle
- [[transition-dialog]] — Break/focus confirmation dialog with confirm/skip flow
- [[animated-background]] — CSS radial-gradient blob animation, per-theme glow
- [[responsive-design]] — Mobile-first breakpoints, landscape support, safe-area handling

## 🧠 Concept Pages
Cross-cutting patterns, architecture, and design rationale.

- [[architecture]] — How HTML/CSS/JS layers connect, data flow, state management pattern
- [[design-decisions]] — Why vanilla JS, no build step, Web Audio API, localStorage, no backend
- [[agent-workflow]] — Multi-agent orchestration: UI → Logic → QA → Deploy, with GSD skill
- [[mcp-tools-used]] — MCP servers and tools leveraged during development

## 🔍 Synthesis

- [[project-overview]] — Holistic view: what this project is, why it exists, and how everything fits together

## 📋 Meta

- [[log]] — Chronological append-only record of all wiki operations

---

> **Raw sources** (immutable, read-only): `index.html`, `main.js`, `style.css`, `CLAUDE.md`, `llm-wiki.md`, `.claude/agents/*.md`, `.claude/skills/gsd-skill.md`, `slides/pitch.md`, `vercel.json`, `README.md`

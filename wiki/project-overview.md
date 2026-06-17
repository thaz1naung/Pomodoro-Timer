# Project Overview — Pomodoro Timer with Vibes

> Synthesis — holistic view of the entire project. Compiled from all source files and wiki pages.

## What It Is

A **single-page Pomodoro timer** built with vanilla HTML, CSS, and JavaScript. Zero dependencies, zero build steps, zero backend. Opens in any browser and works fully offline.

## What It Does

1. **25-minute Focus sessions** — countdown timer with large monospace display
2. **Auto-transitions** — after focus: 5 min short break (or 15 min long break after every 4th pomodoro)
3. **Confirmation dialog** — user must acknowledge before next session starts
4. **3 mood themes** — Focus (red-orange), Chill (soft blue), Deep Work (deep purple) with smooth CSS transitions
5. **Daily streak counter** — 🍅 icons for completed sessions, persisted in localStorage, resets at midnight
6. **Web Audio chime** — C major chord on timer completion, with volume slider and mute toggle
7. **Animated background** — Subtle floating blob gradient, per-theme colored
8. **Fully responsive** — iPhone SE to desktop, including landscape phones and notched devices

## Technical Architecture

```
index.html (58 lines)  ── DOM structure
style.css  (493 lines) ── Dark theme, CSS variables, animations, responsive
main.js   (238 lines)  ── Timer logic, sound, streak, themes
```

No build tools. No package.json. No node_modules. Open `index.html` — that's the entire development workflow.

For full architecture details: [[architecture]]

## How It Was Built

- **Guided by** [[source-CLAUDE-md]] (schema) and [[source-llm-wiki]] (reasoning framework)
- **Orchestrated via** [[agent-workflow]]: 4 specialized agents (UI, Logic, QA, Deploy) with strict boundaries
- **Governed by** [[design-decisions#Core Philosophy: GSD]]: ship first, polish second, no over-engineering
- **Leveraged** [[mcp-tools-used]]: filesystem MCP, fetch MCP, UI UX Pro Max Skill

## Entity Map

```
┌──────────────────────────────────────────────────────┐
│                   Pomodoro Timer                      │
├──────────────────────────────────────────────────────┤
│  [[timer-engine]]         Core countdown logic        │
│  [[theme-system]]         Mood theme switching         │
│  [[streak-persistence]]   Daily counter + localStorage │
│  [[sound-engine]]         Web Audio API chime          │
│  [[transition-dialog]]    Session change confirmation  │
│  [[animated-background]]  CSS blob animation           │
│  [[responsive-design]]    Multi-device layout          │
└──────────────────────────────────────────────────────┘
```

## File Inventory

| File | Role | Lines |
|------|------|-------|
| `index.html` | DOM structure | 58 |
| `style.css` | All visual styling | 493 |
| `main.js` | All application logic | 238 |
| `CLAUDE.md` | LLM instruction schema | 216 |
| `llm-wiki.md` | Knowledge base methodology | 76 |
| `vercel.json` | Vercel deployment config | 3 |
| `README.md` | Human-facing project description | 27 |
| `.claude/agents/*.md` | 4 agent definitions | ~70 total |
| `.claude/skills/gsd-skill.md` | GSD workflow skill | 15 |
| `slides/pitch.md` | PechaKucha presentation | 59 |
| `wiki/` | **This knowledge base** | **17 files** |

## Key Constraints Respected

- ❌ No external JS libraries → ✅ Vanilla JS only
- ❌ No backend / database / API → ✅ localStorage + browser APIs
- ❌ No audio files → ✅ Web Audio API synthesis
- ❌ No build step → ✅ Plain HTML/CSS/JS, open in browser
- ❌ No unrequested features → ✅ Exactly the feature checklist from CLAUDE.md
- ✅ Works fully offline → ✅ Google Fonts are the only CDN dependency, with system font fallback

## Future Directions (Not Yet Built)

Per [[design-decisions#What Was Deliberately NOT Built]]:
- Task list integration
- Customizable durations
- Notification popups
- Data export / statistics
- Keyboard shortcuts
- PWA / service worker
- Dark/light mode toggle (always dark by design)

## Deployed At

Configured for Vercel static hosting (`vercel.json`). Deployed with `vercel --prod`.

---

*This overview is a synthesis. For detail, follow the links to entity and concept pages. To see what's changed, check [[log]].*

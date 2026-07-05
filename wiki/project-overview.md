# Project Overview — Pomodoro Timer with Vibes

> Synthesis — holistic view of the entire project. Compiled from all source files and wiki pages.

## What It Is

A **single-page Pomodoro timer** built with vanilla HTML, CSS, and JavaScript. Zero dependencies, zero build steps, zero backend. Opens in any browser and works fully offline.

## What It Does

1. **Customizable Focus sessions** — countdown timer with large monospace display (default 25 min, adjustable)
2. **Custom durations** — Focus / Short Break / Long Break lengths adjustable via number inputs
3. **Auto-transitions** — after focus: short break (or long break after every 4th pomodoro)
4. **Confirmation dialog** — user must acknowledge before next session starts
5. **Task label** — text input to track what you're working on, shown while timer runs
6. **3 mood themes** — Focus (red-orange), Chill (soft blue), Deep Work (deep purple) with smooth CSS transitions
7. **Dark / light mode** — toggle between dark (default) and light, persisted in localStorage
8. **Daily streak counter** — 🍅 icons for completed sessions, persisted in localStorage, resets at midnight
9. **Web Audio chime** — C major chord on timer completion, with volume slider and mute toggle
10. **Background sounds** — Rain / White Noise / Lofi ambient audio, toggleable, volume follows slider
11. **Browser notifications** — alerts when timer ends if tab isn't focused
12. **Animated background** — Subtle floating blob gradient, per-theme colored
13. **Fully responsive** — iPhone SE to desktop, including landscape phones and notched devices

## Technical Architecture

```
index.html (86 lines)  ── DOM structure
style.css  (630 lines) ── Dark/light theme, CSS variables, animations, responsive
main.js   (415 lines)  ── Timer logic, sound, streak, themes, bg sounds, notifications
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
| `index.html` | DOM structure | 86 |
| `style.css` | All visual styling | 630 |
| `main.js` | All application logic | 415 |
| `CLAUDE.md` | LLM instruction schema | 216 |
| `llm-wiki.md` | Knowledge base methodology | 76 |
| `vercel.json` | Vercel deployment config | 3 |
| `README.md` | Human-facing project description | 27 |
| `.claude/agents/*.md` | 4 agent definitions | ~70 total |
| `.claude/skills/gsd-skill.md` | GSD workflow skill | 15 |
| `slides/pitch.md` | PechaKucha presentation | 59 |
| `slides/tech-stack.md` | Tech stack Marp deck | 89 |
| `feedback/interview-notes.md` | User interview notes | 32 |
| `wiki/` | **This knowledge base** | **20+ files** |

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
- Data export / statistics
- Keyboard shortcuts
- PWA / service worker

## Deployed At

Configured for Vercel static hosting (`vercel.json`). Deployed with `vercel --prod`.

---

*This overview is a synthesis. For detail, follow the links to entity and concept pages. To see what's changed, check [[log]].*

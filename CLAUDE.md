# 🍅 Pomodoro Timer with Vibes — Claude Code Instructions

## 📖 Read First (Before Any Code)

1. Read `llm-wiki.md` (Karpathy LLM Wiki) — understand how to reason with LLMs effectively
2. UI UX Pro Max Skill plugin is **already loaded** — apply it to every UI decision
3. Follow this file top to bottom before writing a single line of code

---

## 🧠 Knowledge Sources

### Karpathy LLM Wiki (`llm-wiki.md`)
- Location: `llm-wiki.md` in project root
- Purpose: guides how to think, prompt, and reason during this build
- Rule: if unsure about any AI-assisted decision → refer back to `llm-wiki.md`
- Apply Karpathy's principle: **clarity over cleverness**

### UI UX Pro Max Skill (Plugin)
- Already active as a Claude Code plugin — no need to fetch externally
- Apply its design tokens, spacing rules, typography, and component patterns
- Every UI component must pass the plugin's quality standard before shipping

### Project Wiki (`wiki/`)
- Location: `wiki/` directory — a persistent, structured knowledge base for this project
- Built following the `llm-wiki.md` methodology: the LLM incrementally maintains interlinked markdown pages
- **Read `wiki/index.md` first** before any session — it catalogs all pages by category (sources, entities, concepts, synthesis)
- Pages to read for context: `wiki/architecture.md`, `wiki/design-decisions.md`, `wiki/project-overview.md`

#### Wiki Operations (apply on every session)

**Before making changes:**
- Read `wiki/index.md` → find relevant entity/concept pages → read them for context
- Read `wiki/log.md` to see what changed recently

**After making changes:**
- **Ingest**: Update affected wiki pages — if you changed a feature, update its entity page. If you added a new pattern, create a concept page. Update the index. Append to the log.
- **Lint** (periodically, or when asked): Health-check the wiki. Look for:
  - Contradictions between pages (e.g., a feature described differently in two places)
  - Stale claims superseded by recent changes
  - Orphan pages with no inbound links from other wiki pages
  - Important concepts mentioned in entity pages but lacking their own page
  - Missing cross-references between related pages

**Query workflow:**
- When asked a question about this project → search `wiki/` for relevant pages → synthesize answer with citations to wiki pages → file valuable answers back into the wiki as new pages

---

## ⚡ GSD (Get Shit Done) Workflow Rules

```
Ship first. Polish second. Never over-engineer.
```

- ✅ Build the **simplest working version** first
- ✅ One feature at a time — no bundling multiple changes
- ✅ If it works, ship it — don't refactor unless broken
- ❌ No extra features unless explicitly requested
- ❌ No abstractions, no premature optimization
- ❌ No "while I'm at it..." additions
- ❌ Never block shipping on perfection

### GSD Decision Rule:
> "Does the user need this right now?" → No → Don't build it.

---

## 🎨 Design System Rules (UI UX Pro Max Skill)

### Aesthetic
- Style: **Lofi / Minimal / Calm**
- Theme: Dark base with soft accent colors
- Feel: focused, breathable, not cluttered

### Colors
```
Background:  #0f0f0f or #111118
Surface:     #1a1a2e
Accent:      per mood theme (see Mood Themes below)
Text:        #e0e0e0 (primary), #888 (secondary)
```

### Typography
- Font: `Inter` or `DM Sans` (Google Fonts, loaded via CDN)
- Timer display: large monospace (`JetBrains Mono` or `Space Mono`)
- Hierarchy: clear size difference between timer, labels, and buttons

### Spacing & Layout
- Centered single column layout
- Generous padding — never cramped
- Mobile-first, responsive at all breakpoints

### Animations
- CSS transitions only (no heavy JS animation libraries)
- Subtle: button hover lifts, timer pulse on tick, smooth theme transitions
- Background: gentle CSS keyframe animation (floating blobs or particles)

### Component Rules (from UI UX Pro Max Skill)
- Buttons: rounded, clear hover/active states, never flat and lifeless
- Timer ring: SVG circular progress or large bold text — clean, readable
- Cards/panels: soft border or glassmorphism — no harsh borders

---

## ✅ Features to Build

### Core Timer
- [ ] 25 min **Focus** session
- [ ] 5 min **Short Break**
- [ ] 15 min **Long Break** (after 4 pomodoros)
- [ ] **Start / Pause / Reset** buttons
- [ ] Auto-transition between focus and break (with user confirmation prompt)
- [ ] Visual countdown — large, centered, monospace font

### Streak & Progress
- [ ] Pomodoro streak counter (today's completed sessions)
- [ ] Persist streak in `localStorage` (resets at midnight)
- [ ] Visual indicator: 🍅 icons for completed rounds

### Mood Themes
| Mode | Accent Color | Vibe |
|------|-------------|------|
| 🎯 Focus | `#e63946` red-orange | sharp, energized |
| 😌 Chill | `#457b9d` soft blue | calm, relaxed |
| 🌙 Deep Work | `#6a0572` deep purple | dark, immersive |

- Theme switcher: 3 buttons or toggle pills
- Smooth CSS transition when switching themes

### Sound
- Bell/chime sound when timer ends
- Built with **Web Audio API** — zero external audio files
- Volume control slider (simple, minimal)
- Mute toggle button 🔇

### Background
- Animated CSS background (floating blobs or slow gradient shift)
- Animation changes subtly per mood theme
- Must not distract from timer — ambient only

### Responsive
- Works perfectly on mobile (375px+) and desktop
- Timer text scales with viewport
- Buttons tap-friendly on mobile (min 44px touch targets)

---

## 🚀 Deployment (Vercel)

### Project Structure
```
pomodoro-vibes/
├── CLAUDE.md          ← this file
├── wiki.md            ← Karpathy LLM wiki
├── index.html         ← single page app entry
├── style.css          ← all styles
├── main.js            ← all logic
├── vercel.json        ← deployment config
└── README.md          ← project description
```

### `vercel.json` (use exactly this):
```json
{
  "version": 2,
  "builds": [
    { "src": "index.html", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### Deployment Rules
- ❌ No backend, no serverless functions, no API routes
- ❌ No build step required (plain HTML/CSS/JS)
- ✅ Must deploy with `vercel --prod` in one command
- ✅ All assets self-contained (no broken CDN dependencies at runtime)
- ✅ Google Fonts loaded via `<link>` in `<head>` — acceptable CDN use

### Pre-Deploy Checklist
- [ ] Open `index.html` locally — timer works fully offline
- [ ] All 3 mood themes switch correctly
- [ ] Streak persists on page refresh (localStorage)
- [ ] Sound plays on timer end
- [ ] Mobile layout looks correct (use browser DevTools)
- [ ] No console errors

---

## 🤖 Agent Responsibilities (if multi-agent)

| Agent | Responsibility |
|-------|---------------|
| **UI Agent** | Build `index.html` + `style.css` — layout, themes, animations |
| **Logic Agent** | Build `main.js` — timer logic, localStorage, Web Audio API |
| **QA Agent** | Test all features manually, check responsive, verify localStorage |
| **Deploy Agent** | Create `vercel.json`, write `README.md`, run `vercel --prod` |

### Agent Handoff Rules
- UI Agent ships HTML/CSS shell first (timer display, buttons, theme switcher)
- Logic Agent wires JS only after UI shell is approved
- QA Agent tests before Deploy Agent touches anything
- Deploy Agent never modifies logic or UI — deployment config only

---

## 🚫 Hard Rules (Never Break)

- ❌ No external JavaScript libraries (no jQuery, no React, no lodash)
- ❌ No backend, database, or API calls of any kind
- ❌ No audio files — Web Audio API only
- ❌ No over-commenting code — clean code speaks for itself
- ❌ Never add a feature not listed above without asking first
- ✅ Vanilla HTML + CSS + JS only
- ✅ Every change must be testable in the browser immediately
- ✅ GSD: if it works, it ships

---

## 📋 Build Order (Follow This Exactly)

```
Step 1: HTML skeleton (index.html — structure only, no styles)
Step 2: CSS styling (style.css — layout, fonts, dark theme, animations)
Step 3: Timer logic (main.js — countdown, start/pause/reset)
Step 4: Mood themes (CSS variables switching via JS)
Step 5: Streak counter (localStorage read/write)
Step 6: Sound (Web Audio API bell on timer end)
Step 7: Responsive polish (mobile breakpoints)
Step 8: Pre-deploy checklist
Step 9: vercel.json + README.md
Step 10: Deploy → vercel --prod
```

> **GSD reminder:** Complete each step fully before moving to the next.
> Do not jump ahead. Do not combine steps.

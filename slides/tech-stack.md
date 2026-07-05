<!--
  Marp template — "tech-stack"
  Render:  marp slides/tech-stack.md -o slides/tech-stack.html
  Tech stack, agents, skills, and methodology behind the build
-->
---
marp: true
paginate: true
size: 16:9
---

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@500&display=swap');
:root { --bg:#f8fafc; --ink:#0f172a; --muted:#64748b; --accent:#0d9488; --line:#e2e8f0; --code:#0f172a; }
section {
  background:var(--bg); color:var(--ink);
  font-family:'Inter','Noto Sans','Pyidaungsu',sans-serif;
  font-size:26px; line-height:1.5; padding:48px 64px;
}
h1 { color:var(--ink); font-weight:800; font-size:1.6em; }
h2 { color:var(--accent); font-weight:600; }
h3 { color:var(--muted); font-weight:600; }
strong { color:var(--accent); }
a { color:var(--accent); text-decoration:none; }
img { border-radius:12px; box-shadow:0 12px 30px rgba(15,23,42,.18); }
code { background:#e6fffb; color:#0f766e; padding:.06em .35em; border-radius:5px; font-family:'JetBrains Mono',monospace; }
pre  { background:var(--code); border-radius:10px; }
pre code { background:none; color:#e2e8f0; }
blockquote { border-left:4px solid var(--accent); background:#ecfeff; color:#155e75; padding:.5em 1em; }
header,footer,section::after { color:var(--muted); font-size:.5em; }
section.cover {
  background:radial-gradient(800px 360px at 82% 14%, rgba(13,148,136,.18), transparent 60%), var(--bg);
}
section.cover h1 { font-size:2.3em; }
section.cover h2 { color:var(--muted); font-weight:400; }
</style>

<!-- _class: cover -->

# Tech Stack

## How Pomodoro Timer with Vibes was built — tools, agents, and methodology

---

# Tech Stack

### Vanilla HTML / CSS / JS — zero frameworks, zero build step

- **`index.html`** — single-page structure
- **`style.css`** — dark themes, animations, responsive layout
- **`main.js`** — timer logic, streak tracking, Web Audio API sound
- **Vercel** — static hosting, global edge, instant deploys

```
No React. No build step. No backend. Just open and go.
```

---

# Agent: UI Agent

### What it does

- Builds the **HTML skeleton** and **CSS styling**
- Sets up layout, fonts, dark theme, animations
- Ships the visual shell — timer display, buttons, theme switcher
- Handles responsive design (mobile + desktop)

> The Logic Agent only starts wiring JS **after** the UI shell is approved.

---

# Skill: GSD Skill

### Get Shit Done — ship first, polish second

- **One feature at a time** — no bundling changes
- **Simplest working version first** — no over-engineering
- **Ship if it works** — don't refactor unless broken
- **No extra features** unless explicitly requested

> "Does the user need this right now?" → No → Don't build it.

---

# Methodology: GSD

### Build order enforced, no jumping ahead

1. HTML skeleton (structure only)
2. CSS styling (layout, fonts, dark theme)
3. Timer logic (countdown, start/pause/reset)
4. Mood themes (CSS variables via JS)
5. Streak counter (localStorage)
6. Sound (Web Audio API bell)
7. Responsive polish (mobile breakpoints)
8. Pre-deploy checklist → Vercel

---

# Trigger: How Agents & Skills Activate

### When does the UI Agent start?

- **Agent prompt** → `/agents/ui-agent` — spins up a sub-agent focused on HTML + CSS
- The agent reads `CLAUDE.md` rules, follows the build order, ships UI first

### When does the GSD Skill kick in?

- **Automatic** — baked into every decision in `CLAUDE.md`
- The agent checks: *"Is this needed right now?"* before writing anything

---

# Commands: Exact Phrases

### To invoke the agents

```
/ui-agent    — build the HTML + CSS shell
/logic-agent — wire up main.js after UI is approved
```

### To trigger GSD decisions

```
Does the user need this right now? → No → Don't build it.
Ship if it works. Don't refactor unless broken.
One feature at a time. No bundling.
```

> Copy-paste these into any prompt to keep the build on track.

---

<!-- _class: cover -->

# Ship Fast, Stay Focused

## GSD + UI Agent + Vanilla JS = zero friction, instant results

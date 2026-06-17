# Agent Workflow

> Concept — multi-agent build orchestration. Synthesized from `CLAUDE.md`, `.claude/agents/*.md`, `.claude/skills/gsd-skill.md`, `slides/pitch.md`

## Overview

The Pomodoro Timer was built using a structured multi-agent workflow orchestrated by Claude Code, guided by `CLAUDE.md` as the schema and `llm-wiki.md` as the reasoning framework.

## Agent Roles

Four specialized agents, each with strict boundaries:

### UI Agent
- **Scope**: `index.html` + `style.css`
- **Delivers**: DOM structure, dark theme, animations, responsive layout
- **Cannot**: Write any JavaScript, touch localStorage, configure deployment
- **Definition**: `.claude/agents/ui-agent.md`

### Logic Agent
- **Scope**: `main.js`
- **Delivers**: Timer countdown, start/pause/reset, theme switching, streak persistence, Web Audio chime, volume/mute
- **Cannot**: Modify HTML or CSS, configure deployment
- **Definition**: `.claude/agents/logic-agent.md`

### QA Agent
- **Scope**: Manual testing only
- **Delivers**: Pass/fail report for each Pre-Deploy Checklist item
- **Cannot**: Write any code — reports issues, doesn't fix them
- **Definition**: `.claude/agents/qa-agent.md`

### Deploy Agent
- **Scope**: `vercel.json` + `README.md` + `vercel --prod`
- **Delivers**: Deployment config, project README, production deployment
- **Cannot**: Modify any source code (HTML, CSS, JS)
- **Definition**: `.claude/agents/deploy-agent.md`

## Build Order (from CLAUDE.md)

```
Step 1:  HTML skeleton    → UI Agent
Step 2:  CSS styling      → UI Agent
Step 3:  Timer logic      → Logic Agent
Step 4:  Mood themes      → Logic Agent
Step 5:  Streak counter   → Logic Agent
Step 6:  Sound            → Logic Agent
Step 7:  Responsive       → UI Agent
Step 8:  Pre-deploy check → QA Agent
Step 9:  Config + README  → Deploy Agent
Step 10: Deploy           → Deploy Agent
```

## Handoff Rules

1. **UI Agent ships HTML/CSS first** — Logic Agent only starts after the DOM structure exists
2. **Logic Agent wires JS only after UI shell is approved** — uses selectors from existing markup, never modifies HTML
3. **QA Agent tests before Deploy Agent touches anything** — gate check
4. **Deploy Agent never modifies logic or UI** — deployment config only

## GSD Skill

The GSD (Get Shit Done) skill (`.claude/skills/gsd-skill.md`) governs all agents:

- **Ship simplest working version first** — nothing ships broken, nothing waits on perfection
- **One feature at a time** — build, verify, move on
- **No extras unless asked** — "Does the user need this right now?" → No → Don't build it
- **One change at a time** — atomic diffs, easy to review and revert
- **Test locally before deploying** — open `index.html` in browser

## MCP Tools Used

Per `slides/pitch.md` (slide 4), the build leveraged:
- **MCP filesystem** — read `CLAUDE.md` and `llm-wiki.md`
- **MCP fetch** — load UI UX Pro Max Skill
- See [[mcp-tools-used]] for full details

## Boundary Enforcement

Each agent definition includes explicit **Boundaries** sections with ❌/✅ lists. This prevents:
- Scope creep (Logic Agent can't decide to restyle buttons)
- Accidental coupling (UI Agent can't leave placeholder JS)
- Deployment from broken state (Deploy Agent can't run before QA passes)

## What This Workflow Proves

From `slides/pitch.md` (slide 5): *"Shows Claude Code can follow structured CLAUDE.md instructions end-to-end."* The multi-agent pattern with strict boundaries and sequential handoffs demonstrates that LLM agents can collaborate on a single codebase without stepping on each other's work.

## Related Pages
- [[source-CLAUDE-md]] — the full workflow specification
- [[design-decisions]] — GSD philosophy that drives the workflow
- [[mcp-tools-used]] — tools the agents used
- [[project-overview]] — the result of this workflow

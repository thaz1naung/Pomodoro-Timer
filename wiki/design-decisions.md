# Design Decisions

> Concept — rationale behind key technical choices. Synthesized from `CLAUDE.md`, `llm-wiki.md`, and all source files.

## Core Philosophy: GSD (Get Shit Done)

From [[source-CLAUDE-md]]: *"Ship first. Polish second. Never over-engineer."*

Every decision below follows the GSD decision rule: **"Does the user need this right now?" → No → Don't build it.**

## Technology Choices

### Vanilla HTML + CSS + JS (No Frameworks)

**Decision**: Zero external JavaScript libraries. No React, Vue, jQuery, lodash.

**Why**:
- The app has one page, one timer, ~10 interactive elements — a framework is overkill
- No build step means instant iteration: save file, refresh browser
- No dependency tree means no `npm install`, no version conflicts, no supply chain risk
- The project's goal is a simple, self-contained tool — not a platform

**Tradeoff**: Manual DOM manipulation is more verbose than reactive frameworks. Acceptable at this scale.

### No Backend / No API Calls

**Decision**: Everything runs in the browser. No server, no database, no external API.

**Why**:
- The only persistent data is today's pomodoro count — localStorage handles this
- A backend adds deployment complexity, cost, and failure modes
- Works fully offline — a core requirement (see [[source-CLAUDE-md#Pre-Deploy Checklist]])

### Web Audio API (No Audio Files)

**Decision**: Synthesize the completion chime programmatically rather than playing an MP3/WAV.

**Why** (from [[source-CLAUDE-md#Hard Rules]]):
- ❌ No audio files — explicit hard rule
- Web Audio API is built into every modern browser — zero external dependencies
- Programmatic generation enables precise timing and volume control
- Works offline — no network request for audio assets

**Tradeoff**: More code than `<audio src="bell.mp3">`. Requires browser support (all modern browsers support it). See [[sound-engine]].

### localStorage for Persistence

**Decision**: Store streak data in `localStorage` under a single JSON key.

**Why**:
- Synchronous API — simple to read/write without promises or callbacks
- No quota concerns — storing one JSON object with two fields is negligible
- No backend needed — full offline support
- Auto-persists across browser sessions

**Tradeoff**: Not synced across devices. Lost if browser data is cleared. No encryption. Acceptable for a timer app.

### CSS Variables for Theming

**Decision**: Use CSS custom properties with `data-theme` attribute on `<body>` instead of JS-driven class toggling.

**Why** (detailed in [[theme-system]]):
- One attribute change cascades to all themed elements
- Adding a new themed element requires only CSS — no JS changes
- CSS transitions handle crossfade automatically
- Separation of concerns: CSS owns presentation, JS owns state

### setInterval for Timer Tick

**Decision**: Use `setInterval(tick, 1000)` rather than `requestAnimationFrame` or `setTimeout` chaining.

**Why**:
- 1-second granularity is the requirement — no need for sub-second precision
- Simpler than `setTimeout` chaining (no need to recalculate drift)
- `requestAnimationFrame` is for visual animations, not timers — would over-complicate

**Tradeoff**: `setInterval` can drift (if the callback takes >0ms). Over 25 minutes, drift might be 1–2 seconds. Not noticeable for a pomodoro timer. See [[timer-engine]].

### Lazy Midnight Reset

**Decision**: Reset streak on next page load rather than at exactly midnight.

**Why** (from [[streak-persistence]]):
- `setTimeout` to midnight requires calculating exact delay and handling tab suspension
- Lazy reset is simpler: check date on load and on save
- If the user is running a pomodoro at midnight, their current session isn't interrupted

**Tradeoff**: Stale count if the user leaves the tab open overnight. Minor UX issue.

### CSS-Only Animations

**Decision**: All animations use CSS `@keyframes` and `transition`. No `requestAnimationFrame`, no JS animation libraries.

**Why**:
- GPU-composited — performant on low-end devices
- `prefers-reduced-motion` media query can disable them (not yet implemented — potential future addition)
- Theme transitions "just work" by animating CSS variable–referenced properties
- Zero JS maintenance burden

**Tradeoff**: Less expressive than JS animations. Cannot respond to timer state (e.g., pulsing faster near deadline). Acceptable for ambient-only animation (see [[animated-background]]).

### Google Fonts via CDN

**Decision**: Load Inter and JetBrains Mono from Google Fonts CDN via CSS `@import`.

**Why** (from [[source-CLAUDE-md#Deployment Rules]]):
- "Google Fonts loaded via `<link>` in `<head>` — acceptable CDN use"
- The only exception to the "all assets self-contained" rule

**Tradeoff**: Requires network on first load. Fonts are cached by browser thereafter. Falls back to system fonts if CDN is unreachable.

## What Was Deliberately NOT Built

| Feature | Why Skipped |
|---------|-------------|
| Task list / todo integration | Not in requirements |
| Customizable durations | Not in requirements — 25/5/15 only |
| Notification popup | Not in requirements — tab title update is sufficient |
| Data export | Not in requirements |
| Keyboard shortcuts | Not in requirements |
| Dark/light mode toggle | Always dark by design (focus-oriented) |
| Service worker / PWA | Not in requirements |
| Multiple timer presets | Not in requirements |
| Statistics / history | Streak counter only — per requirements |

## Related Pages
- [[source-CLAUDE-md]] — the rules and constraints these decisions follow
- [[architecture]] — how these decisions shape the system structure
- [[agent-workflow]] — how GSD philosophy was applied in the build process

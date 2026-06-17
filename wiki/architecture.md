# Architecture

> Concept — cross-cutting system design. Synthesized from `CLAUDE.md`, `index.html`, `main.js`, `style.css`

## Overview

The Pomodoro Timer is a **client-side-only single-page application** with three layers:

```
┌─────────────────────────────────────────┐
│  main.js  ←── Logic Layer               │
│  Reads/writes DOM, manages state        │
├─────────────────────────────────────────┤
│  style.css ←── Presentation Layer       │
│  CSS variables, layout, animations      │
├─────────────────────────────────────────┤
│  index.html ←── Structure Layer         │
│  DOM elements, semantic markup          │
└─────────────────────────────────────────┘
       │
       ▼
  localStorage ←── Persistence Layer
  (streak data only)
```

No backend, no API calls, no build step. The browser is the entire runtime.

## Data Flow

### State Management Pattern

A single global `STATE` object is the source of truth (see [[source-main-js#STATE Object]]). All functions read and mutate `STATE` directly — no immutability, no state management library, no pub/sub.

```
User Click → Event Listener → Mutate STATE → updateDisplay() → DOM
                                          → saveStreak()   → localStorage
                                          → playChime()    → Web Audio API
```

### Event Flow

```
Button Click
  → addEventListener callback
    → mutates STATE (timeLeft, isRunning, mode, etc.)
    → calls display update function
    → may trigger side effects (sound, localStorage)
```

### Mode Transition Flow

```
timerComplete()
  ├─ pause()                        [→ timer-engine]
  ├─ playChime()                    [→ sound-engine]
  ├─ if focus:                      [→ streak-persistence]
  │    STATE.completedPomodoros++
  │    saveStreak()
  ├─ updateDisplay()
  └─ showTransitionDialog()         [→ transition-dialog]
       │
       ├─ User clicks Confirm
       │    confirmTransition()
       │    ├─ setMode(pending)      [→ timer-engine]
       │    └─ start()               [auto-starts countdown]
       │
       └─ User clicks Skip
            skipTransition()
            ├─ setMode(pending)
            └─ (does NOT auto-start)
```

## Layer Boundaries

### HTML → CSS
- HTML defines class names and structure — CSS targets those classes
- No inline styles — all styling in CSS file
- CSS uses attribute selectors (`[data-theme="focus"]`) for theme states set by JS

### HTML → JS
- HTML defines IDs for JS to target (`#btn-start`, `#streak-display`)
- JS reads/writes text content and class lists — never modifies structure
- No inline event handlers (`onclick=""`) — all listeners added via `addEventListener` in JS

### CSS → JS
- JS sets `data-theme` attribute on `<body>` — CSS responds via `[data-theme]` selectors
- JS toggles `.hidden` class on dialog — CSS uses `display: none`
- JS toggles `.active` class on theme buttons — CSS styles active pill

### JS → localStorage
- Write: `saveStreak()` on focus completion (serializes to JSON)
- Read: `loadStreak()` on page load (parses from JSON, handles missing/corrupt data)

## What's NOT in the Architecture

- ❌ No router — single page, no URL state
- ❌ No component system — no templates, no custom elements, no shadow DOM
- ❌ No build/packaging — no bundler, no minifier, no transpiler
- ❌ No service worker — no offline caching beyond browser cache
- ❌ No observability — no error tracking, no analytics, no logging
- ❌ No i18n — English only, strings hardcoded

## Key Architectural Decisions

| Decision | Rationale | See |
|----------|-----------|-----|
| Single STATE object | Simplest possible state management — adequate for <10 state fields | [[design-decisions]] |
| setInterval tick | Adequate for 1-second granularity — `requestAnimationFrame` unnecessary | [[timer-engine]] |
| CSS variables for theming | Single attribute change cascades to all themed elements | [[theme-system]] |
| localStorage for persistence | Zero-config, synchronous, adequate for single key | [[streak-persistence]] |
| IDs for JS targets | `getElementById` is unambiguous and fast | [[source-index-html]] |

## Related Pages
- [[source-index-html]] — structure layer details
- [[source-main-js]] — logic layer details
- [[source-style-css]] — presentation layer details
- [[design-decisions]] — rationale for architectural choices
- [[timer-engine]] — state management and tick loop
- [[theme-system]] — CSS/JS boundary for theming

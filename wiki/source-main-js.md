# Source: main.js

> Raw source: `main.js` (238 lines)

## Overview

All application logic in a single vanilla JS file. No imports, no exports, no modules — everything runs in the global scope on load. Operates on the DOM structure defined in [[source-index-html]].

## STATE Object

Single source of truth for all mutable application state. Lives in the global scope as `const STATE`.

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `mode` | string | `'focus'` | Current session type: `focus`, `shortBreak`, `longBreak` |
| `timeLeft` | number | `1500` | Seconds remaining in current session |
| `totalTime` | number | `1500` | Total seconds for the session (used for potential progress display) |
| `isRunning` | boolean | `false` | Whether the timer is actively counting down |
| `intervalId` | number\|null | `null` | `setInterval` handle for the tick loop |
| `completedPomodoros` | number | `0` | Today's completed focus sessions |
| `muted` | boolean | `false` | Sound mute state |
| `volume` | number | `0.5` | Volume level (0–1 range) |

## Constants

- **`DURATIONS`**: Maps mode → seconds (`focus`: 1500, `shortBreak`: 300, `longBreak`: 900)
- **`LABELS`**: Maps mode → display label (`focus`: "Focus", `shortBreak`: "Short Break", `longBreak`: "Long Break")

## Function Map

### Timer Core (→ [[timer-engine]])
- `formatTime(seconds)` — converts seconds to `MM:SS` string with zero-padding
- `updateDisplay()` — syncs timer text, session label, document title, and streak display to DOM
- `tick()` — decrements `timeLeft`, calls `updateDisplay()`, triggers `timerComplete()` at zero
- `start()` — begins the `setInterval` tick loop (1s interval), requests notification permission on first click
- `pause()` — clears the interval, nulls the handle
- `applyDurations()` — reads custom duration inputs and updates `DURATIONS` object
- `reset()` — pauses, applies custom durations, resets `timeLeft`, clears task label
- `setMode(mode)` — switches mode and resets timer

### Task Label
- `showTaskLabel()` — hides input, shows label text as plain text while timer runs
- `clearTaskLabel()` — clears input, restores input visibility on reset

### Notifications
- `requestNotifPermission()` — requests browser notification permission on first Start click
- `notify(title, body)` — sends notification only when page is not focused

### Timer Completion (→ [[transition-dialog]])
- `timerComplete()` — pauses timer, plays chime, increments streak if focus session ended, shows transition dialog
- `showTransitionDialog(mode)` — sets `pendingTransition`, updates dialog message, shows overlay
- `hideTransitionDialog()` — hides overlay, clears pending transition
- `confirmTransition()` — switches to pending mode, hides dialog, auto-starts timer
- `skipTransition()` — switches mode but resets timer without auto-starting

### Sound (→ [[sound-engine]])
- `getAudioContext()` — lazily creates and caches an `AudioContext` (browser policy compliance)
- `playChime()` — schedules a C-E-G major chord using three oscillators with exponential decay (0.6s per note, 0.15s stagger)
- Volume and mute controlled via `STATE.muted` and `STATE.volume` — no separate functions

### Background Sound (→ [[sound-engine]])
- `createNoiseBuffer(ctx)` — generates a 2-second white noise buffer
- `createBrownNoise(ctx)` — generates a 2-second brown noise buffer (random walk)
- `startBgSound(type)` — starts one of three background sounds: rain (brown noise + lowpass), white noise, lofi (noise + lowpass + LFO modulation)
- `stopBgSound()` — stops and cleans up the current background sound
- `toggleBgSound(type)` — toggles a background sound on/off (one at a time)
- `updateBgSoundVolume()` — syncs background sound volume with the slider

### Dark / Light Mode
- `setMode(mode)` — sets `data-mode` attribute on `<body>`, updates button icon, saves to localStorage
- `toggleMode()` — switches between dark and light
- `loadMode()` — restores saved mode from localStorage on init

### Streak (→ [[streak-persistence]])
- `saveStreak()` — writes `completedPomodoros` to localStorage keyed by today's ISO date
- `loadStreak()` — reads from localStorage; resets to 0 if stored date doesn't match today
- `updateStreakDisplay()` — renders 🍅 emoji repeated per count, or "—" if zero

### Theme (→ [[theme-system]])
- `setTheme(theme)` — sets `data-theme` attribute on `<body>`, updates active button state
- Theme buttons wired via `querySelectorAll('[data-theme]')` + click listeners

## Event Listeners
All wired at the bottom of the file via `addEventListener`:
- **Start/Pause/Reset** buttons → `start()`, `pause()`, `reset()`
- **Confirm/Skip** dialog buttons → `confirmTransition()`, `skipTransition()`
- **Mute button** → toggles `STATE.muted`, updates button text (🔊/🔇)
- **Volume slider** → converts 0–100 range to 0–1 for `STATE.volume`, updates bg sound volume
- **Theme buttons** → `setTheme()` with the button's `data-theme` value
- **Mode toggle** → `toggleMode()` switches dark/light
- **Background sound buttons** → `toggleBgSound()` with the button's `data-sound` value

## Initialization
On script load (bottom of file):
1. Set default theme: `data-theme="focus"` on `<body>`
2. Load dark/light mode from localStorage
3. Load streak from localStorage
4. Update display (timer text, label, title, streak)
5. Update mute button icon

## Related Pages
- [[source-index-html]] — DOM elements this file operates on
- [[source-style-css]] — styles for dynamically toggled states
- [[timer-engine]] — detailed breakdown of timer logic
- [[sound-engine]] — detailed breakdown of Web Audio API usage
- [[streak-persistence]] — detailed breakdown of localStorage pattern
- [[theme-system]] — detailed breakdown of theme switching
- [[transition-dialog]] — detailed breakdown of auto-transition flow

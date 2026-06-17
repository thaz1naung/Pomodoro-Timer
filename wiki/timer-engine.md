# Timer Engine

> Entity — core subsystem. Source: `main.js` lines 1–95 (see [[source-main-js]])

## What It Is

The central countdown mechanism that drives the entire Pomodoro experience. A `setInterval`-based tick loop decrements a seconds counter every second, updates the DOM, and triggers transitions when time runs out.

## State

All timer state lives in `const STATE` (see [[architecture]] for the full state management pattern):

```
mode: 'focus' | 'shortBreak' | 'longBreak'
timeLeft: seconds (integer, counts down)
totalTime: seconds (integer, constant per session)
isRunning: boolean
intervalId: number | null
```

Durations per mode: **Focus** 25 min (1500s), **Short Break** 5 min (300s), **Long Break** 15 min (900s).

## Tick Loop

```
start() → setInterval(tick, 1000) → STATE.intervalId
tick() → STATE.timeLeft-- → updateDisplay() → timerComplete() at 0
pause() → clearInterval → STATE.intervalId = null
```

- `start()` is **idempotent** — guards on `STATE.isRunning` to prevent double intervals
- `pause()` always clears safely, even if not running (intervalId is null)
- `tick()` also guards: returns early if `timeLeft <= 0` to prevent negative values

## Display Updates

`updateDisplay()` syncs three DOM locations on every tick:
1. **`.timer-text`** → `formatTime(STATE.timeLeft)` via [[source-main-js#formatTime]]
2. **`.session-label`** → `LABELS[STATE.mode]` ("Focus", "Short Break", "Long Break")
3. **`document.title`** → `"MM:SS — Label"` (visible in browser tab)

Also calls `updateStreakDisplay()` (see [[streak-persistence]]).

## Mode Transitions

`setMode(mode)` → `reset()` → `timeLeft = DURATIONS[mode]`

Modes form a cycle:
```
Focus → (4 pomodoros?) → Long Break ─┐
  │                                    │
  └──→ Short Break ──────────────────→┘
```

The "4 pomodoros" rule is checked in `timerComplete()`, not in `setMode()`. After every 4th completed focus session (`completedPomodoros % 4 === 0`), the break is a Long Break instead of Short Break.

## Auto-Transition Flow

When the timer hits zero:
1. `pause()` — stop the interval
2. `playChime()` — sound notification (see [[sound-engine]])
3. If focus just ended: increment `completedPomodoros`, save to localStorage
4. Show the [[transition-dialog]] with the appropriate next mode
5. User confirms → `confirmTransition()` auto-starts; user skips → `skipTransition()` resets without starting

## Edge Cases Handled

- **Double start**: `start()` checks `isRunning` — no-op if already running
- **Tick past zero**: `tick()` returns early if `timeLeft <= 0`
- **Reset while running**: `reset()` calls `pause()` first to clear the interval
- **Mode switch mid-session**: `setMode()` calls `reset()`, which pauses and reinitializes

## Related Pages
- [[source-main-js]] — full source extraction
- [[transition-dialog]] — what happens when timer completes
- [[sound-engine]] — chime that plays on completion
- [[streak-persistence]] — streak increment on focus completion
- [[architecture]] — how timer state fits in the overall data flow

# Streak Persistence

> Entity — daily pomodoro tracking. Source: `main.js` lines 181–203, 51–56 (see [[source-main-js]])

## What It Is

A localStorage-based daily streak counter. Tracks how many focus sessions the user has completed today. Persists across page refreshes. Resets to zero at midnight.

## Data Model

Stored under key `"pomodoro-streak"` in localStorage:

```json
{
  "date": "2026-06-17",
  "count": 5
}
```

- **`date`**: ISO date string (YYYY-MM-DD) of the last recorded streak
- **`count`**: Number of completed focus sessions that day

## Operations

### Save (`saveStreak()`)
Called from `timerComplete()` when a focus session finishes:
1. Get today's date via `new Date().toISOString().split('T')[0]`
2. Read existing data from localStorage (defaults to `{}`)
3. If stored date ≠ today → reset: `count = 1`, update date
4. If stored date = today → `count = STATE.completedPomodoros`
5. Write back to localStorage

### Load (`loadStreak()`)
Called once on page load (initialization):
1. Get today's date
2. Read stored data from localStorage
3. If stored date matches today → restore `STATE.completedPomodoros = data.count`
4. If stored date doesn't match → `STATE.completedPomodoros = 0` (midnight reset)

### Display (`updateStreakDisplay()`)
Renders the streak count as 🍅 emoji:
- Count > 0 → `"🍅".repeat(count)` (e.g., 3 pomodoros = "🍅🍅🍅")
- Count = 0 → "—" (empty state)

Updates the `#streak-display` span in [[source-index-html]].

## Midnight Reset Mechanism

The reset is **lazy** — it happens on next page load, not at exactly midnight. If the user has the page open at midnight, the count won't reset until they refresh. This is a deliberate simplicity tradeoff (see [[design-decisions]]).

The `saveStreak()` function also handles the reset case: if stored date is stale but the user just completed a pomodoro, it sets `count = 1` (since this is the first of the new day).

## Edge Cases

- **First-ever session**: localStorage is empty → `loadStreak()` defaults to 0 → `saveStreak()` creates the key with today's date and count = 1
- **Browser clears localStorage**: Same as first-ever — gracefully degrades to 0
- **Corrupted data**: `JSON.parse()` could throw, but the `|| '{}'` fallback prevents crashes
- **Multiple tabs**: Each tab maintains its own `STATE.completedPomodoros` in memory; last tab to save wins. Simplistic but adequate for single-user use.

## Related Pages
- [[source-main-js]] — full source with `saveStreak()`, `loadStreak()`, `updateStreakDisplay()`
- [[timer-engine]] — `timerComplete()` triggers the save
- [[architecture]] — how streak state flows through the system
- [[design-decisions]] — why localStorage, why lazy midnight reset

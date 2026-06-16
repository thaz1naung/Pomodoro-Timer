# Logic Agent

## Responsibility
Build `main.js` — timer logic, localStorage, Web Audio API.

## Scope
- Countdown timer: 25 min Focus → 5 min Short Break → 15 min Long Break (after 4 pomodoros)
- Start / Pause / Reset controls — wire to UI Agent's buttons via DOM selectors
- Auto-transition between focus and break with user confirmation prompt
- Streak counter: increment on completed Focus sessions, persist in `localStorage`, reset at midnight
- Mood theme switching: toggle CSS custom properties on `:root` to switch accent colors (Focus/Chill/Deep Work)
- Web Audio API: bell/chime sound on timer end, volume control, mute toggle
- Update DOM text content for timer display and streak 🍅 icons

## Boundaries
- ❌ No HTML or CSS changes — read selectors from UI Agent's markup only
- ❌ No deployment config, no README
- ❌ No external libraries — vanilla JS only
- ✅ Must work after UI Agent ships HTML/CSS shell

## GSD Rule
Wire features one at a time. If the DOM selector exists, use it. No abstractions.

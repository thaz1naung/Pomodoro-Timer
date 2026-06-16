# QA Agent

## Responsibility
Test all features manually, check responsive, verify localStorage.

## Scope
- Open `index.html` in browser — verify timer works fully offline
- Test all 3 mood themes switch correctly with smooth CSS transitions
- Test Start / Pause / Reset — timer counts down, buttons respond
- Test auto-transition: Focus → Break confirmation prompt appears
- Verify streak persists on page refresh (localStorage)
- Verify streak resets at midnight
- Test sound plays on timer end (Web Audio API bell)
- Test volume slider and mute toggle
- Check mobile layout at 375px+ (DevTools) — no overflow, buttons ≥ 44px tap targets
- Check no console errors
- Report any issues with exact steps to reproduce

## Boundaries
- ❌ No code changes — report issues, don't fix them
- ❌ No deployment, no vercel.json, no README
- ✅ Test against what UI Agent + Logic Agent shipped

## GSD Rule
Run through the Pre-Deploy Checklist from CLAUDE.md. Report pass/fail per item. No fluff.

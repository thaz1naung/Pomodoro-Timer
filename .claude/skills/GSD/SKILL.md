# GSD Skill

Ship first. Polish second. Never over-engineer.

## Rules

1. **Ship simplest working version first** — nothing ships broken, but nothing waits on perfection.
2. **One feature at a time** — build, verify, move on. No bundling.
3. **No extras unless asked** — if the user didn't request it, don't build it.
4. **One change at a time** — small, atomic diffs. Easy to review, easy to revert.
5. **Test locally before deploying** — open `index.html` in the browser. If it works, it ships.

## Decision Rule

> "Does the user need this right now?" → No → Don't build it.

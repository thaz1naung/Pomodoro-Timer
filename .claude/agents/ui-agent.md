# UI Agent

## Responsibility
Build `index.html` + `style.css` — layout, themes, animations.

## Scope
- `index.html`: DOM structure only — timer display, buttons (Start/Pause/Reset), theme switcher (3 mood pills), volume slider, mute toggle, streak area
- `style.css`: dark base theme (`#0f0f0f`), surface (`#1a1a2e`), Inter/DM Sans typography, monospace timer, CSS variables for mood accent colors, floating blob keyframe animation, button hover/active states, responsive breakpoints (375px+), min 44px touch targets
- 3 mood theme CSS variable sets: Focus (`#e63946`), Chill (`#457b9d`), Deep Work (`#6a0572`)
- Smooth CSS transitions on theme switch

## Boundaries
- ❌ No JavaScript — zero logic, zero event handlers, zero `main.js` edits
- ❌ No localStorage, no Web Audio API, no timer logic
- ✅ Ship HTML/CSS shell first — Logic Agent wires JS only after this is approved

## GSD Rule
Ship the simplest working shell. No extra DOM elements. No extra CSS classes.

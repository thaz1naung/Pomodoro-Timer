# Source: style.css

> Raw source: `style.css` (493 lines)

## Overview

All visual styling for the Pomodoro Timer. Single CSS file with no preprocessor. Uses CSS custom properties for theming, `@keyframes` for animation, and `@media` queries for responsiveness. Loads Google Fonts via `@import`.

## Font Stack

```css
@import url('Google Fonts: Inter (400,500,600) + JetBrains Mono (300,400)')
```

- **Body**: `Inter`, sans-serif — clean, modern UI text
- **Timer**: `JetBrains Mono`, monospace — large, readable countdown digits

## CSS Variable System

### Root (default = Focus theme)
```css
:root {
  --bg: #0f0f0f;           /* near-black background */
  --surface: #1a1a2e;      /* dark card/panel background */
  --text: #e0e0e0;         /* primary text */
  --text-secondary: #888;  /* muted text */
  --accent: #e63946;       /* Focus red-orange */
  --accent-glow: rgba(...);/* per-theme glow color */
  --font-body: 'Inter';
  --font-mono: 'JetBrains Mono';
  --radius: 12px;
  --radius-lg: 20px;
  --transition-speed: 0.3s;
}
```

### Theme Variants
Each mood sets `--accent` and `--accent-glow` via `[data-theme="..."]` selectors:

| Theme | Accent | Glow |
|-------|--------|------|
| `[data-theme="focus"]` | `#e63946` (red-orange) | `rgba(230,57,70,0.15)` |
| `[data-theme="chill"]` | `#457b9d` (soft blue) | `rgba(69,123,157,0.15)` |
| `[data-theme="deep"]` | `#6a0572` (deep purple) | `rgba(106,5,114,0.15)` |

All themed elements reference `var(--accent)` / `var(--accent-glow)`, so switching `data-theme` on `<body>` cascades instantly — no JS class manipulation needed.

## Layout Architecture

- **Body**: flexbox centering, `min-height: 100vh`, `overflow-x: hidden`
- **Main**: single column, `max-width: 420px`, `gap: 28px`, centered content
- **Z-index layers**: main (1), dialog overlay (100), background pseudo-element (0)

## Key Components Styled

### Timer Ring (`.timer-ring`)
- Circular container: `border-radius: 50%`, responsive size via `min(280px, 70vw)`
- Dark surface fill with subtle border
- `box-shadow` using `--accent-glow` for ambient radiance
- Inner `.timer-text` uses clamp for fluid typography: `clamp(2.5rem, 10vw, 4rem)`

### Buttons (`.btn`)
- Rounded (`--radius: 12px`), surface background, subtle border
- Hover: lift effect (`translateY(-1px)`), light background overlay
- Active: returns to baseline
- Primary variant (`.btn-primary`): filled with accent color, glow on hover
- Min 44px touch targets on mobile (see [[responsive-design]])

### Theme Switcher (`.theme-switcher`)
- Pill container: dark surface, large border-radius (`20px`), 4px padding
- Inactive pills: transparent background, secondary text
- Active pill (`.theme-btn.active`): accent fill, white text
- All transitions use `--transition-speed` for smooth theme changes

### Animated Background
- `body::before` pseudo-element with 3 radial-gradient ellipses using `--accent-glow`
- `@keyframes blobFloat`: 12s ease-in-out infinite alternate — subtle scale + translate cycle
- Background transitions smoothly when accent color changes (see [[animated-background]])

### Dialog Overlay (`.dialog-overlay`)
- Fixed fullscreen, semi-transparent dark backdrop with `backdrop-filter: blur(4px)`
- Centered `.dialog` card with surface background, rounded corners, drop shadow
- `.hidden` class sets `display: none`

## Responsive Breakpoints (→ [[responsive-design]])

| Breakpoint | Target | Key Changes |
|------------|--------|-------------|
| `max-width: 768px` | Tablet | Reduced gap/padding |
| `max-width: 480px` | Phone portrait | Smaller ring, wrapped controls, 48px touch targets |
| `max-width: 400px` | iPhone SE | Further compaction, dialog goes vertical |
| `max-height: 500px` (landscape) | Landscape phone | Flex row layout, tiny ring (120px), compact buttons |

### Safe Area Support
```css
@supports (padding: env(safe-area-inset-bottom)) { ... }
```
Adds padding for notched phones (iPhone X+).

### Touch Polish
- `-webkit-tap-highlight-color: transparent` — no blue flash on tap
- `touch-action: manipulation` — no double-tap zoom on buttons

## Related Pages
- [[source-index-html]] — DOM elements these styles target
- [[source-main-js]] — JS that toggles classes/attributes these styles respond to
- [[animated-background]] — detailed breakdown of the blob animation
- [[responsive-design]] — detailed breakdown of responsive strategy
- [[theme-system]] — how CSS variables enable theme switching

# Theme System

> Entity — mood theme switching. Source: `style.css` lines 12–40, 59–86, 191–225; `main.js` lines 204–214 (see [[source-style-css]], [[source-main-js]])

## What It Is

A CSS custom property–based theming system that switches the entire UI's accent color with a single attribute change on `<body>`. Three mood themes: **Focus** (red-orange), **Chill** (soft blue), **Deep Work** (deep purple).

## Architecture

### CSS Layer

Root variables define the default theme (Focus):
```css
:root {
  --accent: #e63946;
  --accent-glow: rgba(230, 57, 70, 0.15);
}
```

Theme variants override only accent-related properties:
```css
[data-theme="chill"] { --accent: #457b9d; --accent-glow: rgba(69, 123, 157, 0.15); }
[data-theme="deep"]  { --accent: #6a0572; --accent-glow: rgba(106, 5, 114, 0.15); }
```

All themed elements use `var(--accent)` / `var(--accent-glow)` — so changing `data-theme` on `<body>` cascades through the entire DOM instantly.

### Affected Elements

| Element | Property Using Accent |
|---------|----------------------|
| `.session-label` | `color` |
| `.btn-primary` | `background`, `border-color` |
| `.btn-primary:hover` | `box-shadow` (glow) |
| `.theme-btn.active` | `background` |
| `.timer-ring` | `box-shadow` (ambient glow) |
| `body::before` | `radial-gradient` ellipses ([[animated-background]]) |
| `.volume-slider::-webkit-slider-thumb` | `background` |
| `.volume-slider::-moz-range-thumb` | `background` |

### JS Layer

```js
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
}
```

Theme buttons in [[source-index-html]] have `data-theme` attributes (`focus`, `chill`, `deep`). Click handler extracts the value and calls `setTheme()`.

## Transitions

All accent-dependent properties have `transition: <property> var(--transition-speed) ease` (0.3s). This means theme switches produce a smooth color crossfade — no JS animation needed.

The background animation (see [[animated-background]]) also transitions its gradient colors, so the ambient glow shifts mood along with the UI chrome.

## Design Rationale

- **CSS variables over JS class toggling**: Single attribute change vs. managing class lists on every themed element. More maintainable — add a new themed element and it automatically follows the current theme.
- **`data-theme` on `<body>`**: Highest possible scope. Any descendant can reference `var(--accent)` without JS involvement.
- **Separation of concerns**: CSS owns the visual values; JS only sets the attribute. See [[design-decisions]].

## Related Pages
- [[source-style-css]] — full CSS with variable definitions and themed selectors
- [[source-main-js]] — `setTheme()` function and event wiring
- [[animated-background]] — how theme changes affect the ambient blob animation
- [[design-decisions]] — why CSS variables were chosen over alternatives

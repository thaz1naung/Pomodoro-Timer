# Responsive Design

> Entity — multi-device layout adaptation. Source: `style.css` lines 337–492 (see [[source-style-css]])

## What It Is

A mobile-first responsive design system using CSS `@media` queries. The timer works on everything from an iPhone SE (375px wide) to a large desktop monitor, including landscape-mode phones and notched devices.

## Strategy

**Mobile-first base styles** → breakpoints progressively enhance for larger screens. Base layout uses:
- `max-width: 420px` container — never stretches too wide
- `min(280px, 70vw)` timer ring — fluid scaling
- `clamp(2.5rem, 10vw, 4rem)` timer text — fluid typography
- Flexbox with wrapping — adapts naturally to width changes

## Breakpoints

### Tablet / Small Desktop (`max-width: 768px`)
- Reduced gap (24px) and padding (32px 20px) — tighter but still breathable
- Minimal change — base layout already works well at this size

### Phone Portrait (`max-width: 480px`)
- Timer ring: `min(240px, 65vw)` — smaller but still prominent
- Controls: `flex-wrap: wrap` — buttons can stack if needed
- Buttons: `min-height: 48px` — meets WCAG touch target recommendation
- Theme pills: `width: 100%`, centered — full-width pill bar
- Volume slider: 80px — compact but usable
- Slider thumb: 24px — larger touch target

### Small Phone / iPhone SE (`max-width: 400px`)
- Timer ring: `min(200px, 60vw)` — compact but readable
- Further reduced padding and gaps (20px, 18px, 12px)
- Button font sizes reduced slightly (0.85rem, 0.72rem for pills)
- Dialog goes vertical: `.dialog-actions { flex-direction: column }` — confirm/skip stack

### Landscape Phone (`max-height: 500px and orientation: landscape`)
- **Critical breakpoint** — prevents the timer from being cut off on short, wide screens
- Main container: `flex-direction: row; flex-wrap: wrap` — horizontal layout
- Timer ring: 120px — tiny but functional
- Timer text: 1.6rem — readable at small size
- Session label: 0.75rem
- All buttons compact: 8px 14px padding, 36px min-height
- Theme switcher, streak, sound sections: `order: 99` — pushed to bottom of visual hierarchy

### Safe Area (`@supports padding: env(safe-area-inset-bottom)`)
- Adds padding for iPhone X+ notch and home indicator
- Uses `env(safe-area-inset-*)` — only applied when supported
- Prevents content from being hidden behind hardware features

## Touch Optimization

Applied globally (not per-breakpoint):
```css
.btn, .theme-btn, .btn-icon {
  -webkit-tap-highlight-color: transparent;  /* no blue flash on iOS */
  touch-action: manipulation;                 /* no double-tap zoom delay */
}
```

## What's NOT Responsive

- **Font loading**: Google Fonts load via CDN `@import` — if the CDN is blocked, falls back to system fonts (defined in font stack: `'Inter', sans-serif` and `'JetBrains Mono', monospace`)
- **No print stylesheet** — the app is interactive-only
- **No dark/light mode toggle** — always dark theme (see [[design-decisions]])

## Related Pages
- [[source-style-css]] — full responsive CSS
- [[design-decisions]] — why mobile-first, why CSS-only responsive
- [[source-index-html]] — viewport meta tag that enables responsive behavior

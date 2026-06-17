# Animated Background

> Entity — ambient CSS animation. Source: `style.css` lines 59–86 (see [[source-style-css]])

## What It Is

A subtle, non-distracting animated background created entirely with CSS. Three radial-gradient ellipses using the current theme's accent glow color drift slowly via a CSS `@keyframes` animation. No JavaScript, no canvas, no external assets.

## Implementation

### The Pseudo-Element

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, var(--accent-glow) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, var(--accent-glow) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, var(--accent-glow) 0%, transparent 45%);
  animation: blobFloat 12s ease-in-out infinite alternate;
  z-index: 0;
  transition: background var(--transition-speed) ease;
}
```

Three ellipses positioned at different screen coordinates:
- **Blob 1**: 20% left, 50% top — largest
- **Blob 2**: 80% left, 20% top — medium
- **Blob 3**: 50% left, 80% top — medium-large

Each ellipse fades from `var(--accent-glow)` at center to `transparent` at the edge, creating soft, ambient pools of light.

### The Animation

```css
@keyframes blobFloat {
  0%   { transform: scale(1)    translate(0, 0);    }
  33%  { transform: scale(1.15) translate(2%, -1%);  }
  66%  { transform: scale(0.95) translate(-1%, 1%);  }
  100% { transform: scale(1.1)  translate(1%, 2%);   }
}
```

- **Duration**: 12 seconds
- **Easing**: `ease-in-out` — smooth acceleration/deceleration
- **Direction**: `alternate` — plays forward then backward, creating a seamless loop
- **Effect**: Subtle breathing/pulsing motion — blobs gently expand, contract, and drift

### Theme Integration

The `transition: background var(--transition-speed) ease` on `body::before` means when [[theme-system]] changes `--accent-glow`, the blob colors crossfade smoothly over 0.3 seconds. The animation itself continues uninterrupted — only the colors shift.

## Design Rationale

- **Ambient, not distracting**: The animation is slow (12s cycle), subtle (low opacity gradients), and hidden behind all content (z-index: 0). It adds visual interest without competing with the timer.
- **CSS-only**: No JS animation libraries, no `requestAnimationFrame`, no canvas. GPU-composited `transform` and `opacity`-equivalent properties — performant even on low-end devices.
- **Per-theme personality**: Each mood gets its own color signature in the background, reinforcing the theme without additional code (see [[theme-system]]).

## Related Pages
- [[source-style-css]] — full CSS with keyframes and pseudo-element
- [[theme-system]] — how `--accent-glow` changes per mood
- [[design-decisions]] — rationale for CSS-only animations

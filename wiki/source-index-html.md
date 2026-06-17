# Source: index.html

> Raw source: `index.html` (58 lines)

## Overview

Single-page HTML shell providing the DOM structure for the Pomodoro Timer. Contains no inline styles and no inline scripts — all styling is in [[source-style-css]] and all logic is in [[source-main-js]].

## Document Structure

### `<head>`
- **Charset**: UTF-8
- **Viewport**: `width=device-width, initial-scale=1.0` (mobile-first, see [[responsive-design]])
- **Title**: `Pomodoro Timer`
- **Stylesheet**: Links `style.css` (see [[source-style-css]])
- **No favicon, no JS libraries** — per [[design-decisions]]

### `<body>` → `<main>`
Single centered column layout container. All sections are direct children:

| Section | CSS Class | Content | Wired By |
|---------|-----------|---------|----------|
| Timer Display | `.timer-section` | `.timer-ring` > `.timer-text` (25:00) + `.session-label` (Focus) | [[timer-engine]] |
| Controls | `.controls` | 3 buttons: `#btn-start`, `#btn-pause`, `#btn-reset` | [[timer-engine]] |
| Theme Switcher | `.theme-switcher` | 3 pills: `🎯 Focus`, `😌 Chill`, `🌙 Deep Work` with `data-theme` attrs | [[theme-system]] |
| Streak | `.streak-section` | `.streak-label` + `#streak-display` (—) | [[streak-persistence]] |
| Sound | `.sound-section` | `#btn-mute` (🔊) + `#volume-slider` (range 0–100, default 50) | [[sound-engine]] |

### Transition Dialog
- `.dialog-overlay.hidden#transition-dialog` — hidden by default
- Contains `.dialog` with `.dialog-message` and two buttons: `#btn-confirm`, `#btn-skip`
- Shown/hidden by [[transition-dialog]] logic

### Script
- `<script src="main.js">` — single script tag at end of body, no `defer`/`async` needed

## Key Design Choices

- **IDs for JS targets** (`#btn-start`, `#streak-display`, etc.) — enables direct `getElementById` lookups in [[source-main-js]]
- **`data-theme` attributes** on theme buttons — used by [[theme-system]] for event delegation
- **`.hidden` class** on dialog — CSS `display: none` toggled by JS (see [[transition-dialog]])
- **No `<form>` elements** — all interactions are button clicks, no form submission needed

## Related Pages
- [[source-main-js]] — all JS that operates on these DOM elements
- [[source-style-css]] — all styles that make this structure visual
- [[architecture]] — how HTML, CSS, and JS layers connect

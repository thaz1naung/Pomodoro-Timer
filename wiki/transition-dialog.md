# Transition Dialog

> Entity — session transition confirmation. Source: `index.html` lines 46–54; `main.js` lines 113–148 (see [[source-index-html]], [[source-main-js]])

## What It Is

A modal confirmation dialog that appears when the timer reaches zero, asking the user whether to start the next session (break or focus). Prevents the timer from auto-cycling without user acknowledgment.

## DOM Structure

```html
<div class="dialog-overlay hidden" id="transition-dialog">
  <div class="dialog">
    <p class="dialog-message">...</p>
    <div class="dialog-actions">
      <button class="btn btn-primary" id="btn-confirm">Start Break</button>
      <button class="btn" id="btn-skip">Skip</button>
    </div>
  </div>
</div>
```

- **Overlay**: Fixed fullscreen, semi-transparent backdrop with blur (see [[source-style-css#Dialog Overlay]])
- **Hidden by default**: `.hidden` class sets `display: none`
- **Two actions**: Confirm (auto-starts next session) and Skip (sets timer without starting)

## Flow

```
timerComplete()
  → playChime()                         (see [[sound-engine]])
  → if focus: increment streak          (see [[streak-persistence]])
  → showTransitionDialog(nextMode)
      → sets pendingTransition
      → updates .dialog-message text
      → removes .hidden class
```

### Dialog Messages

| Next Mode | Message |
|-----------|---------|
| `shortBreak` | "Pomodoro done! Take a short break?" |
| `longBreak` | "4 pomodoros done! Take a long break?" |
| `focus` | "Break's over! Start focusing?" |

### User Actions

**Confirm** (`confirmTransition()`):
1. Call `setMode(pendingTransition)` → resets timer to the new mode's duration
2. Hide dialog
3. Call `start()` → auto-starts countdown

**Skip** (`skipTransition()`):
1. Call `setMode(pendingTransition)` → resets timer
2. Override `STATE.timeLeft` to full duration (redundant but safe — `setMode` already calls `reset()`)
3. Hide dialog
4. Does NOT auto-start — user must press Start manually

## State Management

`let pendingTransition = null` (module-level, not in STATE) tracks what mode to switch to. Set by `showTransitionDialog()`, cleared by `hideTransitionDialog()`. Both confirm and skip check for non-null before proceeding.

## Design Notes

- **Why a dialog and not auto-transition?** The requirement in [[source-CLAUDE-md]] says "auto-transition with user confirmation prompt." The dialog ensures the user is present and ready before the next session begins.
- **Why separate confirm/skip?** Confirm = "I'm ready, start now." Skip = "I need a moment, but acknowledge the transition." Skip sets the timer but leaves it paused.
- **Accessibility**: No keyboard trap, no focus management, no `role="dialog"` — basic but functional. Buttons are standard `<button>` elements, usable with keyboard and screen readers.

## Related Pages
- [[source-index-html]] — dialog DOM structure
- [[source-main-js]] — dialog logic functions
- [[timer-engine]] — `timerComplete()` triggers the dialog flow
- [[source-style-css]] — overlay and card styling

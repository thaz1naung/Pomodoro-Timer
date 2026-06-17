# Sound Engine

> Entity — timer completion chime. Source: `main.js` lines 151–179 (see [[source-main-js]])

## What It Is

A Web Audio API–based chime that plays when the timer reaches zero. Generates a C major chord (C5-E5-G5) using three sine-wave oscillators — zero external audio files.

## Architecture

### AudioContext (Lazy Initialization)

```js
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}
```

- **Lazy**: Created on first use, not on page load. This respects browser autoplay policies — most browsers require user interaction before creating an AudioContext.
- **Cached**: Reuses the same context for all subsequent chimes.
- **Fallback**: `window.AudioContext || window.webkitAudioContext` for Safari compatibility.

### Chime Generation (`playChime()`)

Three sine-wave oscillators, staggered by 150ms:

| Note | Frequency | Start Time | Duration |
|------|-----------|------------|----------|
| C5 | 523.25 Hz | `now + 0.00s` | 0.6s |
| E5 | 659.25 Hz | `now + 0.15s` | 0.6s |
| G5 | 783.99 Hz | `now + 0.30s` | 0.6s |

Each oscillator:
1. Creates an `OscillatorNode` (sine wave) and `GainNode`
2. Sets gain to `STATE.volume * 0.3` (30% of user volume for comfort)
3. Applies `exponentialRampToValueAtTime(0.001, endTime)` for a smooth decay (avoids click/pop)
4. Connects: oscillator → gain → AudioContext.destination

### Volume & Mute

- **Volume**: `STATE.volume` (0–1), set by the range slider (`#volume-slider`, 0–100 → divided by 100)
- **Mute**: `STATE.muted` (boolean), toggled by the mute button (`#btn-mute`)
- `playChime()` checks `STATE.muted` first — returns immediately if muted
- Mute button text switches between 🔊 and 🔇 via `updateMuteButton()`

### Browser Compatibility

- Uses standard Web Audio API — supported in all modern browsers
- `webkitAudioContext` fallback for older Safari
- No `Audio` element, no `<audio>` tag, no MP3/WAV files — pure synthesis

## Why Web Audio API

Per [[design-decisions]], the project has a hard rule: **no external audio files**. Web Audio API was chosen because:
- ✅ Zero dependencies — built into the browser
- ✅ No network requests — works fully offline
- ✅ Programmatic control — precise timing, volume, and tone shaping
- ✅ No file format concerns — synthesized in real-time

## Limitations

- **No sound customization**: Fixed C-E-G chord, fixed timing. User can only control volume and mute.
- **No ticking sound**: Only plays on timer completion, not during countdown. This is by design (focus-oriented, minimal distraction).
- **AudioContext suspension**: On some mobile browsers, the AudioContext may be in a `suspended` state until user gesture. The first chime may be silent if the user hasn't interacted — resolved on the next interaction.

## Related Pages
- [[source-main-js]] — full source for `getAudioContext()`, `playChime()`, mute/volume handlers
- [[timer-engine]] — `timerComplete()` triggers the chime
- [[design-decisions]] — rationale for Web Audio API over audio files

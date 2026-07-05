const STATE = {
  mode: 'focus',        // 'focus' | 'shortBreak' | 'longBreak'
  timeLeft: 25 * 60,    // seconds
  totalTime: 25 * 60,   // seconds
  isRunning: false,
  intervalId: null,
  completedPomodoros: 0,
  muted: false,
  volume: 0.5,
};

const DURATIONS = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const LABELS = {
  focus: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

/* === DOM refs === */
const timerText = document.querySelector('.timer-text');
const sessionLabel = document.querySelector('.session-label');
const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnReset = document.getElementById('btn-reset');
const btnMute = document.getElementById('btn-mute');
const volumeSlider = document.getElementById('volume-slider');
const streakDisplay = document.getElementById('streak-display');
const transitionDialog = document.getElementById('transition-dialog');
const btnConfirm = document.getElementById('btn-confirm');
const btnSkip = document.getElementById('btn-skip');
const taskInput = document.getElementById('task-input');
const taskLabel = document.getElementById('task-label');
const durationFocus = document.getElementById('duration-focus');
const durationShort = document.getElementById('duration-short');
const durationLong = document.getElementById('duration-long');
const bgSoundBtns = document.querySelectorAll('.bg-sound-btn');

/* === Format === */
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* === Display === */
function updateDisplay() {
  timerText.textContent = formatTime(STATE.timeLeft);
  sessionLabel.textContent = LABELS[STATE.mode];
  document.title = `${formatTime(STATE.timeLeft)} — ${LABELS[STATE.mode]}`;
  updateStreakDisplay();
}

function updateStreakDisplay() {
  streakDisplay.textContent = STATE.completedPomodoros > 0
    ? '🍅'.repeat(STATE.completedPomodoros)
    : '—';
}

function updateMuteButton() {
  btnMute.textContent = STATE.muted ? '🔇' : '🔊';
}

/* === Task Label === */
function showTaskLabel() {
  const text = taskInput.value.trim();
  taskLabel.textContent = text || '';
  taskInput.classList.add('hidden');
  taskLabel.classList.toggle('hidden', !text);
}

function clearTaskLabel() {
  taskInput.value = '';
  taskInput.classList.remove('hidden');
  taskLabel.classList.add('hidden');
  taskLabel.textContent = '';
}

/* === Notifications === */
let notifPermission = 'default';

function requestNotifPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(p => { notifPermission = p; });
  } else {
    notifPermission = Notification.permission;
  }
}

function notify(title, body) {
  if (notifPermission !== 'granted' || document.hasFocus()) return;
  new Notification(title, { body, icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍅</text></svg>' });
}

/* === Timer core === */
function tick() {
  if (STATE.timeLeft <= 0) return;
  STATE.timeLeft--;
  updateDisplay();
  if (STATE.timeLeft <= 0) {
    timerComplete();
  }
}

let firstStart = true;

function start() {
  if (STATE.isRunning) return;
  if (firstStart) {
    firstStart = false;
    requestNotifPermission();
  }
  STATE.isRunning = true;
  showTaskLabel();
  STATE.intervalId = setInterval(tick, 1000);
}

function pause() {
  STATE.isRunning = false;
  clearInterval(STATE.intervalId);
  STATE.intervalId = null;
}

function applyDurations() {
  DURATIONS.focus = parseInt(durationFocus.value) * 60;
  DURATIONS.shortBreak = parseInt(durationShort.value) * 60;
  DURATIONS.longBreak = parseInt(durationLong.value) * 60;
}

function reset() {
  pause();
  applyDurations();
  STATE.timeLeft = DURATIONS[STATE.mode];
  STATE.totalTime = STATE.timeLeft;
  clearTaskLabel();
  updateDisplay();
}

function setMode(mode) {
  STATE.mode = mode;
  reset();
}

/* === Timer complete === */
function timerComplete() {
  pause();
  playChime();
  notify('Timer complete', LABELS[STATE.mode] + ' session finished');

  if (STATE.mode === 'focus') {
    STATE.completedPomodoros++;
    saveStreak();
    updateDisplay();

    const isLongBreak = STATE.completedPomodoros > 0 && STATE.completedPomodoros % 4 === 0;
    showTransitionDialog(isLongBreak ? 'longBreak' : 'shortBreak');
  } else {
    showTransitionDialog('focus');
  }
}

/* === Dialog === */
let pendingTransition = null;

function showTransitionDialog(mode) {
  pendingTransition = mode;
  const messages = {
    focus: "Break's over! Start focusing?",
    shortBreak: 'Pomodoro done! Take a short break?',
    longBreak: '4 pomodoros done! Take a long break?',
  };
  transitionDialog.querySelector('.dialog-message').textContent = messages[mode];
  transitionDialog.classList.remove('hidden');
}

function hideTransitionDialog() {
  transitionDialog.classList.add('hidden');
  pendingTransition = null;
}

function confirmTransition() {
  if (pendingTransition) {
    setMode(pendingTransition);
    hideTransitionDialog();
    start();
  }
}

function skipTransition() {
  if (pendingTransition) {
    setMode(pendingTransition);
    STATE.timeLeft = DURATIONS[pendingTransition];
    STATE.totalTime = STATE.timeLeft;
    hideTransitionDialog();
    updateDisplay();
  }
}

/* === Sound (Web Audio API) === */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playChime() {
  if (STATE.muted) return;
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const vol = STATE.volume;

  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol * 0.3, now + i * 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + i * 0.15);
    osc.stop(now + i * 0.15 + 0.6);
  });
}

/* === Background Sound === */
let bgSound = null; // { type, source, gain }

function createNoiseBuffer(ctx) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function createBrownNoise(ctx) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }
  return buffer;
}

function startBgSound(type) {
  stopBgSound();
  const ctx = getAudioContext();
  const gain = ctx.createGain();
  gain.gain.value = STATE.volume * 0.35;
  gain.connect(ctx.destination);

  if (type === 'rain') {
    const buf = createBrownNoise(ctx);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    src.connect(filter);
    filter.connect(gain);
    src.start();
    bgSound = { type, source: src, gain, filter };
  } else if (type === 'white') {
    const buf = createNoiseBuffer(ctx);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.connect(gain);
    src.start();
    bgSound = { type, source: src, gain };
  } else if (type === 'lofi') {
    const buf = createNoiseBuffer(ctx);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.15;
    lfoGain.gain.value = 100;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    src.connect(filter);
    filter.connect(gain);
    src.start();
    bgSound = { type, source: src, gain, filter, lfo, lfoGain };
  }
}

function stopBgSound() {
  if (!bgSound) return;
  try {
    bgSound.source.stop();
    if (bgSound.lfo) bgSound.lfo.stop();
  } catch (e) { /* already stopped */ }
  bgSound = null;
}

function toggleBgSound(type) {
  if (bgSound && bgSound.type === type) {
    stopBgSound();
    bgSoundBtns.forEach(b => b.classList.toggle('active', false));
  } else {
    startBgSound(type);
    bgSoundBtns.forEach(b => b.classList.toggle('active', b.dataset.sound === type));
  }
}

function updateBgSoundVolume() {
  if (bgSound) {
    bgSound.gain.gain.value = STATE.volume * 0.35;
  }
}

bgSoundBtns.forEach(btn => {
  btn.addEventListener('click', () => toggleBgSound(btn.dataset.sound));
});

/* === Streak persistence === */
function saveStreak() {
  const today = new Date().toISOString().split('T')[0];
  const data = JSON.parse(localStorage.getItem('pomodoro-streak') || '{}');
  if (data.date !== today) {
    data.date = today;
    data.count = 1;
  } else {
    data.count = STATE.completedPomodoros;
  }
  localStorage.setItem('pomodoro-streak', JSON.stringify(data));
}

function loadStreak() {
  const today = new Date().toISOString().split('T')[0];
  const data = JSON.parse(localStorage.getItem('pomodoro-streak') || '{}');
  if (data.date === today) {
    STATE.completedPomodoros = data.count;
  } else {
    STATE.completedPomodoros = 0;
  }
}

/* === Theme switching === */
const themeBtns = document.querySelectorAll('.theme-btn');

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
}

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

/* === Event listeners === */
btnStart.addEventListener('click', start);
btnPause.addEventListener('click', pause);
btnReset.addEventListener('click', reset);

btnConfirm.addEventListener('click', confirmTransition);
btnSkip.addEventListener('click', skipTransition);

btnMute.addEventListener('click', () => {
  STATE.muted = !STATE.muted;
  updateMuteButton();
});

volumeSlider.addEventListener('input', (e) => {
  STATE.volume = e.target.value / 100;
  updateBgSoundVolume();
});

/* === Init === */
document.body.setAttribute('data-theme', 'focus');
loadStreak();
updateDisplay();
updateMuteButton();

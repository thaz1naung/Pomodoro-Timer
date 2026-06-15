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

/* === Timer core === */
function tick() {
  if (STATE.timeLeft <= 0) return;
  STATE.timeLeft--;
  updateDisplay();
  if (STATE.timeLeft <= 0) {
    timerComplete();
  }
}

function start() {
  if (STATE.isRunning) return;
  STATE.isRunning = true;
  STATE.intervalId = setInterval(tick, 1000);
}

function pause() {
  STATE.isRunning = false;
  clearInterval(STATE.intervalId);
  STATE.intervalId = null;
}

function reset() {
  pause();
  STATE.timeLeft = DURATIONS[STATE.mode];
  STATE.totalTime = STATE.timeLeft;
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
});

/* === Init === */
document.body.setAttribute('data-theme', 'focus');
loadStreak();
updateDisplay();
updateMuteButton();

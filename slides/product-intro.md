<!--
  Marp template — "product-demo"
  Render:  marp slides/product-intro.md -o slides/product-intro.html
  Product pitch for Pomodoro Timer with Vibes
-->
---
marp: true
paginate: true
size: 16:9
---

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@500&display=swap');
:root { --bg:#f8fafc; --ink:#0f172a; --muted:#64748b; --accent:#0d9488; --line:#e2e8f0; --code:#0f172a; }
section {
  background:var(--bg); color:var(--ink);
  font-family:'Inter','Noto Sans','Pyidaungsu',sans-serif;
  font-size:26px; line-height:1.5; padding:48px 64px;
}
h1 { color:var(--ink); font-weight:800; font-size:1.6em; }
h2 { color:var(--accent); font-weight:600; }
h3 { color:var(--muted); font-weight:600; }
strong { color:var(--accent); }
a { color:var(--accent); text-decoration:none; }
img { border-radius:12px; box-shadow:0 12px 30px rgba(15,23,42,.18); }
code { background:#e6fffb; color:#0f766e; padding:.06em .35em; border-radius:5px; font-family:'JetBrains Mono',monospace; }
pre  { background:var(--code); border-radius:10px; }
pre code { background:none; color:#e2e8f0; }
blockquote { border-left:4px solid var(--accent); background:#ecfeff; color:#155e75; padding:.5em 1em; }
header,footer,section::after { color:var(--muted); font-size:.5em; }
section.cover {
  background:radial-gradient(800px 360px at 82% 14%, rgba(13,148,136,.18), transparent 60%), var(--bg);
}
section.cover h1 { font-size:2.3em; }
section.cover h2 { color:var(--muted); font-weight:400; }
section.shot { background:#0f172a; color:#e2e8f0; padding:0; display:flex; align-items:center; justify-content:center; }
section.shot img { box-shadow:0 20px 50px rgba(0,0,0,.5); border-radius:8px; max-width:88%; max-height:82%; }
</style>

<!-- _class: cover -->

# Pomodoro Timer with Vibes

## Focus mode, zero friction — no accounts, no setup, no distractions

---

# The Problem

- Most timer apps require **sign-up, subscriptions, or heavy installs**
- You just want to **start focusing NOW**
- Existing tools feel clinical — no personality, no motivation

---

# What You Get

- **3 mood themes** — Focus, Chill, Deep Work — pick your vibe
- **Streak tracking** — see your consistency at a glance
- **Zero dependencies** — loads instantly, works offline
- **No accounts** — open and go

---

<!-- _class: shot -->

![Focus theme](../screenshots/01-focus-theme.png)

---

<!-- _class: shot -->

![Chill theme](../screenshots/02-chill-theme.png)

---

<!-- _class: shot -->

![Deep Work theme](../screenshots/03-deepwork-theme.png)

---

# How It's Built

```
vanilla HTML / CSS / JS — no frameworks, no build step
```

- **Zero dependencies** — single HTML file loads in <1s
- **Deployed on Vercel** — global edge, instant deploys
- **MIT licensed** — fork it, remix it, ship it

---

# Try It

- **Live:** [pomodoro-vibes.vercel.app](https://pomodoro-vibes.vercel.app/)
- **Repo:** github.com/thaz1naung/Pomodoro-Timer · **License:** MIT

> Open → Pick a theme → Start working. That's it.

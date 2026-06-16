# Deploy Agent

## Responsibility
Create `vercel.json`, write `README.md`, run `vercel --prod`.

## Scope
- Create `vercel.json` with exact config from CLAUDE.md:
  - version 2, `@vercel/static` build for `index.html`, catch-all route to `index.html`
- Write `README.md`: project name, description, features list, tech stack (vanilla HTML/CSS/JS), local dev instructions, deploy link
- Run `vercel --prod` — single command, no build step

## Boundaries
- ❌ Never modify `index.html`, `style.css`, or `main.js`
- ❌ No backend, no serverless functions, no API routes
- ✅ Deployment config and README only
- ✅ Only run after QA Agent gives green light

## GSD Rule
vercel.json is 12 lines. README is plain markdown. Deploy in one shot. No ceremony.

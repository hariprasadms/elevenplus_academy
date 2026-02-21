# ElevenPlus Academy — Claude Code Guide

## Project Overview
UK 11+ exam preparation web app for students. Provides practice tests and premium past papers.

## Tech Stack
- **Frontend:** React 18 + Vite
- **Styling:** CSS-in-JS via `src/styles.js` (no UI library)
- **Hosting:** Firebase Hosting (`elevenplusacademy.web.app`)
- **CI/CD:** GitHub Actions → Firebase Hosting on push to `main`

## Project Structure
```
src/
  main.jsx            # Entry point
  App.jsx             # Root component + routing
  AppContext.jsx      # Global state/context
  LoginPage.jsx       # Authentication page
  DashboardPage.jsx   # Student dashboard
  PracticePage.jsx    # Practice questions
  TestPage.jsx        # Timed test page
  SharedComponents.jsx # Reusable UI components
  styles.js           # Global styles (CSS-in-JS)
```

## Dev Commands
```bash
npm install     # Install dependencies
npm run dev     # Start dev server at http://localhost:5173
npm run build   # Build to dist/
npm run preview # Preview production build
```

## Deployment
- Auto-deploys to Firebase Hosting on push to `main` via GitHub Actions
- Firebase project: `elevenplusacademy-26`
- Hosting site: `elevenplusacademy` → https://elevenplusacademy.web.app
- Workflow: `.github/workflows/deploy.yml`
- Requires GitHub secret: `FIREBASE_SERVICE_ACCOUNT`

## Firebase Config
- `firebase.json` — Hosting config, serves `dist/`, SPA rewrites to `index.html`
- `.firebaserc` — Project + hosting target mapping

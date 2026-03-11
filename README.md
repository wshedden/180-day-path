# 180-day-path

A calm, neon-inspired personal web app for tracking a 180-day journey starting **Monday, 9 March 2026**. The app gives you a weekly visual path where days automatically fill as time passes, and each day can store a short journal note plus mood.

## Purpose

This project is meant to support someone moving through a difficult six-month period by making daily progress visible and reflective.

## Tech stack

- Node.js
- npm
- Vite
- Vanilla JavaScript (ES modules)
- HTML + CSS
- LocalStorage (offline-first)

## Install and run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite (typically `http://localhost:5173`).

## How the 180-day system works

- The journey starts at **2026-03-09** (`START_DATE`).
- The grid renders **180 inclusive days**.
- Layout is fixed to **7 columns** (`Mon`–`Sun`) and about **26 weeks** of rows.
- Day state is computed from your system clock:
  - **Past** days auto-fill with neon styling.
  - **Today** gets a bright glow outline.
  - **Future** days appear dimmer.
- Mondays receive a subtle pulse animation.
- Every 30th day (30, 60, 90, ...) is highlighted as a milestone.

## Journal and mood flow

1. Click any day square.
2. A modal opens with the selected date.
3. Add a short note.
4. Pick a mood:
   - `green` = good
   - `yellow` = neutral
   - `red` = difficult
5. Save to update the grid instantly.

## Data storage design

The app stores all user entries in browser `localStorage` under one structured JSON object:

```json
{
  "entries": {
    "2026-03-09": {
      "mood": "green",
      "note": "example text"
    }
  }
}
```

Storage behavior:

- Loads on startup.
- Saves immediately after each edit (auto-save by action).
- Never requires a backend.

## Backup export/import

Two top-right controls provide manual data safety:

- **Export backup**
  - Downloads current entry data as a JSON file.
- **Import backup**
  - Accepts a previously exported JSON file and restores entries.

An example backup file is provided at:

- `data/example-backup.json`

## Project structure

```txt
180-day-path/
  README.md
  package.json
  vite.config.js
  index.html
  /src
    main.js
    grid.js
    storage.js
    journal.js
    mood.js
    utils.js
    styles.css
  /data
    example-backup.json
  /assets
    fonts/
    icons/
```

## Future improvements

- Add optional encrypted backup files.
- Add lightweight weekly summary cards.
- Add streak statistics and gentle reminder settings.
- Offer alternative color themes while preserving calm neon defaults.
- Package as a PWA for installable mobile/desktop experience.

# 180-day-path

A calm, neon-styled personal web app for tracking a 180-day life journey, starting on **Monday, 9 March 2026**.

## Purpose

This app gives you a visual map of a six-month period where each day is a square in a weekly grid. Past days automatically fill, today is highlighted, and future days remain dim. You can click any day to record a short note and mood.

## Tech stack

- Node.js
- npm
- Vite
- Vanilla JavaScript (ES modules)
- HTML + CSS
- LocalStorage for offline persistence

## Installation

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal.

## How the 180-day system works

- Start date is fixed at **2026-03-09**.
- Total journey length is **180 days** (inclusive).
- The grid uses **7 columns** (Mon–Sun) and renders ~26 weeks.
- Every day square includes:
  - day of month
  - day index (1–180)
  - automatic state (future, today, past)
  - optional mood marker when journaled
- Weekly polish:
  - Monday cells have a subtle pulse animation.
  - Every 30th day receives a milestone highlight.

## Data storage design

All journaling data is stored locally in `localStorage` under one key (`journey-180-data`) using this shape:

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

### Storage behavior

- Entries are saved immediately after pressing **Save** in the modal.
- No backend/server is required.
- App works fully offline after initial load.

## Backup export/import

Use the top-right buttons:

- **Export backup**: downloads your complete entries as a JSON file.
- **Import backup**: upload a previously exported JSON backup to restore entries.

An example backup file is available at `data/example-backup.json`.

## Project structure

```text
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

- Add optional streak tracking and stats view.
- Add tag-based journaling filters.
- Add optional encryption for backup files.
- Add installable PWA support for improved offline UX.

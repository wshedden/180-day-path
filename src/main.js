import './styles.css';
import { renderGrid } from './grid.js';
import {
  loadData,
  setEntry,
  getEntry,
  exportData,
  importData,
  saveData
} from './storage.js';
import { createJournalController } from './journal.js';

let appData = loadData();

function refreshGrid() {
  renderGrid({
    entries: appData.entries,
    onDayClick: (date) => journal.open(date)
  });
}

const journal = createJournalController({
  getEntry: (date) => getEntry(date, appData),
  onSave: (date, entry) => {
    appData = setEntry(date, entry, appData);
    refreshGrid();
  }
});

function downloadBackup() {
  const blob = new Blob([exportData(appData)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  anchor.href = url;
  anchor.download = `180-day-path-backup-${stamp}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function handleImport(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      appData = importData(String(reader.result));
      refreshGrid();
      event.target.value = '';
    } catch {
      alert('Could not import backup. Please use a valid JSON backup file.');
    }
  };
  reader.readAsText(file);
}

function ensureShape() {
  if (!appData.entries || typeof appData.entries !== 'object') {
    appData = { entries: {} };
    saveData(appData);
  }
}

document.getElementById('export-btn').addEventListener('click', downloadBackup);
document.getElementById('import-input').addEventListener('change', handleImport);

ensureShape();
refreshGrid();

import './styles.css';
import { buildGrid } from './grid.js';
import { createJournalController } from './journal.js';
import { loadData, setEntry, exportData, importData } from './storage.js';

const gridEl = document.getElementById('grid');
const exportBtn = document.getElementById('export-btn');
const importInput = document.getElementById('import-input');

let appData = loadData();

function refreshGrid() {
  buildGrid({
    container: gridEl,
    data: appData,
    onOpenDay: (day) => journal.open(day)
  });
}

const journal = createJournalController({
  getEntry: (date) => appData.entries[date] || null,
  onSave: (date, entry) => {
    appData = setEntry(date, entry, appData);
    refreshGrid();
  }
});

exportBtn.addEventListener('click', () => {
  const blob = new Blob([exportData(appData)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `180-day-path-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

importInput.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    appData = importData(text);
    refreshGrid();
  } catch {
    alert('Invalid backup file. Please select a valid JSON export.');
  } finally {
    importInput.value = '';
  }
});

refreshGrid();

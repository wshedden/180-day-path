const STORAGE_KEY = 'path180-data';

const emptyState = () => ({ entries: {} });

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || typeof parsed.entries !== 'object') {
      return emptyState();
    }
    return parsed;
  } catch {
    return emptyState();
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getEntry(date, data = loadData()) {
  return data.entries[date] || null;
}

export function setEntry(date, entry, data = loadData()) {
  data.entries[date] = {
    mood: entry.mood || '',
    note: entry.note || ''
  };
  saveData(data);
  return data;
}

export function exportData(data = loadData()) {
  return JSON.stringify(data, null, 2);
}

export function importData(raw) {
  const parsed = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object' || typeof parsed.entries !== 'object') {
    throw new Error('Invalid backup format');
  }
  saveData(parsed);
  return parsed;
}

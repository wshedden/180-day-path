const STORAGE_KEY = 'journey-180-data';

function validateShape(input) {
  if (!input || typeof input !== 'object') return { entries: {} };
  const entries = input.entries && typeof input.entries === 'object' ? input.entries : {};
  return { entries };
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { entries: {} };
    return validateShape(JSON.parse(raw));
  } catch {
    return { entries: {} };
  }
}

export function saveData(data) {
  const normalized = validateShape(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

export function getEntry(date, data = loadData()) {
  return data.entries[date] || null;
}

export function setEntry(date, entry, data = loadData()) {
  const next = {
    entries: {
      ...data.entries,
      [date]: {
        mood: entry?.mood || null,
        note: entry?.note || ''
      }
    }
  };
  saveData(next);
  return next;
}

export function exportData(data = loadData()) {
  return JSON.stringify(validateShape(data), null, 2);
}

export function importData(jsonText) {
  const parsed = JSON.parse(jsonText);
  const validated = validateShape(parsed);
  saveData(validated);
  return validated;
}

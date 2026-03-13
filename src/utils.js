export const START_DATE = '2026-03-09';
export const TOTAL_DAYS = 180;

const DAY_MS = 24 * 60 * 60 * 1000;

export function parseDateISO(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function normalizeDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return normalizeDate(copy);
}

export function daysBetween(start, end) {
  const a = normalizeDate(start).getTime();
  const b = normalizeDate(end).getTime();
  return Math.floor((b - a) / DAY_MS);
}

export function getJourneyDays() {
  const start = parseDateISO(START_DATE);
  return Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const date = addDays(start, i);
    return {
      date,
      iso: formatISO(date),
      dayNumber: i + 1,
      weekNumber: Math.floor(i / 7) + 1,
      isMonday: date.getDay() === 1,
      isMilestone30: (i + 1) % 30 === 0
    };
  });
}

export function getDayState(targetDate, today = new Date()) {
  const diff = daysBetween(targetDate, today);
  if (diff < 0) return 'future';
  if (diff === 0) return 'today';
  return 'past';
}

export function formatLongDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export const START_DATE = '2026-03-09';
export const TOTAL_DAYS = 180;

export const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function parseDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(date, offset) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + offset);
  return copy;
}

export function diffInDays(later, earlier) {
  const start = new Date(earlier.getFullYear(), earlier.getMonth(), earlier.getDate());
  const end = new Date(later.getFullYear(), later.getMonth(), later.getDate());
  return Math.floor((end - start) / 86400000);
}

export function getDayMeta(today = new Date()) {
  const start = parseDate(START_DATE);

  return Array.from({ length: TOTAL_DAYS }, (_, index) => {
    const date = addDays(start, index);
    const iso = toISODate(date);
    const dayDiff = diffInDays(today, date);
    const isToday = dayDiff === 0;
    const isPast = dayDiff > 0;
    const isFuture = dayDiff < 0;
    const weekIndex = Math.floor(index / 7);
    const weekdayIndex = index % 7;
    const dayNumber = index + 1;

    return {
      index,
      date,
      iso,
      dayNumber,
      weekIndex,
      weekdayIndex,
      isToday,
      isPast,
      isFuture,
      isMonday: weekdayIndex === 0,
      is30DayMilestone: dayNumber % 30 === 0
    };
  });
}

export function formatFriendlyDate(iso) {
  const date = parseDate(iso);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getMilestoneLabel(dayNumber) {
  if (dayNumber % 30 === 0) {
    return `Day ${dayNumber} milestone`;
  }
  if ((dayNumber - 1) % 7 === 0) {
    return `Week ${Math.floor((dayNumber - 1) / 7) + 1}`;
  }
  return '';
}

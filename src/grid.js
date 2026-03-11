import { createMoodIndicator, applyMoodToCell } from './mood.js';
import { getJourneyDays, getDayState } from './utils.js';

export function buildGrid({ container, data, onOpenDay }) {
  const days = getJourneyDays();
  container.innerHTML = '';

  days.forEach((day) => {
    const state = getDayState(day.date);
    const entry = data.entries[day.iso];

    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'day-cell';
    cell.dataset.date = day.iso;
    cell.dataset.state = state;

    if (entry?.note || entry?.mood) {
      cell.classList.add('journaled');
    }
    if (day.isMonday) {
      cell.classList.add('monday-marker');
    }
    if (day.isMilestone30) {
      cell.classList.add('milestone-30');
      cell.setAttribute('aria-label', `${day.iso} - Day ${day.dayNumber} milestone`);
    }

    const dayNum = document.createElement('span');
    dayNum.className = 'day-number';
    dayNum.textContent = String(day.date.getDate());

    const dayIndex = document.createElement('span');
    dayIndex.className = 'day-index';
    dayIndex.textContent = day.dayNumber;

    cell.append(dayNum, dayIndex);

    if (entry?.mood) {
      const moodDot = createMoodIndicator(entry.mood);
      if (moodDot) cell.append(moodDot);
      applyMoodToCell(cell, entry.mood);
    }

    cell.addEventListener('click', () => onOpenDay(day));
    container.append(cell);
  });
}

import { createMoodIndicator, applyMoodClass } from './mood.js';
import { getDayMeta, WEEKDAY_LABELS, getMilestoneLabel } from './utils.js';

export function renderGrid({ entries, onDayClick }) {
  const grid = document.getElementById('grid');
  const weekdayHeader = document.getElementById('weekday-header');
  const milestonePanel = document.getElementById('milestone-panel');

  weekdayHeader.innerHTML = '';
  WEEKDAY_LABELS.forEach((day) => {
    const el = document.createElement('div');
    el.textContent = day;
    weekdayHeader.append(el);
  });

  const dayMeta = getDayMeta(new Date());
  grid.innerHTML = '';

  dayMeta.forEach((meta) => {
    const button = document.createElement('button');
    button.className = 'day-square';
    button.type = 'button';
    button.dataset.date = meta.iso;
    button.style.gridColumn = meta.weekdayIndex + 1;
    button.style.gridRow = meta.weekIndex + 1;

    if (meta.isPast) button.classList.add('is-past');
    if (meta.isFuture) button.classList.add('is-future');
    if (meta.isToday) button.classList.add('is-today');
    if (meta.isMonday) button.classList.add('is-monday');
    if (meta.is30DayMilestone) button.classList.add('is-milestone');

    const entry = entries[meta.iso];
    if (entry && (entry.note || entry.mood)) {
      button.classList.add('is-journaled');
    }

    const number = document.createElement('span');
    number.className = 'day-number';
    number.textContent = String(meta.date.getDate());
    button.append(number);

    if (entry?.mood) {
      const marker = createMoodIndicator(entry.mood);
      if (marker) button.append(marker);
      applyMoodClass(button, entry.mood);
    }

    if (meta.isMonday || meta.is30DayMilestone) {
      const label = getMilestoneLabel(meta.dayNumber);
      if (label) button.setAttribute('aria-label', `${meta.iso} ${label}`);
    }

    button.addEventListener('click', () => onDayClick(meta.iso));
    grid.append(button);
  });

  const completed = dayMeta.filter((item) => item.isPast || item.isToday).length;
  milestonePanel.textContent = `Progress: ${completed}/${dayMeta.length} days`;
}

import { formatFriendlyDate } from './utils.js';
import { renderMoodOptions } from './mood.js';

export function createJournalController({ onSave, getEntry }) {
  const modal = document.getElementById('journal-modal');
  const form = document.getElementById('journal-form');
  const dateLabel = document.getElementById('journal-date');
  const noteInput = document.getElementById('journal-note');
  const moodOptions = document.getElementById('mood-options');
  const cancelBtn = document.getElementById('cancel-btn');

  const state = { activeDate: null };

  function open(date) {
    state.activeDate = date;
    const entry = getEntry(date) || {};

    dateLabel.textContent = formatFriendlyDate(date);
    noteInput.value = entry.note || '';
    renderMoodOptions(moodOptions, entry.mood || '');
    modal.showModal();
  }

  function close() {
    modal.close();
    state.activeDate = null;
  }

  cancelBtn.addEventListener('click', close);
  modal.addEventListener('click', (event) => {
    const rect = form.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (outside) close();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!state.activeDate) return;

    const selected = form.querySelector('input[name="mood"]:checked');
    onSave(state.activeDate, {
      note: noteInput.value.trim(),
      mood: selected?.value || ''
    });
    close();
  });

  return { open, close };
}

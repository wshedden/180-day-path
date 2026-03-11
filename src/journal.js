import { formatLongDate } from './utils.js';
import { renderMoodOptions } from './mood.js';

export function createJournalController({ onSave, getEntry }) {
  const modal = document.getElementById('journal-modal');
  const form = document.getElementById('journal-form');
  const modalDate = document.getElementById('modal-date');
  const noteInput = document.getElementById('journal-note');
  const moodOptions = document.getElementById('mood-options');
  const closeBtn = document.getElementById('close-modal');

  let currentISO = null;
  let currentMood = null;

  function open(day) {
    currentISO = day.iso;
    const existing = getEntry(currentISO);
    currentMood = existing?.mood || null;

    modalDate.textContent = formatLongDate(day.date);
    noteInput.value = existing?.note || '';
    renderMoodOptions(moodOptions, currentMood);
    modal.showModal();
  }

  function close() {
    modal.close();
    currentISO = null;
  }

  moodOptions.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-mood]');
    if (!button) return;
    currentMood = button.dataset.mood;
    renderMoodOptions(moodOptions, currentMood);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!currentISO) return;
    onSave(currentISO, {
      mood: currentMood,
      note: noteInput.value.trim()
    });
    close();
  });

  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (event) => {
    const card = event.target.closest('.modal-card');
    if (!card) close();
  });

  return { open, close };
}

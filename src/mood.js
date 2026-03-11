export const MOODS = {
  green: { label: 'Good', className: 'mood-green' },
  yellow: { label: 'Neutral', className: 'mood-yellow' },
  red: { label: 'Difficult', className: 'mood-red' }
};

export function renderMoodOptions(container, selectedMood = '') {
  container.innerHTML = '';

  Object.entries(MOODS).forEach(([key, mood]) => {
    const label = document.createElement('label');
    label.className = `mood-pill ${selectedMood === key ? 'selected' : ''}`;

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'mood';
    input.value = key;
    input.checked = selectedMood === key;

    const dot = document.createElement('i');
    dot.className = `dot ${mood.className}`;

    const text = document.createElement('span');
    text.textContent = mood.label;

    label.append(input, dot, text);
    container.append(label);
  });
}

export function createMoodIndicator(mood) {
  if (!MOODS[mood]) return null;
  const marker = document.createElement('span');
  marker.className = `mood-marker ${MOODS[mood].className}`;
  marker.title = MOODS[mood].label;
  return marker;
}

export function applyMoodClass(el, mood) {
  el.classList.remove('has-mood-green', 'has-mood-yellow', 'has-mood-red');
  if (MOODS[mood]) {
    el.classList.add(`has-mood-${mood}`);
  }
}

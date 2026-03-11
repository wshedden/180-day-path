export const MOODS = {
  green: { label: 'Good', color: '#2effa8' },
  yellow: { label: 'Neutral', color: '#ffe66d' },
  red: { label: 'Difficult', color: '#ff5d8f' }
};

export function createMoodIndicator(mood) {
  if (!mood || !MOODS[mood]) return null;
  const dot = document.createElement('span');
  dot.className = `mood-indicator mood-${mood}`;
  dot.title = MOODS[mood].label;
  return dot;
}

export function applyMoodToCell(cell, mood) {
  cell.classList.remove('has-mood-green', 'has-mood-yellow', 'has-mood-red');
  if (mood && MOODS[mood]) {
    cell.classList.add(`has-mood-${mood}`);
  }
}

export function renderMoodOptions(container, selectedMood) {
  container.innerHTML = '';

  Object.entries(MOODS).forEach(([key, value]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `mood-option ${selectedMood === key ? 'selected' : ''}`;
    button.dataset.mood = key;
    button.innerHTML = `<i class="dot mood-${key}"></i>${value.label}`;
    container.append(button);
  });
}

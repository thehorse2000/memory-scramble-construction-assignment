import { EMOJIS } from './emojis.js';

export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateBoard(rows, cols) {
  const total = rows * cols;
  if (total % 2 !== 0) {
    throw new Error('Board size must be even');
  }
  const pairs = total / 2;
  if (pairs > EMOJIS.length) {
    throw new Error(`Not enough unique icons (need ${pairs}, have ${EMOJIS.length})`);
  }
  const picks = shuffle(EMOJIS).slice(0, pairs);
  const deck = shuffle([...picks, ...picks]);
  return deck.map((emoji, i) => ({
    id: i,
    emoji,
    faceUp: false,
    matched: false,
  }));
}

export default function Card({ card, onFlip, disabled }) {
  const { faceUp, matched, emoji } = card;
  const revealed = faceUp || matched;

  const className = [
    'card',
    revealed ? 'card--up' : 'card--down',
    matched ? 'card--matched' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={className}
      onClick={() => onFlip(card.id)}
      disabled={disabled || revealed}
      aria-label={revealed ? `Card showing ${emoji}` : 'Face-down card'}
    >
      <span className="card__face">{revealed ? emoji : '?'}</span>
    </button>
  );
}

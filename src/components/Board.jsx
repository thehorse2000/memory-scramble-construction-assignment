import Card from './Card.jsx';

export default function Board({ cards, cols, onFlip, locked, revealAll }) {
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onFlip={onFlip}
          disabled={locked}
          forceReveal={revealAll}
        />
      ))}
    </div>
  );
}

export default function GameOverModal({ status, secondsLeft, onPlayAgain }) {
  const won = status === 'won';
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className={`modal ${won ? 'modal--win' : 'modal--lose'}`}>
        <h2>{won ? 'You Win!' : 'Game Over'}</h2>
        <p>
          {won
            ? `All pairs matched with ${secondsLeft}s to spare.`
            : 'Time ran out before all pairs were matched.'}
        </p>
        <button type="button" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}

import { useGame } from './hooks/useGame.js';
import ConfigPanel from './components/ConfigPanel.jsx';
import Board from './components/Board.jsx';
import Timer from './components/Timer.jsx';
import GameOverModal from './components/GameOverModal.jsx';

export default function App() {
  const {
    status,
    config,
    cards,
    secondsLeft,
    previewLeft,
    startGame,
    flipCard,
    reset,
  } = useGame();

  if (status === 'config') {
    return (
      <main className="app">
        <ConfigPanel onStart={startGame} />
      </main>
    );
  }

  const previewing = status === 'preview';

  return (
    <main className="app">
      <header className="game-header">
        <h1>Memory Scramble</h1>
        {previewing ? (
          <div className="preview-banner">
            Memorize: <strong>{previewLeft}s</strong>
          </div>
        ) : (
          <Timer secondsLeft={secondsLeft} />
        )}
        <button type="button" className="quit-btn" onClick={reset}>
          Quit
        </button>
      </header>

      <Board
        cards={cards}
        cols={config.cols}
        onFlip={flipCard}
        locked={status !== 'playing'}
        revealAll={previewing}
      />

      {(status === 'won' || status === 'lost') && (
        <GameOverModal
          status={status}
          secondsLeft={secondsLeft}
          onPlayAgain={reset}
        />
      )}
    </main>
  );
}

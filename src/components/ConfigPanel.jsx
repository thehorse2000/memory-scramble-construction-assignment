import { useMemo, useState } from 'react';
import { MAX_PAIRS } from '../utils/emojis.js';

const MIN_DIM = 2;
const MAX_DIM = 10;
const MIN_TIMEOUT = 10;
const MAX_TIMEOUT = 600;

export default function ConfigPanel({ onStart }) {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [timeoutSeconds, setTimeoutSeconds] = useState(60);

  const error = useMemo(() => {
    if (!Number.isInteger(rows) || rows < MIN_DIM || rows > MAX_DIM) {
      return `Rows must be between ${MIN_DIM} and ${MAX_DIM}.`;
    }
    if (!Number.isInteger(cols) || cols < MIN_DIM || cols > MAX_DIM) {
      return `Columns must be between ${MIN_DIM} and ${MAX_DIM}.`;
    }
    const total = rows * cols;
    if (total % 2 !== 0) {
      return 'Board size (rows × columns) must be even.';
    }
    if (total / 2 > MAX_PAIRS) {
      return `Too many pairs requested (${total / 2}). Maximum is ${MAX_PAIRS}.`;
    }
    if (
      !Number.isInteger(timeoutSeconds) ||
      timeoutSeconds < MIN_TIMEOUT ||
      timeoutSeconds > MAX_TIMEOUT
    ) {
      return `Timeout must be between ${MIN_TIMEOUT} and ${MAX_TIMEOUT} seconds.`;
    }
    return null;
  }, [rows, cols, timeoutSeconds]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) return;
    onStart({ rows, cols, timeoutSeconds });
  };

  return (
    <form className="config-panel" onSubmit={handleSubmit}>
      <h1>Memory Scramble</h1>
      <p className="config-hint">
        Configure the board size and timeout, then start the game.
      </p>

      <label>
        Rows
        <input
          type="number"
          min={MIN_DIM}
          max={MAX_DIM}
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
      </label>

      <label>
        Columns
        <input
          type="number"
          min={MIN_DIM}
          max={MAX_DIM}
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
        />
      </label>

      <label>
        Timeout (seconds)
        <input
          type="number"
          min={MIN_TIMEOUT}
          max={MAX_TIMEOUT}
          value={timeoutSeconds}
          onChange={(e) => setTimeoutSeconds(Number(e.target.value))}
        />
      </label>

      {error && <p className="config-error">{error}</p>}

      <button type="submit" disabled={!!error}>
        Start Game
      </button>
    </form>
  );
}

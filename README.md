# Memory Scramble

A configurable memory matching game built with **React** and **Vite**.

The player turns over face-down cards trying to find matching pairs before the
countdown timer hits zero.

## Requirements coverage

The implementation satisfies every item in the assignment brief:

- [x] Configurable board size via `nRows` × `nColumns` inputs (validated to be even).
- [x] Generates `board_size / 2` distinct emoji icons and randomly distributes
      them using a Fisher–Yates shuffle (`src/utils/board.js`).
- [x] Configurable game timeout (seconds).
- [x] Optional preview phase that briefly reveals all cards before the timer starts.
- [x] On-screen countdown timer that updates every second.
- [x] Game-over message displayed when the timer reaches zero with unmatched cards.
- [x] Player selects two cells; both flip face-up. Matched pairs stay face-up,
      non-matching pairs flip back after a short delay.
- [x] Win modal when every pair is matched before time runs out.

## Prerequisites

- **Node.js 18+** (Vite 5 requires Node 18 or newer)
- **npm** (bundled with Node)

## Install

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Vite prints a local URL (typically `http://localhost:5173`). Open it in any
modern browser.

## Build (production)

```bash
npm run build      # outputs to ./dist
npm run preview    # serves the production build locally
```

## How to play

1. On the start screen, set the number of **rows**, **columns**, the
   **timeout** in seconds, and optionally enable a **preview phase** to peek
   at all cards for a configurable number of seconds. The total number of
   cells must be even.
2. Click **Start Game**. If preview is enabled, every card is revealed for
   the preview duration before the countdown begins.
3. Click any face-down card to flip it. Click a second card to try to match it.
   - Matching pair → both cards stay face-up.
   - Non-matching pair → both cards flip back after a brief pause.
4. Match all pairs before the timer hits zero to win.
5. If time runs out, a **Game Over** message appears.
6. Use **Play Again** to return to configuration and start a new round with a
   freshly shuffled board.

## Configuration limits

| Field          | Range            |
| -------------- | ---------------- |
| Rows           | 2 – 10           |
| Columns        | 2 – 10           |
| Timeout (sec)  | 10 – 600         |
| Preview (sec)  | 1 – 30 (optional)|
| Pairs (max)    | 60 (emoji pool)  |

`rows × cols` must be even.

## Project layout

```
src/
├── main.jsx              # React entry point
├── App.jsx               # routes between config screen and game
├── styles.css            # all styling
├── hooks/
│   └── useGame.js        # game state machine + timer
├── utils/
│   ├── emojis.js         # icon pool
│   └── board.js          # generate + shuffle helpers
└── components/
    ├── ConfigPanel.jsx
    ├── Board.jsx
    ├── Card.jsx
    ├── Timer.jsx
    └── GameOverModal.jsx
```

## Team

Amr Osama Fahim
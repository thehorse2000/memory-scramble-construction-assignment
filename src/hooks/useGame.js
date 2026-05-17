import { useCallback, useEffect, useRef, useState } from 'react';
import { generateBoard } from '../utils/board.js';

const UNFLIP_DELAY_MS = 800;

export function useGame() {
  const [status, setStatus] = useState('config');
  const [config, setConfig] = useState(null);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [previewLeft, setPreviewLeft] = useState(0);
  const unflipTimer = useRef(null);

  const clearUnflip = () => {
    if (unflipTimer.current) {
      clearTimeout(unflipTimer.current);
      unflipTimer.current = null;
    }
  };

  const startGame = useCallback((newConfig) => {
    clearUnflip();
    const deck = generateBoard(newConfig.rows, newConfig.cols);
    setConfig(newConfig);
    setCards(deck);
    setSelected([]);
    setSecondsLeft(newConfig.timeoutSeconds);
    const preview = newConfig.previewSeconds ?? 0;
    if (preview > 0) {
      setPreviewLeft(preview);
      setStatus('preview');
    } else {
      setPreviewLeft(0);
      setStatus('playing');
    }
  }, []);

  const reset = useCallback(() => {
    clearUnflip();
    setStatus('config');
    setCards([]);
    setSelected([]);
    setSecondsLeft(0);
    setPreviewLeft(0);
  }, []);

  const flipCard = useCallback((id) => {
    if (status !== 'playing') return;
    if (selected.length >= 2) return;

    setCards((prev) => {
      const card = prev.find((c) => c.id === id);
      if (!card || card.faceUp || card.matched) return prev;
      return prev.map((c) => (c.id === id ? { ...c, faceUp: true } : c));
    });
    setSelected((prev) => {
      if (prev.includes(id) || prev.length >= 2) return prev;
      return [...prev, id];
    });
  }, [status, selected.length]);

  // Evaluate a pair when two cards are selected.
  useEffect(() => {
    if (selected.length !== 2) return;
    const [a, b] = selected;
    const cardA = cards.find((c) => c.id === a);
    const cardB = cards.find((c) => c.id === b);
    if (!cardA || !cardB) return;

    if (cardA.emoji === cardB.emoji) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === a || c.id === b ? { ...c, matched: true } : c,
        ),
      );
      setSelected([]);
    } else {
      unflipTimer.current = setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === a || c.id === b ? { ...c, faceUp: false } : c,
          ),
        );
        setSelected([]);
        unflipTimer.current = null;
      }, UNFLIP_DELAY_MS);
    }
  }, [selected, cards]);

  // Win check.
  useEffect(() => {
    if (status !== 'playing') return;
    if (cards.length === 0) return;
    if (cards.every((c) => c.matched)) {
      clearUnflip();
      setStatus('won');
    }
  }, [cards, status]);

  // Countdown timer.
  useEffect(() => {
    if (status !== 'playing') return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [status]);

  // Loss check (separate effect so it reads the freshest cards state).
  useEffect(() => {
    if (status === 'playing' && secondsLeft === 0) {
      clearUnflip();
      setStatus('lost');
    }
  }, [secondsLeft, status]);

  // Preview countdown — when it hits 0, transition into 'playing'.
  useEffect(() => {
    if (status !== 'preview') return;
    const id = setInterval(() => {
      setPreviewLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (status === 'preview' && previewLeft === 0) {
      setStatus('playing');
    }
  }, [previewLeft, status]);

  useEffect(() => () => clearUnflip(), []);

  return {
    status,
    config,
    cards,
    secondsLeft,
    previewLeft,
    startGame,
    flipCard,
    reset,
  };
}

import { create } from 'zustand';
import type { Card } from '../models/Card';
import { initialSnapshot, shuffleDeck, type GameSnapshot } from '../game/logic';
interface GameState {
  snapshot: GameSnapshot;
  currentCard?: Card;
  shuffleKey: number;
  drawKey: number;
  start: (cards: Card[]) => void;
  flip: () => void;
  next: () => void;
  previous: () => void;
  shuffle: () => void;
  reset: () => void;
}

const deriveCurrent = (snapshot: GameSnapshot): Card | undefined => {
  return snapshot.deck[snapshot.index];
};

export const useGameStore = create<GameState>((set, get) => ({
  snapshot: initialSnapshot,
  currentCard: undefined,
  shuffleKey: 0,
  drawKey: 0,
  start: (cards) => {
    if (!cards.length) {
      set({
        snapshot: { ...initialSnapshot, phase: 'idle' },
        currentCard: undefined,
        drawKey: 0
      });
      return;
    }
    const deck = shuffleDeck(cards);
    const snapshot: GameSnapshot = {
      deck,
      index: 0,
      phase: 'showingFront',
      flipped: false,
      correct: 0,
      wrong: 0
    };
    const shuffleKey = get().shuffleKey + 1;
    const drawKey = get().drawKey + 1;
    set({ snapshot, currentCard: deriveCurrent(snapshot), shuffleKey, drawKey });
  },
  flip: () => {
    const snapshot = get().snapshot;
    if (snapshot.phase === 'showingFront') {
      const nextSnapshot: GameSnapshot = { ...snapshot, phase: 'showingBack', flipped: true };
      set({ snapshot: nextSnapshot, currentCard: deriveCurrent(nextSnapshot) });
    } else if (snapshot.phase === 'showingBack') {
      const nextSnapshot: GameSnapshot = { ...snapshot, phase: 'showingFront', flipped: false };
      set({ snapshot: nextSnapshot, currentCard: deriveCurrent(nextSnapshot) });
    }
  },
  next: () => {
    const snapshot = get().snapshot;
    if (!snapshot.deck.length) return;
    const nextIndex = snapshot.index + 1;
    if (nextIndex >= snapshot.deck.length) {
      const nextSnapshot: GameSnapshot = {
        ...snapshot,
        index: nextIndex,
        phase: 'complete',
        flipped: true
      };
      set({ snapshot: nextSnapshot, currentCard: undefined });
      return;
    }
    const nextSnapshot: GameSnapshot = {
      ...snapshot,
      index: nextIndex,
      phase: 'showingFront',
      flipped: false
    };
    const drawKey = get().drawKey + 1;
    set({ snapshot: nextSnapshot, currentCard: deriveCurrent(nextSnapshot), drawKey });
  },
  previous: () => {
    const snapshot = get().snapshot;
    if (!snapshot.deck.length) return;

    if (snapshot.phase === 'complete') {
      const previousIndex = snapshot.deck.length - 1;
      const previousSnapshot: GameSnapshot = {
        ...snapshot,
        index: previousIndex,
        phase: 'showingFront',
        flipped: false
      };
      const drawKey = get().drawKey + 1;
      set({ snapshot: previousSnapshot, currentCard: deriveCurrent(previousSnapshot), drawKey });
      return;
    }

    const previousIndex = snapshot.index - 1;
    if (previousIndex < 0) {
      return;
    }

    const previousSnapshot: GameSnapshot = {
      ...snapshot,
      index: previousIndex,
      phase: 'showingFront',
      flipped: false
    };
    const drawKey = get().drawKey + 1;
    set({ snapshot: previousSnapshot, currentCard: deriveCurrent(previousSnapshot), drawKey });
  },
  shuffle: () => {
    const snapshot = get().snapshot;
    if (!snapshot.deck.length) return;
    const deck = shuffleDeck(snapshot.deck);
    const nextSnapshot: GameSnapshot = {
      deck,
      index: 0,
      phase: 'showingFront',
      flipped: false,
      correct: 0,
      wrong: 0
    };
    const shuffleKey = get().shuffleKey + 1;
    const drawKey = get().drawKey + 1;
    set({
      snapshot: nextSnapshot,
      currentCard: deriveCurrent(nextSnapshot),
      shuffleKey,
      drawKey
    });
  },
  reset: () => {
    set({ snapshot: initialSnapshot, currentCard: undefined, drawKey: 0 });
  }
}));

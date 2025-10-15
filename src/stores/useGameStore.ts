import { create } from 'zustand';
import type { Card } from '../models/Card';
import { initialSnapshot, shuffleDeck, type GameSnapshot } from '../game/logic';
import { useCardsStore } from './useCardsStore';

interface GameState {
  snapshot: GameSnapshot;
  currentCard?: Card;
  shuffleKey: number;
  drawKey: number;
  start: (cards: Card[]) => void;
  flip: () => void;
  markCorrect: () => Promise<void>;
  markWrong: () => Promise<void>;
  next: () => void;
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
  markCorrect: async () => {
    const { snapshot, currentCard } = get();
    if (!currentCard) return;
    await useCardsStore.getState().recordCorrect(currentCard.id);
    const nextSnapshot: GameSnapshot = {
      ...snapshot,
      correct: snapshot.correct + 1,
      phase: 'judged',
      flipped: true
    };
    set({ snapshot: nextSnapshot, currentCard });
  },
  markWrong: async () => {
    const { snapshot, currentCard } = get();
    if (!currentCard) return;
    await useCardsStore.getState().recordWrong(currentCard.id);
    const nextSnapshot: GameSnapshot = {
      ...snapshot,
      wrong: snapshot.wrong + 1,
      phase: 'judged',
      flipped: true
    };
    set({ snapshot: nextSnapshot, currentCard });
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

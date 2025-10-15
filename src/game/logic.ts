import type { Card } from '../models/Card';

export type GamePhase =
  | 'idle'
  | 'shuffling'
  | 'showingFront'
  | 'showingBack'
  | 'judged'
  | 'complete';

export interface GameSnapshot {
  deck: Card[];
  index: number;
  phase: GamePhase;
  flipped: boolean;
  correct: number;
  wrong: number;
}

export const shuffleDeck = (cards: Card[]): Card[] => {
  const clone = [...cards];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
};

export function createIterator(deck: Card[]) {
  let index = 0;
  return {
    next: () => {
      if (index >= deck.length) {
        return { value: undefined, done: true as const };
      }
      const value = deck[index];
      index += 1;
      return { value, done: false as const };
    },
    reset: () => {
      index = 0;
    }
  };
}

export const initialSnapshot: GameSnapshot = {
  deck: [],
  index: 0,
  phase: 'idle',
  flipped: false,
  correct: 0,
  wrong: 0
};

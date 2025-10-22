import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import type { Card } from '../models/Card';
import { CardsRepo } from '../db/cardsDb';
import { seededCards } from '../db/seedData';

interface CardsState {
  cards: Card[];
  loading: boolean;
  initialized: boolean;
  init: () => Promise<void>;
  addCard: (payload: Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'correctCount' | 'wrongCount'>) => Promise<void>;
  updateCard: (id: string, updates: Partial<Card>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export const useCardsStore = create<CardsState>((set, get) => ({
  cards: [],
  loading: false,
  initialized: false,
  init: async () => {
    if (get().initialized) return;
    set({ loading: true });
    const existing = await CardsRepo.getAll();
    if (!existing.length) {
      await CardsRepo.bulkAdd(seededCards);
    }
    const cards = await CardsRepo.getAll();
    set({ cards, loading: false, initialized: true });
  },
  addCard: async (payload) => {
    const now = Date.now();
    const card: Card = {
      id: uuid(),
      correctCount: 0,
      wrongCount: 0,
      createdAt: now,
      updatedAt: now,
      ...payload
    };
    await CardsRepo.add(card);
    set({ cards: [card, ...get().cards] });
  },
  updateCard: async (id, updates) => {
    await CardsRepo.update(id, updates);
    set({
      cards: get().cards.map((card) =>
        card.id === id ? { ...card, ...updates, updatedAt: Date.now() } : card
      )
    });
  },
  deleteCard: async (id) => {
    await CardsRepo.delete(id);
    set({ cards: get().cards.filter((card) => card.id !== id) });
  },
  refresh: async () => {
    const cards = await CardsRepo.getAll();
    set({ cards });
  }
}));

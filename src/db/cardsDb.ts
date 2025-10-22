import Dexie, { Table } from 'dexie';
import type { Card } from '../models/Card';

export class CardsDatabase extends Dexie {
  cards!: Table<Card, string>;

  constructor() {
    super('vocabulary_cards_db');
    this.version(1).stores({
      cards: '&id, word, createdAt, updatedAt'
    });
  }
}

export const cardsDb = new CardsDatabase();

export class CardsRepo {
  static async getAll(): Promise<Card[]> {
    return cardsDb.cards.orderBy('createdAt').reverse().toArray();
  }

  static async add(card: Card): Promise<void> {
    await cardsDb.cards.put(card);
  }

  static async bulkAdd(cards: Card[]): Promise<void> {
    await cardsDb.cards.bulkPut(cards);
  }

  static async update(id: string, changes: Partial<Card>): Promise<void> {
    await cardsDb.cards.update(id, {
      ...changes,
      updatedAt: Date.now()
    });
  }

  static async delete(id: string): Promise<void> {
    await cardsDb.cards.delete(id);
  }

}

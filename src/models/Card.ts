export interface Card {
  id: string;
  word: string;
  definition: string;
  phonetics?: string;
  example?: string;
  tags?: string[];
  createdAt: number;
  updatedAt: number;
  correctCount: number;
  wrongCount: number;
}

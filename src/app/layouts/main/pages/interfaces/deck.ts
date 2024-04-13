import { Card } from './card';

export interface Deck {
  name: string;
  id: number;
  cards: Card[];
  languageLearning: boolean;
  randomOrder: boolean;
  editMode: boolean
}

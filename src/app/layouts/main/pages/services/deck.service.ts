import { Injectable, signal } from '@angular/core';
import { Deck } from '../interfaces/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  public decks = signal<Deck[]>([]);

  public createDeck(
    name: string,
    languageLearning: boolean,
    randomOrder: boolean
  ): void {
    const newDeck: Deck = {
      id: Date.now(),
      cards: [],
      name: '',
      languageLearning: false,
      randomOrder: false,
      editMode: false,
    };

    newDeck.name = name;
    newDeck.languageLearning = languageLearning;
    newDeck.randomOrder = randomOrder;


    this.decks.update((currentDecks: Deck[]) => {
      return [...currentDecks, newDeck];
    });
    // this.updateLocalStorage();
  }
  public updateDeck(
    name: string,
    languageLearning: boolean,
    randomOrder: boolean
  ): void {
    const decks = this.decks();

    const taskInEditMode = decks.find((deck) => deck.editMode);

    if (taskInEditMode) {
      const updatedDeck: Deck = {
        ...taskInEditMode,
        name: name,
        languageLearning: languageLearning,
        randomOrder: randomOrder
      };

      this.decks.update((currentDecks: Deck[]) => {
        return currentDecks.map((d) =>
        d.id === updatedDeck.id ? updatedDeck : d
        );
      });

      updatedDeck.editMode = false;
    }
  }
  constructor() {}
}

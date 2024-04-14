import { Injectable, signal } from '@angular/core';
import { Deck } from '../interfaces/deck';
import Swal from 'sweetalert2';

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
  public deleteTask(deckToDelete: Deck): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete the deck '{{deckToDelete.name}}'? This will operation can not be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(81 138 88)',
      cancelButtonColor: 'rgb(186, 73, 73)',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.decks.update((currentDeckList: Deck[]) => {
          return currentDeckList.filter((deck) => deck.id !== deckToDelete.id);
        });
        // this.updateLocalStorage();
      }
    });
  }
  constructor() {}
}

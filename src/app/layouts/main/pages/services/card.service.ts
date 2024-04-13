import { Injectable, inject, signal } from '@angular/core';
import { Card } from '../interfaces/card';
import { Deck } from '../interfaces/deck';
import { DeckService } from './deck.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly deckService = inject(DeckService);
  public totalCards = 0
  public createCard(
    deckId: number,
    front: string,
    back: string,
    additional: string | null
  ): void {
    const newCard: Card = {
      front: '',
      back: '',
      additional: '',
    };
    let fsaf = this.deckService!.decks().find((deck) => deck.id === deckId);
    newCard.front = front;
    newCard.back = back;
    newCard.additional = additional;

    fsaf!.cards.push(newCard)

    this.totalCards++
  }
}

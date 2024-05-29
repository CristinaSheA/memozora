import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Card } from '../../layouts/main/pages/interfaces/card';
import { DeckService } from '../../layouts/main/pages/services/deck.service';
import { CardService } from '../../layouts/main/pages/services/card.service';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../components/services/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnComponent {
  public cardsToLearn: Card[] = [];
  public deckService = inject(DeckService);
  public accountService = inject(AccountService);
  private readonly router = inject(Router);
  public cardService = inject(CardService);
  public firstCardDeckName!: string;
  public currentCardIndex: number = 0;
  public showFlipButton: boolean = true;
  public showYesNoButton: boolean = false;
  public showNextButton: boolean = false;
  public flipedCard: boolean = false;
  public message: string = 'Guess the answer';
  public startTime!: number;

  currentProgress = 0;
  public setFlipedCard(value: boolean) {
    this.flipedCard = value;
    if (value) {
      this.showFlipButton = false;
      this.showYesNoButton = true;
    }
    this.setMessage('Did you remember correctly?');
  }
  public yesNoButton(value: string) {
    this.showYesNoButton = false;
    this.showNextButton = true;
    if (value === 'yes') {
      this.setMessage('Good work');
    } else {
      this.setMessage('This will be reviewed again');
      this.cardsToLearn.push(this.cardsToLearn[0]);
    }
  }
  public setMessage(value: string) {
    this.message = value;
  }
  
  calculateProgress() {
    if (this.cardsToLearn.length === 0) {
      this.currentProgress = 100;
    } else {
      this.currentProgress = Math.floor((this.currentCardIndex / this.cardsToLearn.length) * 100);
    }
  }
  ngOnDestroy() {
    let endTime = new Date().getTime();
    let timeSpent = endTime - this.startTime;

    const hoursSpent = timeSpent / (1000 * 3600);
    this.accountService!.hoursSpent =
      this.accountService!.hoursSpent / (1000 * 3600);
  }

  ngOnInit() {
    this.startTime = new Date().getTime();
    console.log(this.cardService!.numberCardsToLearn());

    let cardsCount = 0;
    this.cardsToLearn = [];

    let numberToLearn = parseInt(
      this.cardService!.numberCardsToLearn() as string,
      10
    );

    switch (this.cardService!.numberCardsToLearn()) {
      case 5:
      case 10:
      case 15:
        for (let deck of this.deckService!.decks()) {
          for (let card of deck.cards) {
            if (cardsCount < numberToLearn) {
              this.cardsToLearn.push(card);
              cardsCount++;
            } else {
              break;
            }
          }
        }
        console.log(this.cardsToLearn);
        break;
      case 'All':
        for (let deck of this.deckService!.decks()) {
          this.cardsToLearn = this.cardsToLearn.concat(deck.cards);
        }
        console.log(this.cardsToLearn);
        break;
    }
    this.cardsToLearn = this.shuffleArray(this.cardsToLearn);
    
    this.cardsToLearn[0] = this.cardsToLearn[0];
    if (this.cardsToLearn[0]) {
      const foundDeck = this.deckService!.decks().find(
        (deck: { cards: any[] }) =>
          deck.cards.some((card) => card === this.cardsToLearn[0])
      );
      this.firstCardDeckName = foundDeck!.name;
    }
    
    
  }
  private shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  public goToNextCard(): void {
    if (this.currentCardIndex < this.cardsToLearn.length - 1) {
      this.currentCardIndex++;
      const nextCard = this.cardsToLearn[this.currentCardIndex];
      const foundDeck = this.deckService!.decks().find((deck) =>
        deck.cards.some((card) => card === nextCard)
      );
      this.firstCardDeckName = foundDeck ? foundDeck.name : 'Mazo desconocido';
    }
    this.flipedCard = false;
    this.showFlipButton = true;
    this.showNextButton = false;
    this.setMessage('Guess the answer');
    if (this.currentCardIndex === this.cardsToLearn.length) {
      this.router!.navigateByUrl('app/home')
    }
    this.calculateProgress()
  }
}

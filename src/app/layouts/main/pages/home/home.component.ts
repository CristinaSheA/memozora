import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { DeckFormComponent } from './components/deck-form/deck-form.component';
import { DeckService } from '../services/deck.service';
import { CardFormComponent } from './components/card-form/card-form.component';
import { DeckComponent } from './components/deck/deck.component';
import { Deck } from '../interfaces/deck';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DeckFormComponent,
    CardFormComponent,
    DeckComponent,
    FormsModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public showDeckForm: boolean = false;
  public showCardsToLearn: boolean = false;
  public showCardPanel: boolean = false;
  public showCardForm: boolean = false;
  public orderDecks!: string;
  public deckService = inject(DeckService);

  public onChange(event: any) {
    this.orderDecks = event.target.value;
    console.log('47677', this.orderDecks);
    console.log(this.deckService?.decks());
    let s = this.deckService!.decks().sort()
    this.deckService!.decks.set(s)

    console.log(this.deckService?.decks());
  }

  public editDeck(deck: Deck): void {
    deck.editMode = true;
    this.setShowDeckForm(true);
  }
  public showLevelInfo() {
    Swal.fire({
      title: 'Memory Levels:',
      icon: 'info',
      html: `
       <p>Memory Level for each card is classified into 3 categories based on its Interval Days. (1 ~ 14 days -> Low, 15 ~ 60 days -> Mid, over 61 days -> High)</p>
      `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
    });
  }
  public setShowDeckForm(value: boolean) {
    this.showDeckForm = value;
    this.showCardPanel = false;
  }
  public setShowCardsToLearn(value: boolean) {
    this.showCardsToLearn = value;
  }
  public setShowCardPanel(value: boolean) {
    this.showCardPanel = value;
  }
  public setShowCardForm(value: boolean) {
    this.showCardForm = value;
    this.showCardPanel = false;
  }

  public get decks() {
    return this.deckService?.decks();
  }
}

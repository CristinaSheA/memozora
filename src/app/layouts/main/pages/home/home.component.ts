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
import { CardService } from '../services/card.service';
import { AccountService } from '../../../../components/services/account.service';
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
  private readonly accountService = inject(AccountService);
  public readonly deckService = inject(DeckService);
  public readonly cardService = inject(CardService);
  public decksToShow!: Deck[]

  
  ngOnInit() {
    const deck = this.deckService!.decks().find((deck: { id: any; }) => deck.id === this.accountService!.currentAccountId());
    if (!deck) return
  
    this.decksToShow = [deck]
    console.log(this.accountService?.currentAccountId());
    console.log(this.getCookie('currentAccountId'));
    
  }
  constructor() {
    let fsf = this.getCookie('currentAccountId')
    let decks = this.deckService!.decks().find((deck: { id: any; }) => deck.id === fsf);
    if (!decks) return
    console.log(decks);
     ;
    console.log(this.getCookie('currentAccountId'));
  }

  public getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
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
    this.showCardPanel = false
  }
  public setShowCardPanel(value: boolean) {
    this.showCardPanel = value;
  }
  public setShowCardForm(value: boolean) {
    this.showCardForm = value;
    this.showCardPanel = false;
  }
  public setCardsToLearn(value: number | string) {
    this.cardService!.numberCardsToLearn.set(value)
  }
  public get decks() {
    return this.deckService?.decks();
  }
  public get cards() {
    return this.cardService!.totalCards
  }
}

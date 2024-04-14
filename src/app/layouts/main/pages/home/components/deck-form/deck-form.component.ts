import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { DeckService } from '../../../services/deck.service';
import { Deck } from '../../../interfaces/deck';

@Component({
  selector: 'deck-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './deck-form.component.html',
  styleUrl: './deck-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckFormComponent {
  @Output() hideShowDeckForm = new EventEmitter<boolean>();
  @Output() showCardForm = new EventEmitter<boolean>();
  @Input() deck!: Deck;

  private readonly deckService = inject(DeckService);
  private readonly fb = inject(FormBuilder);
  public showUpdateButton: boolean = false;
  public deckForm: FormGroup = this.fb!.group({
    deckName: ['', [Validators.required, Validators.minLength(1)]],
    languageLearning: [false],
    randomOrder: [false],
  });

  ngOnInit() {
    const deckWithEditMode = this.deckService!.decks().find((deck) => deck.editMode === true);
    if (deckWithEditMode) {
      this.deck = deckWithEditMode;
      this.showUpdateButton = true;
      this.deckForm = this.fb!.group({
        deckName: [
          this.deck.name,
          [Validators.required, Validators.minLength(1)],
        ],
        languageLearning: [this.deck.languageLearning],
        randomOrder: [this.deck.randomOrder],
      });
    }
  }
  public createDeck(): void {
    let deckNameValue = this.deckForm.get('deckName')?.value;
    let languageLearningValue = this.deckForm.get('languageLearning')?.value;
    let randomOrderValue = this.deckForm.get('randomOrder')?.value;

    if (this.deckForm.invalid) {
      this.deckForm.markAllAsTouched;
      return;
    }

    this.deckService!.createDeck(
      deckNameValue,
      languageLearningValue,
      randomOrderValue
    );
    console.log(this.deckService?.decks());
    this.hideShowDeckForm.emit();
    this.showCardForm.emit();
  }
  public updateDeck() {
    let deckNameValue = this.deckForm.get('deckName')?.value;
    let languageLearningValue = this.deckForm.get('languageLearning')?.value;
    let randomOrderValue = this.deckForm.get('randomOrder')?.value;

    if (this.deckForm.invalid) {
      this.deckForm.markAllAsTouched;
      return;
    }

    this.deckService!.updateDeck(
      deckNameValue,
      languageLearningValue,
      randomOrderValue
    );
    this.hideShowDeckForm.emit()
  }
  public deleteDeck(deck: Deck) {
    this.deckService?.deleteTask(deck)
    this.hideShowDeckForm.emit()
  }
  

  public closeForm() {
    this.hideShowDeckForm.emit(); // Emit false to hide the form
  }
  public showRandomOrder() {
    Swal.fire({
      title: 'Random Order:',
      icon: 'info',
      html: `
       <p>When you start a learning session, the cards will be shuffled and displayed in a random order. </p>
      `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
    });
  }
  public showLanguageLearning() {
    Swal.fire({
      title: 'For language learning:',
      icon: 'info',
      html: `
       <p>By enabling this setting, you will have access to text-to-speech feature and dictionary feature.</p>
      `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
    });
  }
}

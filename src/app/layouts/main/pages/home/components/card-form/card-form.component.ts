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
import { DeckService } from '../../../services/deck.service';
import { CardService } from '../../../services/card.service';
import { Deck } from '../../../interfaces/deck';

@Component({
  selector: 'card-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly deckService = inject(DeckService);
  private readonly cardService = inject(CardService);
  @Output() hideShowCardForm = new EventEmitter<boolean>();

  public deckToAdd!: string;
  public cardForm: FormGroup = this.fb!.group({
    front: ['', [Validators.required, Validators.minLength(1)]],
    back: ['', [Validators.required, Validators.minLength(1)]],
    additional: [''],
  });

 
  public onChange(event: any) {
    this.deckToAdd = event.target.value;
    console.log('47677', this.deckToAdd);
  }
  public setShowCardForm() {
    this.hideShowCardForm.emit();
    console.log(this.deckService?.decks());
  }
  public get decks() {
    return this.deckService?.decks();
  }
  public createCard() {
    let fsaf = this.deckService!.decks().find(
      (deck: { name: string }) => this.deckToAdd === deck.name
    );

    let frontValue = this.cardForm.get('front')?.value;
    let backValue = this.cardForm.get('back')?.value;
    let additionalValue = this.cardForm.get('additional')?.value;

    if (!fsaf) return;
    this.cardService?.createCard(
      fsaf.id,
      frontValue,
      backValue,
      additionalValue
    );
    this.setShowCardForm();
  }
}

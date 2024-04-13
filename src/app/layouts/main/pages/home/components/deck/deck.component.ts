import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Deck } from '../../../interfaces/deck';

@Component({
  selector: 'deck',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckComponent {
  @Input() deck!: Deck;
  @Output() showCardPanel = new EventEmitter<boolean>();
  setShowCardPanel() {
    this.showCardPanel.emit();
  }

}

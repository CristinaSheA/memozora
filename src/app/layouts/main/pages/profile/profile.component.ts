import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public cardService = inject(CardService);
  public get totalCards() {
    return this.cardService?.totalCards
  }
}

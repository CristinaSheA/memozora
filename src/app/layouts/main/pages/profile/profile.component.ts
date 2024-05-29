import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardService } from '../services/card.service';
import { AccountService } from '../../../../components/services/account.service';

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
  public accountService = inject(AccountService);
  public deleteAccount() {
    return this.accountService?.deleteAccount()
  }
  public get email() {
    let acc = this.accountService!.accounts().find((acc) => acc.accountId === this.accountService?.currentAccountId());
    return acc!.email
  }
  public get totalCards() {
    return this.cardService?.totalCards
  }
  public get hoursSpent() {
    return this.accountService?.hoursSpent
  }
  public get daysEntered() {
    return this.accountService?.daysEntered
  }
}

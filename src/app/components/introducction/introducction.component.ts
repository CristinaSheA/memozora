import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AccountService } from '../services/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-introducction',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './introducction.component.html',
  styleUrl: './introducction.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroducctionComponent { 
  public accountService = inject(AccountService)
  setKindOfForm(kind: string) {
    this.accountService!.kindOfForm = kind
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormComponent {
  private readonly accountService = inject(AccountService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/accounts';


  public form: FormGroup = this.fb!.group({
    email: [
      '',
      [Validators.required, Validators.minLength(1), Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(1)]],
  });

  public get kindOfForm() {
    return this.accountService?.kindOfForm;
  }
  public setKindOfForm(value: string) {
    this.accountService!.kindOfForm = value;
    console.log(value);
    
  }
  public createAccount() {
    this.accountService!.createAccount(this.form)
  }
  public logIn() {
    this.accountService!.logIn(this.form)
  }
}

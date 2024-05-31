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
  }
  public createAccount() {
    if (this.form.invalid) {
      return;
    }
     
    this.createQuery().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.router!.navigateByUrl('app/home')
  }
  public createQuery(): Observable<any> {
    let emailValue = this.form.get('email')?.value;
    let passwordValue = this.form.get('password')?.value;
    return this.http!.post(this.apiUrl, {
      email: emailValue,
      password: passwordValue,
    });
  }

  
  public logIn() {
    let emailValue = this.form.get('email')?.value;
    let passwordValue = this.form.get('password')?.value;
    if (this.form.invalid) {
      return;
    }
    const accountToLogIn = this.accountService!.accounts().find(
      (account) =>
        account.email === emailValue && account.password === passwordValue
    );

    if (accountToLogIn) {
      this.accountService!.currentAccountId.set(accountToLogIn.accountId);
      this.router!.navigateByUrl('app/home')
      console.log(this.accountService!.accounts());
      document.cookie = "currentAccountId=" +  this.accountService!.currentAccountId();

      const lastActivityFromLocalStorage = localStorage.getItem('lastActivity');
      if (lastActivityFromLocalStorage) {
        let fsaf = JSON.parse(lastActivityFromLocalStorage)
        if (accountToLogIn.lastActivity !== fsaf) {
          accountToLogIn.lastActivity === new Date().getDay()
          localStorage.setItem('lastActivity', accountToLogIn.lastActivity.toString());
          this.accountService!.daysEntered++
        }
      }
    } else {
      return;
    }

  }
}

import { Injectable, inject, signal } from '@angular/core';
import { Account } from '../interfaces/account';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts = signal<Account[]>([]);
  public currentAccountId = signal<number>(0);
  private readonly router = inject(Router);
  public daysEntered:number = 0
  public hoursSpent: number = 0


  ngOnInit() {
    console.log('bef:', this.accounts());
    const accountsFromLocalStorage = localStorage.getItem('accounts');
    if (accountsFromLocalStorage) {
      this.accounts.set(JSON.parse(accountsFromLocalStorage));
    }
    console.log('aft:', this.accounts());
  }
  public kindOfForm: string = 'Log in';
  public createAccount(email: string, password: string) {
    let date = new Date()
    const newAccount: Account = {
      email: email,
      password: password,
      accountId: Date.now(),
      lastActivity: date.getDay()
    };

    console.log(newAccount.lastActivity);
    
    newAccount.email = email;
    newAccount.password = password;

    this.accounts.update((currentAccounts: Account[]) => {
      return [...currentAccounts, newAccount];
    });
    this.currentAccountId.set(newAccount.accountId);
    localStorage.setItem('accounts', this.accounts().toString());
    localStorage.setItem('lastActivity', newAccount.lastActivity.toString());
    this.daysEntered++
  }
  public deleteAccount() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete the account? This will operation can not be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(81 138 88)',
      cancelButtonColor: 'rgb(186, 73, 73)',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        this.accounts.update((currentAccounts: Account[]) => {
          return currentAccounts.filter((account) => account.accountId !== this.currentAccountId());
        });
        this.router!.navigateByUrl('introduction')
      }
    });
  }
  constructor() {}
}

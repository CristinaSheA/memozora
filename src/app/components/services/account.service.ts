import { Injectable, inject, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, toArray } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public accounts = signal([]);
  public currentAccountId = signal<number>(0);
  private readonly router = inject(Router);
  public daysEntered:number = 0
  public hoursSpent: number = 0
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/accounts';
  public kindOfForm!: string


  public getUsers() {
    return this.http!.get(this.apiUrl)
  }

  public createAccount(form: FormGroup) {
    if (form.invalid) {
      return;
    }
     
    this.createQuery(form).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.router!.navigateByUrl('app/home')
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
        // this.router!.navigateByUrl('introduction')
        // return this.http!.delete(`${this.apiUrl}/accounts/${this.currentAccountId()}`);
      } else {
        return
      }
    });
  }
  public logIn(form: FormGroup) {
    if (form.invalid) {
      return;
    }
  
    const email = form.get('email')!.value;
    const password = form.get('password')!.value;
  
    this.loginQuery(email, password)
      .subscribe({
        next: (user) => {
          this.router!.navigateByUrl('app/home');
        },
        error: (error) => {
          console.error('Login error:', error.message);
        }
      });
  }
  private loginQuery(email: string, password: string): Observable<any> {
    return this.http!.post(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }
  private createQuery(form: FormGroup): Observable<any> {
    let emailValue = form.get('email')?.value;
    let passwordValue = form.get('password')?.value;
    return this.http!.post(`${this.apiUrl}/register`, {
      email: emailValue,
      password: passwordValue,
    });
  }
}

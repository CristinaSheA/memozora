import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { ProfileComponent } from './layouts/main/pages/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { IntroducctionComponent } from './components/introducction/introducction.component';
import { HomeComponent } from './layouts/main/pages/home/home.component';
import { LearnComponent } from './pages/learn/learn.component';
export const routes: Routes = [
  {
    path: 'introduction',
    component: IntroducctionComponent,
  },
  {
    path: 'app',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'learn',
    component: LearnComponent,
  },
  { path: '',   redirectTo: '/introduction', pathMatch: 'full' }
];

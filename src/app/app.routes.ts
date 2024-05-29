import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { ProfileComponent } from './layouts/main/pages/profile/profile.component';
import { IntroducctionComponent } from './components/introducction/introducction.component';
import { HomeComponent } from './layouts/main/pages/home/home.component';
import { LearnComponent } from './pages/learn/learn.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
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
    path: 'account-form',
    component: AccountFormComponent,
  },
  {
    path: 'learn',
    component: LearnComponent,
  },
  { path: '',   redirectTo: '/introduction', pathMatch: 'full' }
];

import { Routes } from '@angular/router';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In',
    component: SignInPageComponent,
  },
  {
    path: 'sign-up',
    title: 'Sign Up',
    component: SignUpComponent,
  },
];

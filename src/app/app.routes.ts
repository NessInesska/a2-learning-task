import { Routes } from '@angular/router';

import { AuthPageComponent } from './components/auth-page';
import { MainPageComponent } from './components/main-page';

export const appRoutes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: []},
  {path: 'login', component: AuthPageComponent, canActivate: []},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

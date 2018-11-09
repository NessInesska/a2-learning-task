import { Routes } from '@angular/router';

import { AuthPageComponent } from './components/auth-page';
import { MainPageComponent } from './components/main-page';
import { ProductCardComponent } from './components/product-card';
import { MainPageGuard } from './guards/main-page-guard';

export const appRoutes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [MainPageGuard]},
  {path: 'login', component: AuthPageComponent, canActivate: []},
  {path: 'product', component: ProductCardComponent, canActivate: []},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

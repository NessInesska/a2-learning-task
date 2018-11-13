import { Routes } from '@angular/router';

import { AuthPageComponent } from './components/auth-page';
import { MainPageComponent } from './components/main-page';
import { ProductPageComponent } from './components/product-page';
import { AuthGuard, MainPageGuard } from './guards';

export const appRoutes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'product', component: ProductPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthPageComponent, canActivate: [MainPageGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

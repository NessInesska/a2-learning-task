import { Routes } from '@angular/router';

import { AuthPageComponent } from './pages/auth-page';
import { MainPageComponent } from './pages/main-page';
import { ProductPageComponent } from './pages/product-page';
import { AuthGuard, MainPageGuard } from './guards';

export const appRoutes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'product/:id', component: ProductPageComponent, canActivate: [AuthGuard], data: {}},
  {path: 'login', component: AuthPageComponent, canActivate: [MainPageGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

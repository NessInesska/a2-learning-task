import { Routes } from '@angular/router';

import { AuthPageComponent } from './components/auth-page';
import { MainPageComponent } from './components/main-page';
import { ProductPageComponent } from './components/product-page';
import { MainPageGuard } from './guards';

export const appRoutes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [MainPageGuard]},
  {path: 'login', component: AuthPageComponent, canActivate: []},
  {path: 'product', component: ProductPageComponent, canActivate: []},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

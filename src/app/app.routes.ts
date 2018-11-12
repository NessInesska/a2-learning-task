import { Routes } from '@angular/router';

import { AuthPageComponent } from './components/auth-page';
import { MainPageComponent } from './components/main-page';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { MainPageGuard } from './guards/main-page-guard';

export const appRoutes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [MainPageGuard]},
  {path: 'login', component: AuthPageComponent, canActivate: []},
  {path: 'product', component: ProductPageComponent, canActivate: []},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

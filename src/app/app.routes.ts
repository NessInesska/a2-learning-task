import { Routes } from '@angular/router';

import { AuthPageComponent } from './pages/auth-page';
import { MainPageComponent } from './pages/main-page';
import { AuthGuard, MainPageGuard } from './guards';
import { ProductPageComponent } from './pages/product-page';
import { ProductPageEditComponent } from './pages/product-page/product-page-edit';

export const appRoutes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'product/:id', component: ProductPageComponent, canActivate: [AuthGuard]},
  {path: 'product/:id/edit', component: ProductPageEditComponent},
  {path: 'login', component: AuthPageComponent, canActivate: [MainPageGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

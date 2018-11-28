import { Routes } from '@angular/router';

import { AuthPageComponent } from './pages/auth-page';
import { ErrorNotFoundPageComponent } from './pages/error-not-found-page';
import { MainPageComponent } from './pages/main-page';
import { AuthGuard, MainPageGuard } from './guards';
import { ProductPageComponent } from './pages/product-page/product-page';
import { ProductPageEditComponent } from './pages/product-page/product-page-edit';

export const appRoutes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'product-page/:id', component: ProductPageComponent, canActivate: [AuthGuard]},
  {path: 'product-page/:id/edit', component: ProductPageEditComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthPageComponent, canActivate: [MainPageGuard]},
  {path: '404', component: ErrorNotFoundPageComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

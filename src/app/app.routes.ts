import { Routes } from '@angular/router';

import { AuthPageComponent } from './pages/auth-page';
import { ErrorNotFoundPageComponent } from './pages/error-not-found-page';
import { InternalServerErrorComponent } from './pages/internal-server-error';
import { MainPageComponent } from './pages/main-page';
import { AuthGuard, EditProductPageGuard, MainPageGuard } from './guards';
import { ProductPageComponent } from './pages/product-page/product-page';
import { ProductPageEditComponent } from './pages/product-page/product-page-edit';

export const appRoutes: Routes = [
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'product-page/:id', component: ProductPageComponent, canActivate: [AuthGuard]},
  {path: 'product-page/:id/edit', component: ProductPageEditComponent, canActivate: [EditProductPageGuard]},
  {path: 'login', component: AuthPageComponent, canActivate: [MainPageGuard]},
  {path: '404', component: ErrorNotFoundPageComponent},
  {path: '500', component: InternalServerErrorComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
  {path: 'product-page/:id**', redirectTo: '/404', pathMatch: 'full'},
];

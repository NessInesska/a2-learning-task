import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthPageModule } from './components/auth-page';
import { ProductCardModule } from './components/product-card';
import { AuthGuard } from './guards';
import { MainPageModule } from './components/main-page';
import { AuthorizationService, RoutingService, UserService, ProductCardService } from './services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthPageModule,
    MainPageModule,
    ProductCardModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthorizationService,
    ProductCardService,
    RoutingService,
    UserService,
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthPageModule } from './components/auth-page';
import { PageHeaderModule } from './components/page-header';
import { ProductCardModule } from './components/product-card';
import { ProductPageModule } from './components/product-page';
import { AuthGuard } from './guards';
import { MainPageModule } from './components/main-page';
import { Interceptor } from './interceptor';
import { AuthorizationService, RoutingService, UserService, ProductCardService } from './services';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthPageModule,
    MainPageModule,
    ProductCardModule,
    ProductPageModule,
    PageHeaderModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [
    AuthGuard,
    AuthorizationService,
    ProductCardService,
    RoutingService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }

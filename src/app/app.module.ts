import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthPageModule } from './pages/auth-page';
import { PageHeaderModule } from './components/page-header';
import { ProductCardModule } from './components/product-card';
import { ProductPageModule } from './pages/product-page';
import { AuthGuard } from './guards';
import { MainPageModule } from './pages/main-page';
import { Interceptor } from './interceptor';
import { AuthorizationService, RoutingService, UserService, ProductService } from './services';
import { ProductPageEditComponent } from './components/product-page-edit';

@NgModule({
  declarations: [
    AppComponent,
    ProductPageEditComponent,
  ],
  imports: [
    AuthPageModule,
    MainPageModule,
    ProductCardModule,
    ProductPageModule,
    PageHeaderModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [
    AuthGuard,
    AuthorizationService,
    ProductService,
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
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }

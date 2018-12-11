import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ModalComponent } from './components/modal';
import { PageFooterModule } from './components/page-footer';
import { AuthPageModule } from './pages/auth-page';
import { PageHeaderModule } from './components/page-header';
import { ProductCardModule } from './components/product-card';
import { AuthGuard } from './guards';
import { MainPageModule } from './pages/main-page';
import { RequestsInterceptor } from './requests-interceptor.service';
import { AuthorizationService, RoutingService, UserService, ProductService, ModalService } from './services';
import { ErrorNotFoundPageComponent } from './pages/error-not-found-page';
import { InternalServerErrorComponent } from './pages/internal-server-error';
import { ProductDetailsModule } from './pages/product-details';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    ErrorNotFoundPageComponent,
    ModalComponent,
    InternalServerErrorComponent,
  ],
  entryComponents: [
    ModalComponent,
  ],
  imports: [
    AuthPageModule,
    MainPageModule,
    ProductCardModule,
    PageHeaderModule,
    PageFooterModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    MatDialogModule,
    MatButtonModule,
    ProductDetailsModule,
  ],
  providers: [
    AuthGuard,
    AuthorizationService,
    ProductService,
    RoutingService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },
    GlobalErrorHandler,
    ModalService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }

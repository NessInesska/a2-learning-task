import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ModalComponent } from './components/modal';
import { PageFooterModule } from './components/page-footer/page-footer.module';
import { GlobalErrorHandler } from './global-error-handler';
import { AuthPageModule } from './pages/auth-page';
import { PageHeaderModule } from './components/page-header';
import { ProductCardModule } from './components/product-card';
import { ProductPageModule } from './pages/product-page/product-page';
import { AuthGuard } from './guards';
import { MainPageModule } from './pages/main-page';
import { Interceptor } from './interceptor';
import { AuthorizationService, RoutingService, UserService, ProductService, ModalService } from './services';
import { ErrorNotFoundPageComponent } from './pages/error-not-found-page';
import { InternalServerErrorComponent } from './pages/internal-server-error';

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
    ProductPageModule,
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
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
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

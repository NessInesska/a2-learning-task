import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthorizationService, RoutingService } from './services';
import { STATUS_CODES } from './constants';


@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private routerService: RoutingService,
              private authService: AuthorizationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap(error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === STATUS_CODES.UNAUTHORIZED) {
          this.routerService.goToLoginPage();
        }
      }
    }));
  }
}

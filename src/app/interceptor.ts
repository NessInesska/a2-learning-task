import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthorizationService, RoutingService } from './services';
import { ENDPOINTS, STATUS_CODES } from './constants';


@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private routerService: RoutingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes(ENDPOINTS.LOGIN) && !request.headers.has('session-token')) {
      request = request.clone({headers: request.headers.set('session-token', localStorage.getItem('session-token'))});
    }

    return next.handle(request).pipe(tap(error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === STATUS_CODES.UNAUTHORIZED) {
          this.routerService.goToLoginPage();
        }
        if (error.status === STATUS_CODES.NOT_FOUND) {
          this.routerService.goToNotFoundPage();
        }
      }
    }));
  }
}

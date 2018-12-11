import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthorizationService, RoutingService, TokenService } from './services';
import { ENDPOINTS, LOCAL_STORAGE_KEYS, STATUS_CODES } from './constants';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  constructor(@Inject(forwardRef(() => AuthorizationService))
              private routerService: RoutingService,
              private authService: AuthorizationService,
              private tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes(ENDPOINTS.LOGIN) && !request.headers.has(LOCAL_STORAGE_KEYS.SESSION_TOKEN)) {
      request = request.clone({headers: request.headers.set(LOCAL_STORAGE_KEYS.SESSION_TOKEN, this.tokenService.getToken())});
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

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RoutingService } from './services';
import { STATUS_CODES } from './constants';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private routerService: RoutingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ withCredentials: true });

    return next.handle(request).pipe(tap(error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === STATUS_CODES.UNAUTHORIZED) {
          this.routerService.goToMainPage();
        }
      }
    }));
  }
}

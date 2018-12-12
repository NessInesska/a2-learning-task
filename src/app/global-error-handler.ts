import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { MESSAGES, STATUS_CODES } from './constants';
import { LocalStorageService, ModalService, RoutingService } from './services';

@Injectable()
export class GlobalErrorHandler {

  public wrongPassword = false;

  constructor(private injector: Injector) {
  }

  public handleError(error: HttpErrorResponse): Observable<any> {

    const routingService = this.injector.get(RoutingService);
    const modalService = this.injector.get(ModalService);
    const localStorageService = this.injector.get(LocalStorageService);

    if (error instanceof HttpErrorResponse) {

      if (error.error instanceof ErrorEvent) {
        const errMsg = `Error: ${error.error.message}`;
        console.log('Error: ' + errMsg);
      }

      if (error.status === STATUS_CODES.BAD_REQUEST) {
        this.wrongPassword = true;
        modalService.openModal({message: MESSAGES.WRONG_LOGIN_PASSWORD});
      }

      if (error.status === STATUS_CODES.UNAUTHORIZED) {
        localStorageService.clear();
        routingService.goToLoginPage();
      }


      if (error.status === STATUS_CODES.NOT_FOUND) {
        routingService.goToNotFoundPage();
      }

      if (error.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
        routingService.goToServerErrorPage();
      }
    }
    return throwError(error);
  }
}

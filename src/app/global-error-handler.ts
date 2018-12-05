import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ModalService, RoutingService } from './services';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor (private injector: Injector) {}

  handleError(error) {
    if (error.status === 404) {
      const routingService = this.injector.get(RoutingService);

      routingService.goToNotFoundPage();
    }

    if (error.status === 500) {
      const routingService = this.injector.get(RoutingService);

      routingService.goToServerErrorPage();
    }

    if (error instanceof HttpErrorResponse) {
    const modal = this.injector.get(ModalService);

    setTimeout(() => {
      modal.openModal({message: error.message, isUnauthorised: true});
    });

    throw error;
    }
  }
}

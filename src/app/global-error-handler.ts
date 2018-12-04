import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ModalService } from './services';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor (private injector: Injector) {}

  handleError(error) {
    if (error instanceof HttpErrorResponse) {
    const modal = this.injector.get(ModalService);

    setTimeout(() => {
      modal.openModal({message: error.message, isUnauthorised: true});
    });

    throw error;
    }
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { ModalService } from './services';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor (private injector: Injector) {}

  handleError(error) {
    if (error instanceof HttpErrorResponse) {
    const modal = this.injector.get(ModalService);

    modal.openModal(error.message, true);

    throw error;
    }
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { AuthorizationService, RoutingService } from '../../services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: object,
              private routingService: RoutingService,
              private authService: AuthorizationService) {
  }

  public goToLogin(): void {
    this.authService.clearLocalStorage();
    this.routingService.goToLoginPage();
  }
}

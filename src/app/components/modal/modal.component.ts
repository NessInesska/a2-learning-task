import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { RoutingService } from '../../services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private routingService: RoutingService) {
  }

  public goToLogin(): void {
    localStorage.clear();
    this.routingService.goToLoginPage();
  }
}

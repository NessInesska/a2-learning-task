import { Component } from '@angular/core';

import { RoutingService } from '../../services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(private routingService: RoutingService) { }

  public goToMainPage(): void {
    this.routingService.goToMainPage();
  }

}

import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { RoutingService } from '../../services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() item;

  public isAdmin: boolean = false;
  public range;

  constructor(private routingService: RoutingService) {
  }

  public ngOnInit() {
      this.range = _.range(this.item.rating);
}

  public goToProductPage() {

    this.routingService.goToProductPage(this.item.id);
  }
}

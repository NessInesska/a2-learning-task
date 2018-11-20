import { Component, Input, OnInit } from '@angular/core';

import { ProductService, RoutingService } from '../../services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() item;

  public isAdmin: boolean = false;
  public range;
  public emptyRange;

  constructor(private routingService: RoutingService,
              private productService: ProductService) {
  }

  public ngOnInit() {
      this.range = new Array(this.item.rating);
      this.emptyRange = new Array((5 - this.item.rating));
  }

  public goToProductPage() {
    this.productService.getProductById(this.item.id)
      .subscribe(res => {
        this.productService.item = res;
        this.routingService.goToProductPage(res.id);
      });
  }
}

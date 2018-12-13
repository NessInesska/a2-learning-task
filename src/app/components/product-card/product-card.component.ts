import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../../classes';
import { MESSAGES, RATING_NUMBER } from '../../constants';
import { ModalService, ProductService, RoutingService } from '../../services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {

  @Input() item: Product;
  @Input() isAdmin: boolean;

  @Output() remove: EventEmitter<string> = new EventEmitter<string>();

  public maxRatingRange = new Array(RATING_NUMBER.FIVE);

  constructor(private routingService: RoutingService,
              private productService: ProductService,
              private modalService: ModalService) {
  }

  public goToProductPage(): void {
    this.productService.getProductById(this.item.id)
      .subscribe(
        res => {
          this.productService.item = res;
          this.routingService.goToProductDetailsPage(res.id);
        });
  }

  public deleteProduct(): void {
    this.modalService.openModal({message: MESSAGES.YOU_DELETED + this.item.name});
    this.remove.emit(this.item.id);
  }
}

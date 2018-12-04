import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../classes';
import { MESSAGES } from '../../constants';
import { ModalService, ProductService, RoutingService } from '../../services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() item: Product;
  @Input() isAdmin: boolean;

  @Output() remove: EventEmitter<string> = new EventEmitter<string>();

  public range: number[] = [];
  public emptyRange: number[] = [];

  constructor(private routingService: RoutingService,
              private productService: ProductService,
              private modalService: ModalService) {
  }

  public ngOnInit() {
    this.range = new Array(this.item.rating);
    this.emptyRange = new Array((5 - this.item.rating));
  }

  public goToProductPage(): void {
    this.productService.getProductById(this.item.id)
      .subscribe(res => {
        this.productService.item = res;
        this.routingService.goToProductPage(res.id);
      });
  }

  public deleteProduct(): void {
    this.modalService.openModal({message: MESSAGES.YOU_DELETED + this.item.name, isUnauthorised: false});
    this.remove.emit(this.item.id);
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { STATUS_CODES } from '../../constants';

import { ProductService, RoutingService } from '../../services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() item;
  @Input() isAdmin;
  @Output() remove: EventEmitter<any> = new EventEmitter();

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

  public deleteProduct() {
    this.productService.deleteItemById(this.item.id).subscribe((result: Response) => {
      if (result.status === STATUS_CODES.NOT_FOUND) {
        this.routingService.goToNotFoundPage();
      }
      this.remove.emit(null);
    });
  }
}

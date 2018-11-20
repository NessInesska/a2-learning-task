import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService, ModalService } from '../../services';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  @ViewChild('buyButton') public buyButton: ElementRef;

  public item;
  public range;
  public emptyRange;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private modalService: ModalService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.item = this.productService.item;
    this.productService.getProductById(id)
      .subscribe(item => this.item = item);
    this.cd.detectChanges();
    this.range = new Array(this.item.rating);
    this.emptyRange = new Array((5 - this.item.rating));
  }

  public showModal(): void {
    // TODO: modal service
    // this.modalService.openModal(this.buyButton, this.item);
    alert('You have successfully bought ' + this.item.name);
  }
}

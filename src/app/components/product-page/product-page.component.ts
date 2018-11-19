import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  @ViewChild('buyButton') public buyButton: ElementRef;

  public product;
  public prodArr;
  public isInitialised: boolean = false;
  public isConfirmed: boolean = false;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.productService.getProducts()
      .subscribe(product => {
        console.log(product);
        this.prodArr = product;
        this.prodArr.forEach(item => {
          item.id == id ? this.product = item : console.log('err');
        });
    });
  }

  public showModal(): void {
    if (this.isInitialised) {
      this.onBuyButtonClick();
      return;
    }
    this.isInitialised = true;
    this.cd.detectChanges();
    setTimeout(() => {
      this.onBuyButtonClick();
    });
  }

  public confirm() {
    this.productService.patchNumberOfProducts(this.product.id, this.product.count, this.product.soldCount).subscribe(res => console.log(res));
    this.isConfirmed = true;
  }

  public closeModal() {
    this.isInitialised = false;
    this.isConfirmed = false;
  }

  private onBuyButtonClick(): void {
    if (!!this.buyButton) {
      this.buyButton.nativeElement.click();
    }
  }
}

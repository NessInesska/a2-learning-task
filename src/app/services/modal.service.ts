import { ElementRef, Injectable } from '@angular/core';

import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public isOpened: boolean = false;
  public item = this.productService.item;

  constructor(private productService: ProductService) {
  }

  public openModal(buyButton: ElementRef, item) {
    if (this.isOpened) {
      this.onBuyButtonClick(buyButton, item);
      return;
    }
    this.isOpened = true;
    setTimeout(() => {
      this.onBuyButtonClick(buyButton, item);
    });
  }

  public closeModal() {
    this.isOpened = false;
  }

  private onBuyButtonClick(buyButton: ElementRef, item): void {
    if (buyButton) {
      buyButton.nativeElement.click();
      this.productService.patchNumberOfProducts(item.id, item.count, item.soldCount)
        .subscribe(res => console.log(res));
    }
  }
}

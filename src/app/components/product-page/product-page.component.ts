import { Component } from '@angular/core';

import { Product } from '../../classes';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  public productsNames: Product[] = [];
}

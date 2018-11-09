import { Component, OnInit } from '@angular/core';
import { ProductCardService } from '../../services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit{

  public isAdmin: boolean = false;
  public productTitles;

  constructor(private productService: ProductCardService) { }

  public ngOnInit() {
    this.getProductInformation();
  }

  public getProductInformation() {
    this.productService.getProductTitles()
      .subscribe(titles => this.productTitles = titles);
  }
}

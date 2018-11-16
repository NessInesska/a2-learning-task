import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../classes';
import { ProductService } from '../../services';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public product;

  public prodArr;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
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

}

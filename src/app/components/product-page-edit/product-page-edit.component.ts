import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services';

@Component({
  selector: 'app-product-page-edit-component',
  templateUrl: './product-page-edit.component.html',
  styleUrls: ['./product-page-edit.component.scss']
})
export class ProductPageEditComponent implements OnInit {

  public item;

  constructor(private productService: ProductService) { }

  ngOnInit() {

  }

}

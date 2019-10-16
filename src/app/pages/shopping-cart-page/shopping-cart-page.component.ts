import { Component, OnInit } from '@angular/core';

import { AuthorizationService, ProductService } from '../../services';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent implements OnInit {

  public login: string;
  public item = {
    id: 43,
    categoryId: 4,
    image: 'https://images.pexels.com/photos/24272/pexels-photo-24272.jpg?h=350&auto=compress&cs=tinysrgb',
    name: 'Wear to work Lorem Ipsum 4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    cost: 173.99,
    rating: 5,
    gender: 'Woman',
    count: 5,
  };

  constructor(private productService: ProductService,
              public authService: AuthorizationService) { }

  public ngOnInit() {
    this.login = this.authService.getLogin();
  }

  public getProductInfo(id: string): void {
    this.productService.getProductById(id);
  }

}

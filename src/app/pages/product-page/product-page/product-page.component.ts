import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Product } from '../../../classes';
import { MESSAGES } from '../../../constants';
import { ProductService, ModalService, RoutingService, UserService, AuthorizationService } from '../../../services';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  @ViewChild('buyButton') public buyButton: ElementRef;

  public item;
  public range: number[] = [];
  public emptyRange: number[] = [];
  public id: string;
  public isAdmin: boolean = false;
  public login: string;
  public categoryName: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private modalService: ModalService,
              private routingService: RoutingService,
              private userService: UserService,
              private authService: AuthorizationService,
              private cd: ChangeDetectorRef,
              private location: Location) {
  }

  public ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    const getCategories = this.productService.getCategories();
    const getCurrentProduct = this.productService.getProductById(this.id);

    forkJoin([getCategories, getCurrentProduct]).subscribe(data => {
      // data[0] is categories
      // data[1] is currentProduct
      this.productService.categories = data[0];
      this.item = data[1];
      if (this.authService.hasIsAdmin()) {
        this.isAdmin = true;
      }
      this.login = this.authService.getLogin();

      const category = this.productService.categories.find(categor => categor.id === this.item.categoryId);
      this.categoryName = category ? category.name : null;

      this.range = new Array(this.item.rating);
      this.emptyRange = new Array((5 - this.item.rating));
    });

    this.cd.detectChanges();
  }

  public showModal(): void {
    this.productService.patchNumberOfProducts(this.item.id, this.item.count, this.item.soldCount)
      .subscribe(res => this.item = res);

    this.modalService.openModal({message: MESSAGES.YOU_BOUGHT + this.item.name, isUnauthorised: false});
  }

  public goToEditProductsPage(): void {
    this.routingService.goToEditProductPage(this.id);
  }

  public goToMainPage(): void {
    this.location.back();
  }
}

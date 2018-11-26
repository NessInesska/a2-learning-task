import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ProductService, ModalService, RoutingService, UserService } from '../../services';

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
  public isAdmin = false;
  public login: string;
  public category;
  public categoryName: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private modalService: ModalService,
              private routingService: RoutingService,
              private userService: UserService,
              private cd: ChangeDetectorRef) {
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
      if (localStorage.getItem('isAdmin')) {
        this.isAdmin = true;
      }
      this.login = localStorage.getItem('login');

      this.category = this.productService.categories.filter(cat => {
        if (cat.id === this.item.categoryId) {
          this.categoryName = cat.name;
        }
      });

        this.range = new Array(this.item.rating);
        this.emptyRange = new Array((5 - this.item.rating));
      });

    this.cd.detectChanges();
  }

  public showModal(): void {
    // TODO: modal service
    // this.modalService.openModal(this.buyButton, this.item);

    this.productService.patchNumberOfProducts(this.item.id, this.item.count, this.item.soldCount)
      .subscribe(res => this.item = res);
    alert('You have successfully bought ' + this.item.name);
  }

  public goToEditProductsPage() {
    this.routingService.goToEditProductPage(this.id);
  }
}

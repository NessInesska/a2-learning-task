import { ChangeDetectorRef, Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { MESSAGES, ROUTING_PATHES, NUMBER, ROLE } from '../../../constants';
import {
  ProductService,
  ModalService,
  RoutingService,
  UserService,
  CategoriesService,
} from '../../../services';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  @Output() loginName: string;

  @ViewChild('buyButton') public buyButton: ElementRef;

  public item;
  public maxRatingRange = new Array(NUMBER.FIVE);
  public id: string;
  public isAdmin = false;
  public login: string;
  public categoryName: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private modalService: ModalService,
              private routingService: RoutingService,
              private userService: UserService,
              private categoriesService: CategoriesService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params[ROUTING_PATHES.ID];

    const categories$ = this.categoriesService.getCategories();
    const currentProduct$ = this.productService.getProductById(this.id);
    const roles$ = this.userService.getRoles();
    const currentUser$ = this.userService.getUserByLogin();

    forkJoin([categories$, currentProduct$, roles$, currentUser$]).subscribe(
      data => {
        // data[0] is categories
        // data[1] is currentProduct
        // data[2] is roles
        // data[3] is currentUser
        this.productService.categories = data[0];
        this.item = data[1];
        this.userService.adminRole = Array.isArray(data[0]) ?
          data[2].find(role => role.name === ROLE.ADMIN) : null;

        this.userService.currentUser = data[3];
        this.login = this.userService.currentUser.login;

        if (this.userService.adminRole.id === this.userService.currentUser.roleId) {
          this.isAdmin = true;
        }

        const category = this.productService.categories.find(c => c.id === this.item.categoryId);
        this.categoryName = category ? category.name : null;
      });

    this.cd.detectChanges();
  }

  public showModal(): void {
    this.productService.buyProducts(this.item.id, this.item.count, this.item.soldCount)
      .subscribe(
        res => this.item = res,
        () => {},
        () => this.modalService.openModal({message: MESSAGES.YOU_BOUGHT + this.item.name})
      );
  }

  public goToEditProductsPage(): void {
    this.routingService.goToEditProductPage(this.id);
  }

  public goToMainPage(): void {
    this.routingService.goToMainPage();
  }
}

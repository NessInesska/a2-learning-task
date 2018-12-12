import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Product } from '../../classes';
import { ROLE, ROUTING_PATHES } from '../../constants';
import { CategoriesService, ModalService, ProductService, RoutingService, UserService } from '../../services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public login: string;
  public isEditPage = false;

  public item: Product;
  public isAdmin = false;
  public categoryName;
  public id: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private modalService: ModalService,
              private routingService: RoutingService,
              private userService: UserService,
              private categoriesService: CategoriesService) {
    location.pathname === ROUTING_PATHES.EDIT ? this.isEditPage = true : this.isEditPage = false;
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
  }
}

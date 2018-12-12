import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

import { ROLE } from '../../constants';
import { CategoriesService, LoginStorageService, ProductService, UserService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  public item;
  public isAdmin = false;
  public login: string;
  public id: string;
  public categories;

  constructor(private categoriesService: CategoriesService,
              private productService: ProductService,
              private loginStorageService: LoginStorageService,
              private userService: UserService) { }

  // public getData(): void {
  //   const categories$ = this.categoriesService.getCategories();
  //   const currentProduct$ = this.productService.getProductById(this.id);
  //   const roles$ = this.userService.getRoles();
  //   const currentUser$ = this.userService.getUserByLogin();
  //
  //   forkJoin([categories$, currentProduct$, roles$, currentUser$]).subscribe(
  //     data => {
  //       console.log(data);
  //       // data[0] is categories
  //       // data[1] is currentProduct
  //       // data[2] is roles
  //       // data[3] is currentUser
  //       this.categories = data[0];
  //       this.item = data[1];
  //       this.userService.adminRole = Array.isArray(data[0]) ?
  //         data[2].find(role => role.name === ROLE.ADMIN) : null;
  //
  //       this.userService.currentUser = data[3];
  //       this.login = this.userService.currentUser.login;
  //
  //       if (this.userService.adminRole.id === this.userService.currentUser.roleId) {
  //         this.isAdmin = true;
  //       }
  //
  //       const category = this.categories.find(c => c.id === this.item.categoryId);
  //       this.categoryName = category ? category.name : null;
  //     });
  // }
}

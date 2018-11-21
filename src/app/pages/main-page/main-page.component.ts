import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ProductService, UserService } from '../../services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  @ViewChild('showFiltersButton') public dropdownFiltersButton: ElementRef;

  @ViewChild('dropdownContent') public dropdownContent: ElementRef;

  public isOpened: boolean = false;
  public login: string = this.userService.login;
  public productArray;
  public item;
  public isAdmin = false;

  constructor(private userService: UserService,
              private productService: ProductService) {
  }

  public ngOnInit() {
    this.item = this.productService.getProducts()
      .subscribe(products => {
        this.productArray = products;
      });
    this.isAdmin = this.userService.isAdmin;

    // this.userService.getRoles();
    //
    // setTimeout(() => {
    //   this.adminRole = this.userService.roles.filter(role => {
    //     if (role.id === 0) {
    //       return role;
    //     }
    //   });
    // });
    //
    // this.userService.getUserByLogin()
    //   .subscribe((user: User) => {
    //     this.userService.currentUser = user;
    //     console.log(user);
    //     if (user[0].roleId === this.adminRole[0].id) {
    //       this.userService.isAdmin = true;
    //       this.isAdmin = true;
    //     }
    //   });
  }

  public onFiltersClick(): void {
    if (this.isOpened) {
      this.dropdownFiltersButtonClick();
      return;
    }
    this.isOpened = true;
    setTimeout(() => {
      this.dropdownFiltersButtonClick();
    });
  }

  public closeDropdown() {
    this.isOpened = false;
  }

  private dropdownFiltersButtonClick(): void {
    if (!!this.dropdownFiltersButton) {
      this.dropdownFiltersButton.nativeElement.click();
    }
  }
}

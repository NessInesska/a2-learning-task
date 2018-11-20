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

  constructor(private userService: UserService,
              private productService: ProductService) {
  }

  public ngOnInit() {
    this.item = this.productService.getProducts()
      .subscribe(products => {
        this.productArray = products;
      });
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

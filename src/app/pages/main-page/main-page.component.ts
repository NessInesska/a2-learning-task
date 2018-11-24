import { ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';

import { ProductService, UserService } from '../../services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnChanges {

  @ViewChild('showFiltersButton') public dropdownFiltersButton: ElementRef;

  @ViewChild('dropdownContent') public dropdownContent: ElementRef;

  public isOpened: boolean = false;
  public login: string = this.userService.login;
  public productArray;
  public item;
  public isAdmin = false;
  public categories;

  constructor(private userService: UserService,
              private productService: ProductService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnChanges(): void {
    this.cd.detectChanges();
  }

  public ngOnInit() {
    const getCategories = this.productService.getCategories();
    const getProductItems = this.productService.getProducts();

    forkJoin([getCategories, getProductItems]).subscribe( data => {
      // data [0] is categories
      // data [1] is products
      this.categories = data[0];
      this.productArray = data[1];
      this.isAdmin = this.userService.isAdmin;
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

  public filterProducts() {

  }

  private dropdownFiltersButtonClick(): void {
    if (!!this.dropdownFiltersButton) {
      this.dropdownFiltersButton.nativeElement.click();
    }
  }
}

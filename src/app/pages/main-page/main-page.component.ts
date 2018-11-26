import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, forkJoin } from 'rxjs';

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
  public login: string;
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
      this.login = localStorage.getItem('login');
      if (localStorage.getItem('isAdmin')) {
        this.isAdmin = true;
      }
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

  public update() {
    this.productArray.item = null;
  }

  private dropdownFiltersButtonClick(): void {
    if (!!this.dropdownFiltersButton) {
      this.dropdownFiltersButton.nativeElement.click();
    }
  }
}

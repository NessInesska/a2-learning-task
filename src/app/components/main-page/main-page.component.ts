import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../classes';

import { ProductService, UserService } from '../../services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  @ViewChild('showFiltersButton') public dropdownFiltersButton: ElementRef;

  @ViewChild('dropdownContent') public dropdownContent: ElementRef;

  public isInitialised: boolean = false;
  public login: string = this.userService.login;
  public productArray;
  public item;

  constructor(private userService: UserService,
              private productCardService: ProductService) {
  }

  public ngOnInit() {
    this.productCardService.getProducts().subscribe(
      products => {
        this.productArray = products;
        this.productArray.forEach(item => {
          this.item = item;
        });
      });
  }

  public onFiltersClick(): void {
    if (this.isInitialised) {
      this.dropdownFiltersButtonClick();
      return;
    }

    this.isInitialised = true;
    setTimeout(() => {
      this.dropdownFiltersButtonClick();
    });
  }

  public closeDropdown() {
    this.isInitialised = false;
  }

  private dropdownFiltersButtonClick(): void {
    if (!!this.dropdownFiltersButton) {
      this.dropdownFiltersButton.nativeElement.click();
    }
  }
}

import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { BehaviorSubject, combineLatest, forkJoin } from 'rxjs';

import { LOCAL_STORAGE, STATUS_CODES } from '../../constants';
import { ProductService, RoutingService, UserService } from '../../services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  public login: string;
  public productArray;
  public item;
  public isAdmin = false;
  public categories;
  public panelOpenState = false;
  public searchString = '';
  public isLoading = false;
  public maxPriceValue: number;
  public minPriceValue: number;

  public genders: string[] = ['Woman', 'Man', 'Unisex'];
  public _products = new BehaviorSubject<any[]>([]);
  public _filteredProducts = new BehaviorSubject<any[]>([]);
  public pricesArray: number [] = [];

  public filtersInput = this.formBuild.group({
    genderFilterControl: new FormControl(),
    categoryFilterControl: new FormControl(),
    availabilityFilterControl: new FormControl(),
    ratingFilterControl: new FormControl(),
    priceFilterControl: new FormControl(),
  });

  public showTicks = false;
  public autoTicks = false;

  constructor(private userService: UserService,
              private formBuild: FormBuilder,
              private routingService: RoutingService,
              private productService: ProductService) {
  }

  public ngOnInit() {
    this.isLoading = true;
    // this._products.next(this.getMaxProductPrice());
    this._products.next(this.getProductsInfo());
    setTimeout(() => {
      this.setFilters();
      this.isLoading = false;
    }, 1000);
  }

  public removeProductCard(id) {
    this.productService.deleteItemById(id).subscribe((result: Response) => {
      if (result.status === STATUS_CODES.NOT_FOUND) {
        this.routingService.goToNotFoundPage();
      }
    this._filteredProducts.next(this._filteredProducts.value
      .filter( product => product.id !== id));
    });
  }

  public clearFormControls(): void {
    this.genderFilterControl.setValue('');
    this.categoryFilterControl.setValue('');
    this.availabilityFilterControl.setValue('');
    this.ratingFilterControl.setValue('');
    this.priceFilterControl.setValue('');
  }

  public get genderFilterControl() {
    return this.filtersInput.controls['genderFilterControl'];
  }

  public get categoryFilterControl() {
    return this.filtersInput.controls['categoryFilterControl'];
  }

  public get availabilityFilterControl() {
    return this.filtersInput.controls['availabilityFilterControl'];
  }

  public get ratingFilterControl() {
    return this.filtersInput.controls['ratingFilterControl'];
  }

  public get priceFilterControl() {
    return this.filtersInput.controls['priceFilterControl'];
  }

  public get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }

  public set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }

  private _tickInterval = 1;

  private getProductsInfo(): any {
    this.isLoading = true;
    const getCategories = this.productService.getCategories();
    const getProductItems = this.productService.getProducts();

    forkJoin([getCategories, getProductItems]).subscribe(data => {
      // data [0] is categories
      // data [1] is products
      this.categories = data[0];
      this._products.next(data[1]);
      this.login = localStorage.getItem('login');
      if (localStorage.getItem(LOCAL_STORAGE.IS_ADMIN)) {
        this.isAdmin = true;
      }
      this._products.forEach((productArr) => {
        productArr.filter(pr => this.pricesArray.push(+pr.cost));
      });

      this.maxPriceValue = Math.max.apply(null, this.pricesArray);
      this.minPriceValue = Math.min.apply(null, this.pricesArray);
    });
  }

  private setFilters() {
    this._filteredProducts.next(this._products.value);

    combineLatest(
      this._products,
      this.genderFilterControl.valueChanges,
      this.categoryFilterControl.valueChanges,
      this.availabilityFilterControl.valueChanges,
      this.ratingFilterControl.valueChanges,
      this.priceFilterControl.valueChanges,
    ).subscribe(([productArray,
                       genderFilter,
                       categoryFilter,
                       availabilityFilter,
                       ratingFilter,
                       priceFilter]) => {
      let filteredProducts = [...productArray];

      if (genderFilter) {
        filteredProducts = filteredProducts.filter(product => product.gender === genderFilter);
      }

      if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === categoryFilter);
      }

      if (availabilityFilter) {
        filteredProducts = filteredProducts.filter(product => product.count > 0);
      }

      if (ratingFilter) {
        filteredProducts = filteredProducts.filter(product => product.rating === ratingFilter);
      }

      if (priceFilter) {
        filteredProducts = filteredProducts.filter(product => product.cost > priceFilter);
      }

      this._filteredProducts.next(filteredProducts);
    });

    this.genderFilterControl.setValue('');
    this.categoryFilterControl.setValue('');
    this.availabilityFilterControl.setValue('');
    this.ratingFilterControl.setValue('');
    this.priceFilterControl.setValue('');
  }
}

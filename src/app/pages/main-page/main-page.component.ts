import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Category, Gender, Product } from '../../classes';
import { UnsubscribeComponent } from '../../components/unsubscribe';
import { GENDERS } from '../../constants';
import { ROLE, FILTER_FORM_CONTROLS } from '../../constants';
import { CategoriesService, LocalStorageService, ProductService, UserService, LoginStorageService } from '../../services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent extends UnsubscribeComponent implements OnInit {

  public login: string;
  public item: Product;
  public isAdmin = false;
  public categories: Category[];
  public panelOpenState = false;
  public searchString = '';
  public isLoading = false;
  public maxPriceValue: number;
  public minPriceValue: number;

  public genders: Gender[] = GENDERS;
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public filteredProducts$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public pricesArray: number [] = [];

  public FILTER_FORM_CONTROLS = FILTER_FORM_CONTROLS;

  public filtersForm: FormGroup = this.formBuild.group({
    [FILTER_FORM_CONTROLS.AVAILABILITY_FILTER]: new FormControl(),
    [FILTER_FORM_CONTROLS.GENDER_FILTER]: new FormControl(),
    [FILTER_FORM_CONTROLS.CATEGORY_FILTER]: new FormControl(),
    [FILTER_FORM_CONTROLS.RATING_FILTER]: new FormControl(),
    [FILTER_FORM_CONTROLS.PRICE_FILTER]: new FormControl(),
  });

  public timerOptions = {
    showTicks: false,
    autoTicks: false,
  };

  constructor(private userService: UserService,
              private formBuild: FormBuilder,
              private productService: ProductService,
              private loginStorageService: LoginStorageService,
              private localStorageService: LocalStorageService,
              private categoriesService: CategoriesService) {
    super();
    super.ngOnDestroy();
  }

  private _tickInterval = 1;

  public ngOnInit(): void {
    this.login = this.loginStorageService.getLogin();

    const roles$ = this.userService.getRoles();
    const currentUser$ = this.userService.getUserByLogin();

    forkJoin([roles$, currentUser$]).subscribe(
      data => {
        // data[0] is admin role
        // data[1] is current user
        this.userService.adminRole = Array.isArray(data[0]) ?
          data[0].find(role => role.name === ROLE.ADMIN) : null;

        this.userService.currentUser = data[1];

        if (this.userService.adminRole.id === this.userService.currentUser.roleId) {
          this.isAdmin = true;
        }
      });

    this.setProductsInfo();
    this.subscriptions.push(this.filtersForm.valueChanges.subscribe());
  }

  public removeProductCard(id: string): void {
    this.productService.deleteItemById(id).subscribe(
      () => {
        this.filteredProducts$.next(this.filteredProducts$.value
          .filter(product => product.id !== id));
      });
  }

  public clearFormControls(): void {
    this.genderFilterControl.reset();
    this.categoryFilterControl.reset();
    this.availabilityFilterControl.reset();
    this.ratingFilterControl.reset();
    this.priceFilterControl.reset();
  }

  public get genderFilterControl(): AbstractControl {
    return this.filtersForm.controls[FILTER_FORM_CONTROLS.GENDER_FILTER];
  }

  public get categoryFilterControl(): AbstractControl {
    return this.filtersForm.controls[FILTER_FORM_CONTROLS.CATEGORY_FILTER];
  }

  public get availabilityFilterControl(): AbstractControl {
    return this.filtersForm.controls[FILTER_FORM_CONTROLS.AVAILABILITY_FILTER];
  }

  public get ratingFilterControl(): AbstractControl {
    return this.filtersForm.controls[FILTER_FORM_CONTROLS.RATING_FILTER];
  }

  public get priceFilterControl(): AbstractControl {
    return this.filtersForm.controls[FILTER_FORM_CONTROLS.PRICE_FILTER];
  }

  public get tickInterval(): number | 'auto' {
    return this.timerOptions.showTicks ? (this.timerOptions.autoTicks ? 'auto' : this._tickInterval) : 0;
  }

  private setProductsInfo(): void {
    this.isLoading = true;
    const categories$ = this.categoriesService.getCategories();
    const products$ = this.productService.getProducts();

    forkJoin([categories$, products$])
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
      data => {
        // data [0] is categories
        // data [1] is products
        this.categories = data[0];
        this.products$.next(data[1]);

        this.pricesArray = this.products$.value.map(product => +product.cost);

        this.maxPriceValue = Math.max(...this.pricesArray);
        this.minPriceValue = Math.min(...this.pricesArray);

        this.setFilters();
      });
  }

  private setFilters(): void {
    this.filteredProducts$.next(this.products$.value);

    combineLatest(
      this.products$,
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

      this.filteredProducts$.next(filteredProducts);
    });

    this.genderFilterControl.reset();
    this.categoryFilterControl.reset();
    this.availabilityFilterControl.reset();
    this.ratingFilterControl.reset();
    this.priceFilterControl.reset();
  }
}

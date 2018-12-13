import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Category, Gender, Product } from '../../../classes';
import { UnsubscribeComponent } from '../../../components/unsubscribe';
import { EDIT_FORM_CONTROLS, GENDERS, MESSAGES, RATING_NUMBER, ROUTING_PATH_PARAMS } from '../../../constants';
import {
  AuthorizationService,
  CategoriesService,
  ModalService,
  ProductService,
  RoutingService,
  LoginStorageService
} from '../../../services';

@Component({
  selector: 'app-product-page-edit',
  templateUrl: './product-page-edit.component.html',
  styleUrls: ['./product-page-edit.component.scss'],
})
export class ProductPageEditComponent extends UnsubscribeComponent implements OnInit, OnDestroy {

  @Input() rating: number;
  @Input() itemId: number;

  @Output() ratingClick: EventEmitter<{ itemId: number, rating: number }> = new EventEmitter<{ itemId: number, rating: number }>();

  public inputName: string;

  public genders: Gender[] = [];
  public item: Product;
  public categories: Category[];
  public id = this.route.snapshot.params[ROUTING_PATH_PARAMS.ID];
  public login: string;
  public isLoading = false;

  public EDIT_FORM_CONTROLS = EDIT_FORM_CONTROLS;

  public editMainPageForm: FormGroup = this.formBuild.group({
    [EDIT_FORM_CONTROLS.ITEM_NAME]: ['', {
      validators: [Validators.required, Validators.pattern('[a-zA-Z0-9.,! ]*')],
      updateOn: 'blur'
    }],
    [EDIT_FORM_CONTROLS.DESCRIPTION]: ['', {
      validators: [Validators.required, Validators.pattern('[a-zA-Z0-9.,! ]*')],
      updateOn: 'blur'
    }],
    [EDIT_FORM_CONTROLS.ITEM_COST]: ['', {
      validators: [Validators.required, Validators.min(0), Validators.pattern('[0-9.$ ]*')],
      updateOn: 'blur'
    }],
    [EDIT_FORM_CONTROLS.CATEGORY_SELECT]: ['', Validators.required],
    [EDIT_FORM_CONTROLS.GENDER_SELECT]: ['', Validators.required],
    [EDIT_FORM_CONTROLS.RATING_SELECT]: [Validators.required],
  });

  public ratingArray: number[];
  public isChecked: boolean;

  constructor(private productService: ProductService,
              private formBuild: FormBuilder,
              private routingService: RoutingService,
              private authService: AuthorizationService,
              private route: ActivatedRoute,
              private modalService: ModalService,
              private loginStorageService: LoginStorageService,
              private categoriesService: CategoriesService) {
    super();
    super.ngOnDestroy();
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.ratingArray = new Array(RATING_NUMBER.FIVE);

    this.inputName = this.itemId + '_rating';

    this.genders = GENDERS;

    const categories$ = this.categoriesService.getCategories();
    const currentProduct$ = this.productService.getProductById(this.id);

    forkJoin([categories$, currentProduct$])
      .pipe(
        finalize(
          () => {
            this.setEditPageControlsValues();
            this.isLoading = false;
          }))
      .subscribe(
        data => {
          // data[0] is categories
          // data[1] is currentProduct
          this.productService.categories = data[0];
          this.categories = this.productService.categories;
          this.item = data[1];
          this.login = this.loginStorageService.getLogin();
        });
    this.subscriptions.push(this.editMainPageForm.valueChanges.subscribe());
  }

  public onSubmit(): void {
    this.modalService.openModal({message: MESSAGES.YOU_EDITED_PRODUCT_PAGE});

    if (this.editMainPageForm.valid) {
      const editForm = {
        name: this.itemNameControl,
        description: this.descriptionControl,
        cost: this.itemCostControl,
        gender: this.genderSelectControl,
        categoryId: this.categorySelectControl,
        rating: this.rating
      };

      this.productService.patchEditedProduct(editForm, this.id)
        .subscribe(
          res => {
            this.item = res;
            this.routingService.goToProductDetailsPage(this.id);
          });
      return this.editMainPageForm.value;
    }
  }

  public onRatingMouseEnter(rating: number, index: number): void {
    this.isChecked = false;
    this.rating = rating;

    this.isChecked = this.rating === 4;

    this.editMainPageForm.controls[EDIT_FORM_CONTROLS.RATING_SELECT].setValue(rating);
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }

  public onCancel(): void {
    this.modalService.openModal({message: MESSAGES.YOU_CANCELLED_EDITING_PAGE});
    this.routingService.goToProductDetailsPage(this.id);
  }

  public get itemNameControl(): AbstractControl {
    return this.editMainPageForm.controls[EDIT_FORM_CONTROLS.ITEM_NAME];
  }

  public get descriptionControl(): AbstractControl {
    return this.editMainPageForm.controls[EDIT_FORM_CONTROLS.DESCRIPTION];
  }

  public get itemCostControl(): AbstractControl {
    return this.editMainPageForm.controls[EDIT_FORM_CONTROLS.ITEM_COST];
  }

  public get categorySelectControl(): AbstractControl {
    return this.editMainPageForm.controls[EDIT_FORM_CONTROLS.CATEGORY_SELECT];
  }

  public get genderSelectControl(): AbstractControl {
    return this.editMainPageForm.controls[EDIT_FORM_CONTROLS.GENDER_SELECT];
  }

  public goToProductPage(): void {
    this.routingService.goToProductDetailsPage(this.id);
  }

  private setEditPageControlsValues() {
    this.itemNameControl.setValue(this.item.name);
    this.descriptionControl.setValue(this.item.description);
    this.itemCostControl.setValue(this.item.cost);
  }
}

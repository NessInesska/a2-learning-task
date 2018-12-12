import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Gender, Product } from '../../../classes';
import { UnsubscribeComponent } from '../../../components/unsubscribe/unsubscribe.component';
import { EDIT_FORM_CONTROLS, GENDERS, MESSAGES, NUMBER, ROUTING_PATHES } from '../../../constants';
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

  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  public inputName: string;

  public genders: Gender[] = [];
  public item: Product;
  public categories;
  public id = this.route.snapshot.params[ROUTING_PATHES.ID];
  public login: string;
  public isLoading = false;

  public editPageFormControls = {
    ...EDIT_FORM_CONTROLS
    // TODO change this to commented code
    // [EDIT_FORM_CONTROLS.ITEM_NAME_CONTROL]: 'itemNameControl',
    // [EDIT_FORM_CONTROLS.DESCRIPTION_CONTROL]: 'descriptionControl',
    // [EDIT_FORM_CONTROLS.ITEM_COST_CONTROL]: 'itemCostControl',
    // [EDIT_FORM_CONTROLS.CATEGORY_SELECT_CONTROL]: 'categorySelectControl',
    // [EDIT_FORM_CONTROLS.GENDER_SELECT_CONTROL]: 'genderSelect',
    // [EDIT_FORM_CONTROLS.RATING_SELECT]: 'ratingSelect',
  };

  public editMainPageForm: FormGroup = this.formBuild.group({
    [this.editPageFormControls.ITEM_NAME_CONTROL]: ['', {
      validators: [Validators.required, Validators.pattern('[a-zA-Z0-9.,! ]*')],
      updateOn: 'blur'
    }],
    [this.editPageFormControls.DESCRIPTION_CONTROL]: ['', {
      validators: [Validators.required, Validators.pattern('[a-zA-Z0-9.,! ]*')],
      updateOn: 'blur'
    }],
    [this.editPageFormControls.ITEM_COST_CONTROL]: ['', {
      validators: [Validators.required, Validators.min(0), Validators.pattern('[0-9.$ ]*')],
      updateOn: 'blur'
    }],
    [this.editPageFormControls.CATEGORY_SELECT_CONTROL]: ['', Validators.required],
    [this.editPageFormControls.GENDER_SELECT_CONTROL]: ['', Validators.required],
    [this.editPageFormControls.RATING_SELECT]: [Validators.required],
  });

  public ratingArray: number[];

  constructor(private productService: ProductService,
              private formBuild: FormBuilder,
              private routingService: RoutingService,
              private authService: AuthorizationService,
              private route: ActivatedRoute,
              private modalService: ModalService,
              private loginStorageService: LoginStorageService,
              private categoriesService: CategoriesService,
              private cd: ChangeDetectorRef) {
    super();
    super.ngOnDestroy();
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this.ratingArray = new Array(NUMBER.FIVE);

    this.inputName = this.itemId + '_rating';

    this.genders = GENDERS;

    const categories$ = this.categoriesService.getCategories();
    const currentProduct$ = this.productService.getProductById(this.id);

    forkJoin([categories$, currentProduct$]).subscribe(
      data => {
        // data[0] is categories
        // data[1] is currentProduct
        this.productService.categories = data[0];
        this.categories = this.productService.categories;
        this.item = data[1];
        this.login = this.loginStorageService.getLogin();
      },
      () => {
      },
      () => {
        this.setEditPageControlsValues();
        this.isLoading = false;
      });
    this.subscriptions.push(this.editMainPageForm.valueChanges.subscribe());
  }

  public onSubmit(): void {
    this.modalService.openModal({message: MESSAGES.YOU_EDITED_PRODUCT_PAGE});

    if (this.editMainPageForm.valid) {
      this.productService.patchEditedProduct(this.editMainPageForm.value, this.id)
        .subscribe(
          res => {
            this.item = res;
            this.routingService.goToProductDetailsPage(this.id);
          });
      return this.editMainPageForm.value;
    }
  }

  public onRatingMouseEnter(rating: number): void {
    this.rating = rating;
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
    return this.editMainPageForm.controls[EDIT_FORM_CONTROLS.ITEM_NAME_CONTROL];
  }

  public get descriptionControl(): AbstractControl {
    return this.editMainPageForm.controls[EDIT_FORM_CONTROLS.DESCRIPTION_CONTROL];
  }

  public get itemCostControl(): AbstractControl {
    return this.editMainPageForm.controls[EDIT_FORM_CONTROLS.ITEM_COST_CONTROL];
  }

  public get categorySelectControl(): AbstractControl {
    return this.editMainPageForm.controls[EDIT_FORM_CONTROLS.CATEGORY_SELECT_CONTROL];
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

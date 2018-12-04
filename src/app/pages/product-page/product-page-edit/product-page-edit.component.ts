import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Gender } from '../../../classes/gender.class';
import { GENDERS, MESSAGES } from '../../../constants';
import { AuthorizationService, ModalService, ProductService, RoutingService } from '../../../services';

@Component({
  selector: 'app-product-page-edit-component',
  templateUrl: './product-page-edit.component.html',
  styleUrls: ['./product-page-edit.component.scss'],
})
export class ProductPageEditComponent implements OnInit {

  @Input() rating: number;
  @Input() itemId: number;

  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  inputName: string;


  public genders: Gender[] = [];
  public item;
  public categories;
  public id = this.route.snapshot.params['id'];
  public login: string;

  public editMainPageForm = this.formBuild.group({
    itemNameInput: ['', {
      validators: [Validators.required, Validators.pattern('[a-zA-Z0-9.,! ]*')],
      updateOn: 'blur'
    }],
    descriptionInput: ['', {
      validators: [Validators.required, Validators.pattern('[a-zA-Z0-9.,! ]*')],
      updateOn: 'blur'
    }],
    itemCostInput: [{
      validators: [Validators.required, Validators.min(0), Validators.pattern('[0-9.$ ]*')],
      updateOn: 'blur'
    }],
    categorySelect: ['', Validators.required],
    genderSelect: ['', Validators.required],
    ratingSelect: [Validators.required],
  });

  constructor(private productService: ProductService,
              private formBuild: FormBuilder,
              private routingService: RoutingService,
              private authService: AuthorizationService,
              private route: ActivatedRoute,
              private modalService: ModalService) {
  }

  public ngOnInit() {
    // this.editMainPageForm

    this.inputName = this.itemId + '_rating';

    this.genders = GENDERS;

    const getCategories = this.productService.getCategories();
    const getCurrentProduct = this.productService.getProductById(this.id);

    forkJoin([getCategories, getCurrentProduct]).subscribe(data => {
      // data[0] is categories
      // data[1] is currentProduct
      this.productService.categories = data[0];
      this.categories = this.productService.categories;
      this.item = data[1];
      this.login = this.authService.getLogin();
    });
  }

  public onSubmit(): void {

    this.modalService.openModal({message: MESSAGES.YOU_EDITED_PRODUCT_PAGE, isUnauthorised: false});

    if (this.editMainPageForm.valid) {
      this.productService.patchEditedProduct(this.editMainPageForm.value, this.id)
        .subscribe(res => {
          this.item = res;
          this.routingService.goToProductPage(this.id);
        });
      return this.editMainPageForm.value;
    }
  }

  public onRatingClick(rating: number): void {
    this.rating = rating;
    this.editMainPageForm.controls['ratingSelect'].setValue(rating);
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }

  public onCancel(): void {
    this.modalService.openModal({message: MESSAGES.YOU_CANCELLED_EDITING_PAGE, isUnauthorised: false});
    this.routingService.goToProductPage(this.id);
  }

  public get itemNameInput(): AbstractControl {
    return this.editMainPageForm.controls['itemNameInput'];
  }

  public get descriptionInput(): AbstractControl {
    return this.editMainPageForm.controls['descriptionInput'];
  }

  public get itemCostInput(): AbstractControl {
    return this.editMainPageForm.controls['itemCostInput'];
  }

  public get categorySelect(): AbstractControl {
    return this.editMainPageForm.controls['categorySelect'];
  }
}

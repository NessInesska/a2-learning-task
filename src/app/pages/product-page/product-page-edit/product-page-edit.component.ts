import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Gender } from '../../../classes/gender.class';
import { GENDERS } from '../../../constants';
import { ProductService, RoutingService } from '../../../services';

@Component({
  selector: 'app-product-page-edit-component',
  templateUrl: './product-page-edit.component.html',
  styleUrls: ['./product-page-edit.component.scss'],
})
export class ProductPageEditComponent implements OnInit {

  public genders: Gender[] = [];
  public item;
  public categories;
  public id = this.route.snapshot.params['id'];

  public editMainPageForm = this.formBuild.group({
    itemNameInput: ['', Validators.required],
    descriptionInput: ['', Validators.required],
    itemCostInput: ['', {validators: [Validators.required, Validators.min(0), Validators.pattern('[0-9]*')]}],
    categorySelect: [''],
    genderSelect: [''],
  });


  constructor(private productService: ProductService,
              private formBuild: FormBuilder,
              private routingService: RoutingService,
              private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.genders = GENDERS;

    const getCategories = this.productService.getCategories();
    const getCurrentProduct = this.productService.getProductById(this.id);

    forkJoin([getCategories, getCurrentProduct]).subscribe(data => {
      // data[0] is categories
      // data[1] is currentProduct
      this.productService.categories = data[0];
      this.categories = this.productService.categories;
      this.item = data[1];
    });
  }

  public onSubmit() {
    if (this.editMainPageForm.valid) {
      this.productService.patchEditedProduct(this.editMainPageForm.value, this.id)
        .subscribe(res => {
          this.item = res;
          this.routingService.goToProductPage(this.id);
        });
      return this.editMainPageForm.value;
    }
  }

  public onCancel() {
    this.routingService.goToProductPage(this.id);
  }

  public get itemNameInput() {
    return this.editMainPageForm.controls['itemNameInput'];
  }

  public get descriptionInput() {
    return this.editMainPageForm.controls['descriptionInput'];
  }

  public get categorySelect() {
    return this.editMainPageForm.controls['categorySelect'];
  }


}

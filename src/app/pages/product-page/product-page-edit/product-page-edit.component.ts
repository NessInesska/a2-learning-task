import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Gender } from '../../../classes/gender.class';
import { GENDERS } from '../../../constants';
import { ProductService } from '../../../services';

@Component({
  selector: 'app-product-page-edit-component',
  templateUrl: './product-page-edit.component.html',
  styleUrls: ['./product-page-edit.component.scss']
})
export class ProductPageEditComponent implements OnInit {

  public genders: Gender[] = [];

  public editMainPageForm = this.formBuild.group({
    itemNameInput: ['', Validators.required],
    descriptionInput: ['', Validators.required],
    itemCostInput: ['', {validators: [Validators.required, Validators.min(0), Validators.pattern('[0-9]*')]}]
  });

  public item;

  constructor(private productService: ProductService,
              private formBuild: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.productService.getProductById(id)
      .subscribe(res => {
        this.productService.item = res;
        this.item = this.productService.item;
        console.log(res);
      });

    this.genders = GENDERS;
    console.log(this.item);
  }

  public onSubmit() {
    if (this.editMainPageForm.invalid) {
      return;
    } else {
      console.log(this.itemNameInput.value + ' ' + this.descriptionInput.value);
    }
  }

  public get itemNameInput() {
    return this.editMainPageForm.controls['itemNameInput'];
  }

  public get descriptionInput() {
    return this.editMainPageForm.controls['descriptionInput'];
  }

}

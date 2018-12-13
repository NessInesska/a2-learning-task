import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
} from '@angular/material';

import { PageFooterModule } from '../../components/page-footer';
import { PageHeaderModule } from '../../components/page-header';
import { ProductPageComponent } from './product-page';
import { ProductPageEditComponent } from './product-page-edit';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    MatIconModule,
    PageHeaderModule,
    PageFooterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    ProductPageComponent,
    ProductPageEditComponent,
  ],
  exports: [
    ProductPageComponent,
    ProductPageEditComponent,
  ]
})
export class ProductDetailsModule { }

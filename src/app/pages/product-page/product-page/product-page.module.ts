import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

import { PageHeaderModule } from '../../../components/page-header';
import { ProductPageEditComponent } from '../product-page-edit';
import { ProductPageComponent } from './product-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [
    ProductPageComponent,
    ProductPageEditComponent,
  ],
  exports: [
    ProductPageComponent,
  ],
})
export class ProductPageModule { }

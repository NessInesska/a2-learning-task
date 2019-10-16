import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSliderModule
} from '@angular/material';

import { ProductSummaryComponent } from '../../components/product-summary';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatInputModule,
    MatCheckboxModule,
    MatSliderModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    ProductSummaryComponent,
  ],
  exports: [
  ],
})
export class ShoppingCartPagePageModule { }

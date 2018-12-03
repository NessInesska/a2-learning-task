import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSliderModule
} from '@angular/material';

import { PageHeaderModule } from '../../components/page-header';
import { ProductCardModule } from '../../components/product-card';
import { SearchPipe } from '../../pipes';
import { MainPageComponent } from './main-page.component';

@NgModule({
  imports: [
    CommonModule,
    ProductCardModule,
    MatIconModule,
    PageHeaderModule,
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
    MainPageComponent,
    SearchPipe,
  ],
  exports: [
    MainPageComponent
  ],
})
export class MainPageModule { }

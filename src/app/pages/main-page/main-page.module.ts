import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule, MatSliderModule
} from '@angular/material';

import { ModalComponent } from '../../components/modal';
import { PageHeaderModule } from '../../components/page-header';
import { ProductCardModule } from '../../components/product-card';
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
  ],
  declarations: [
    MainPageComponent,
    ModalComponent,
  ],
  exports: [
    MainPageComponent
  ],
})
export class MainPageModule { }

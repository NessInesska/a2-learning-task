import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { PageHeaderModule } from '../page-header/page-header.module';
import { ProductPageComponent } from './product-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    PageHeaderModule,
  ],
  declarations: [
    ProductPageComponent,
  ],
  exports: [
    ProductPageComponent,
  ],
})
export class ProductPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { ProductCardComponent } from './product-card.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    ProductCardComponent,
  ],
  exports: [
    ProductCardComponent
  ],
})
export class ProductCardModule { }

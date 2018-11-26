import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';

import { ProductCardComponent } from './product-card.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [
    ProductCardComponent,
  ],
  exports: [
    ProductCardComponent
  ],
})
export class ProductCardModule { }

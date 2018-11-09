import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { ProductCardModule } from '../product-card';
import { MainPageComponent } from './main-page.component';

@NgModule({
  imports: [
    CommonModule,
    ProductCardModule,
    MatIconModule
  ],
  declarations: [
    MainPageComponent
  ],
  exports: [
    MainPageComponent
  ],
})
export class MainPageModule { }

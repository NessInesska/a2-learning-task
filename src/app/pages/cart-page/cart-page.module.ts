import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page.component';
import { CartComponent } from '../../components/cart';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CartPageComponent,
    CartComponent
  ],
  exports: [
    CartPageComponent
  ]
})
export class CartPageModule { }

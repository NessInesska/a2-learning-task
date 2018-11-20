import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { PageHeaderModule } from '../../components/page-header';
import { ModalService } from '../../services';
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
  providers: [
    ModalService,
  ],
})
export class ProductPageModule { }

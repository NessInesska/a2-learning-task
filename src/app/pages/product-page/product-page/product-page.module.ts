import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

import { PageHeaderModule } from '../../../components/page-header/index';
import { ModalService } from '../../../services/index';
import { ProductPageEditComponent } from '../product-page-edit/index';
import { ProductPageComponent } from './product-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
  ],
  declarations: [
    ProductPageComponent,
    ProductPageEditComponent,
  ],
  exports: [
    ProductPageComponent,
  ],
  providers: [
    ModalService,
  ],
})
export class ProductPageModule { }
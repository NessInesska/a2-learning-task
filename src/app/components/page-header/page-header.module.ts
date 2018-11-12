import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    PageHeaderComponent,
  ],
  exports: [
    PageHeaderComponent,
  ]
})
export class PageHeaderModule { }

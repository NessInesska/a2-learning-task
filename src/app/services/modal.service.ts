import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Product } from '../classes';
import { ModalComponent } from '../components/modal';
import { ProductService } from './product.service';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public item: Product = this.productService.item;
  public isUnauthorised: boolean = false;

  constructor(private productService: ProductService,
              private routingService: RoutingService,
              private dialog: MatDialog) {
  }

  public openModal(data: object): void {

    const dialogRef = this.dialog.open(ModalComponent, {
      panelClass: 'custom-dialog-container',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.isUnauthorised = false;
    });
  }
}

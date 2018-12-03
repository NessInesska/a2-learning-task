import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalComponent } from '../components/modal';
import { ProductService } from './product.service';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public item = this.productService.item;
  public isUnauthorised = false;

  constructor(private productService: ProductService,
              private routingService: RoutingService,
              private dialog: MatDialog) {
  }

  public openModal(data, isUnauthorised?: boolean) {
    this.isUnauthorised = isUnauthorised;

    const dialogRef = this.dialog.open(ModalComponent, {
      panelClass: 'custom-dialog-container',
      data: [data, isUnauthorised]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.isUnauthorised = false;
    });
  }
}

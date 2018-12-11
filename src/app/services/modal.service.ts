import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalComponent } from '../components/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) {
  }

  public openModal(data: object): void {

    this.dialog.open(ModalComponent, {
      panelClass: 'custom-dialog-container',
      data: data
    });
  }
}

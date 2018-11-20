import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public item;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.item = this.productService.item;
  }
}

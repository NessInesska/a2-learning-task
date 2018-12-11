import { Component } from '@angular/core';
import { ROUTING_PATHES } from '../../constants';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  public login;
  public isEditPage = false;

  constructor() {
    location.pathname === ROUTING_PATHES.EDIT ? this.isEditPage = true : this.isEditPage = false;
  }
}

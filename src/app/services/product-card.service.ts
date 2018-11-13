import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ENDPOINTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductCardService {

  constructor(private http: HttpClient) { }

  // public getProductTitles() {
  //   return this.http.get(`${environment.baseUrl}${ENDPOINTS.PRODUCTS}`);
  // }
}

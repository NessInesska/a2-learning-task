import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Product } from '../classes';
import { ENDPOINTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productArray;
  public item;

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}${ENDPOINTS.PRODUCTS}`);
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.baseUrl}${ENDPOINTS.PRODUCTS}/${id}`);
  }

  public patchNumberOfProducts(id, count, soldCount): Observable<Response> {
    return this.http.patch<Response>(`${environment.baseUrl}${ENDPOINTS.PRODUCTS}/${id}`, {count: count - 1, soldCount: soldCount + 1});
  }
}

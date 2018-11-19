import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ENDPOINTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}${ENDPOINTS.PRODUCTS}`);
  }

  public patchNumberOfProducts(id, count, soldCount): Observable<Response> {
    return this.http.patch<Response>(`${environment.baseUrl}${ENDPOINTS.PRODUCTS}/${id}`, {count: count - 1, soldCount: soldCount + 1});
  }
}

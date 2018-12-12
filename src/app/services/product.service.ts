import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../classes';
import { ENDPOINTS } from '../constants';
import { GlobalErrorHandler } from '../global-error-handler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public item: Product;
  public categories;

  constructor(private http: HttpClient,
              private globalErrorHandler: GlobalErrorHandler) {
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ENDPOINTS.PRODUCTS}`)
      .pipe(
        catchError(error => this.globalErrorHandler.handleError(error))
      );
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${ENDPOINTS.PRODUCTS}/${id}`)
      .pipe(
        catchError(error => this.globalErrorHandler.handleError(error))
      );
  }

  public buyProducts(id, count, soldCount): Observable<Response> {
    return this.http.patch<Response>(`${ENDPOINTS.PRODUCTS}/${id}`, {count: count - 1, soldCount: soldCount + 1})
      .pipe(
        catchError(error => this.globalErrorHandler.handleError(error))
      );
  }

  public patchEditedProduct(data, id: string): Observable<Product> {
    return this.http.patch<Product>(`${ENDPOINTS.PRODUCTS}/${id}`,
      {
        name: data.itemNameControl,
        description: data.descriptionControl,
        cost: data.itemCostControl,
        gender: data.genderSelect,
        categoryId: data.categorySelectControl,
        rating: data.ratingSelect
      })
      .pipe(
        catchError(error => this.globalErrorHandler.handleError(error))
      );
  }

  public deleteItemById(id: string): Observable<Object> {
    return this.http.delete(`${ENDPOINTS.PRODUCTS}/${id}`)
      .pipe(
        catchError(error => this.globalErrorHandler.handleError(error))
      );
  }
}

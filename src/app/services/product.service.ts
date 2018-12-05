import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category, Product } from '../classes';
import { ENDPOINTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public item;
  public categories;

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ENDPOINTS.PRODUCTS}`);
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${ENDPOINTS.PRODUCTS}/${id}`);
  }

  public patchNumberOfProducts(id, count, soldCount): Observable<Response> {
    return this.http.patch<Response>(`${ENDPOINTS.PRODUCTS}/${id}`, {count: count - 1, soldCount: soldCount + 1});
  }

  public patchEditedProduct(data, id: string): Observable<Response> {
    return this.http.patch<Response>(`${ENDPOINTS.PRODUCTS}/${id}`,
      {name: data.itemNameInput,
        description: data.descriptionInput,
        cost: data.itemCostInput,
        gender: data.genderSelect,
        categoryId: data.categorySelect,
        rating: data.ratingSelect
      });
  }

  public getCategories(): Observable<Category> {
    return this.http.get<Category>(`${ENDPOINTS.CATEGORIES}`);
  }

  public deleteItemById(id: string): Observable<Object> {
    return this.http.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
  }
}

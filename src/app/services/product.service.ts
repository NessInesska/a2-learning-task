import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Category, Product } from '../classes';
import { ENDPOINTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {

  public item;
  public categories;

  constructor(private http: HttpClient) {
  }

  public ngOnInit() {
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

  public patchEditedProduct(data, id: string): Observable<Response> {
    return this.http.patch<Response>(`${environment.baseUrl}${ENDPOINTS.PRODUCTS}/${id}`,
      {name: data.itemNameInput, description: data.descriptionInput, cost: data.itemCostInput, gender: data.gender});
  }

  public getCategories(): Observable<Category> {
    return this.http.get<Category>(`${environment.baseUrl}${ENDPOINTS.CATEGORIES}`);
  }

  public deleteItemById(id: string) {
    return this.http.delete(`${environment.baseUrl}${ENDPOINTS.PRODUCTS}/${id}`);
  }

  public getCategoryNames() {
    this.getCategories().subscribe(res => {
      this.categories.push(res.name);
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ENDPOINTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductCardService {

  constructor(private http: HttpClient) { }

  public getProductTitles(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}${ENDPOINTS.PRODUCTS}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Category } from '../classes';
import { ENDPOINTS } from '../constants';
import { GlobalErrorHandler } from '../global-error-handler';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient,
              private globalErrorHandler: GlobalErrorHandler) {
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${ENDPOINTS.CATEGORIES}`)
      .pipe(
        catchError(error => this.globalErrorHandler.handleError(error))
      );
  }
}

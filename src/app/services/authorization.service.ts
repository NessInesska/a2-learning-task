import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ENDPOINTS, LOCAL_STORAGE_KEYS } from '../constants';
import { TokenService } from './token.service';
import { GlobalErrorHandler } from '../global-error-handler';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private globalErrorHandler: GlobalErrorHandler) {
  }

  public login(login: string, password: string): Observable<HttpResponse<string>> {
    return this.http.post(`${ENDPOINTS.LOGIN}`, {login, password}, {observe: 'response', responseType: 'text'})
      .pipe(tap(res => {
          this.tokenService.setToken(res.headers.get(LOCAL_STORAGE_KEYS.SESSION_TOKEN));
        },
        catchError(error => this.globalErrorHandler.handleError(error))
      ));
  }

  public logout(login: string): Observable<Object> {
    return this.http.post(`${ENDPOINTS.LOGOUT}`, {login}, {observe: 'response', responseType: 'text'})
      .pipe(tap(
        catchError(error => this.globalErrorHandler.handleError(error))
      ));
  }
}

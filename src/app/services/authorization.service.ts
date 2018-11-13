import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ENDPOINTS } from '../constants';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('session-token');
  }

  public setToken(token: string): void {
    localStorage.setItem('session-token', token);
  }

  public login(login, password): Observable<HttpResponse<string>> {
    return this.http.post(`${environment.baseUrl}${ENDPOINTS.LOGIN}`, {login, password}, {observe: 'response', responseType: 'text'}, );
  }

  public logout(login) {
    return this.http.post(`${environment.baseUrl}${ENDPOINTS.LOGOUT}`, {login});
  }
}

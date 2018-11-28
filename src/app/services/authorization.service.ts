import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ENDPOINTS, LOCAL_STORAGE, SESSION_TOKEN } from '../constants';

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

  public hasToken(): boolean {
    if (localStorage.getItem(SESSION_TOKEN)) { return true; }
  }

  public removeToken(): void {
    localStorage.removeItem(SESSION_TOKEN);
  }

  public clearLocalStorage(): void {
    localStorage.removeItem(LOCAL_STORAGE.LOGIN);
    localStorage.removeItem(LOCAL_STORAGE.IS_ADMIN);
  }

  public hasIsAdmin(): boolean {
    if (localStorage.getItem(LOCAL_STORAGE.IS_ADMIN)) { return true; }
  }

  public handleLogin(res): void {
    this.setToken(res.headers.get(SESSION_TOKEN));
  }

  public login(login, password): Observable<HttpResponse<string>> {
    return this.http.post(`${environment.baseUrl}${ENDPOINTS.LOGIN}`, {login, password}, {observe: 'response', responseType: 'text'});
  }

  public logout(login) {
    return this.http.post(`${environment.baseUrl}${ENDPOINTS.LOGOUT}`, {login});
  }

}

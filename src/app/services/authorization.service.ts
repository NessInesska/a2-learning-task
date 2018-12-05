import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ENDPOINTS, LOCAL_STORAGE } from '../constants';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  constructor(private http: HttpClient) { }

  // TODO: move all work with localStorage to separate service
  public getToken(): string {
    return localStorage.getItem(LOCAL_STORAGE.SESSION_TOKEN);
  }

  public setToken(token: string): void {
    localStorage.setItem(LOCAL_STORAGE.SESSION_TOKEN, token);
  }

  public hasToken(): boolean {
    if (localStorage.getItem(LOCAL_STORAGE.SESSION_TOKEN)) { return true; }
  }

  public removeToken(): void {
    localStorage.removeItem(LOCAL_STORAGE.SESSION_TOKEN);
  }

  public clearLocalStorage(): void {
    localStorage.removeItem(LOCAL_STORAGE.LOGIN);
    localStorage.removeItem(LOCAL_STORAGE.IS_ADMIN);
  }

  public setLocalStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public hasIsAdmin(): boolean {
    if (localStorage.getItem(LOCAL_STORAGE.IS_ADMIN)) { return true; }
  }

  public hasLogin(): boolean {
    if (localStorage.getItem(LOCAL_STORAGE.LOGIN)) {return true; }
  }

  public getLogin(): string {
    return localStorage.getItem(LOCAL_STORAGE.LOGIN);
  }

  public handleLogin(res): void {
    this.setToken(res.headers.get(LOCAL_STORAGE.SESSION_TOKEN));
  }

  public login(login, password): Observable<HttpResponse<string>> {
    return this.http.post(`${ENDPOINTS.LOGIN}`, {login, password}, {observe: 'response', responseType: 'text'});
  }

  public logout(login): Observable<Object> {
    return this.http.post(`${ENDPOINTS.LOGOUT}`, {login});
  }
}

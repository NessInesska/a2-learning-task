import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ENDPOINTS, SESSION_TOKEN } from '../constants';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  constructor(private http: HttpClient,
              private routingService: RoutingService) { }

  public getToken(): string {
    return localStorage.getItem('session-token');
  }

  public setToken(token: string): void {
    localStorage.setItem('session-token', token);
  }

  public hasToken(): boolean {
    if (localStorage.getItem(SESSION_TOKEN)) return true;
  }

  public removeToken(): void {
    localStorage.removeItem(SESSION_TOKEN);
  }

  public handleLogin(res) {
    this.setToken(res.headers.get(SESSION_TOKEN));
    this.routingService.goToMainPage();
  }

  public login(login, password): Observable<HttpResponse<string>> {
    return this.http.post(`${environment.baseUrl}${ENDPOINTS.LOGIN}`, {login, password}, {observe: 'response', responseType: 'text'});
  }

  public logout(login) {
    return this.http.post(`${environment.baseUrl}${ENDPOINTS.LOGOUT}`, {login});
  }
}

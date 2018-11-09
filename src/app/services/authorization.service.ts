import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ENDPOINTS, ROUTING_PATHES } from '../constants';

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

  public login(login, password): Observable<any> {
    return this.http.post(`${environment.baseUrl}${ENDPOINTS.LOGIN}`, {login, password})
      .pipe(tap((tokens) => this.setToken(tokens)));
  }
}

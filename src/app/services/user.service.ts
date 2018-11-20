import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { User } from '../classes';
import { ENDPOINTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public login: string;

  constructor(private http: HttpClient) {
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}${ENDPOINTS.USERS}`);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../classes';
import { Role } from '../classes/role.class';
import { ENDPOINTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public login: string;
  public adminRole;
  public currentUser: User;
  public isAdmin = false;

  constructor(private http: HttpClient) {
  }

  public getUserByLogin(): Observable<User> {
    let params = new HttpParams();

    params = params.append('login', this.login);

    return this.http.get<User>(`${ENDPOINTS.USERS}`, {params});
  }

  public getRoles(): Observable<Role> {
    return this.http.get<Role>(`${ENDPOINTS.ROLES}`);
  }
}

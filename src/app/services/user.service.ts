import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { User } from '../classes';
import { ENDPOINTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public login: string;
  public roles;
  public currentUser: User;
  public isAdmin = false;

  constructor(private http: HttpClient) {
  }

  public getUserByLogin(): Observable<User> {
    let params = new HttpParams();

    params = params.append('login', this.login);

    return this.http.get<User>(`${environment.baseUrl}${ENDPOINTS.USERS}`, {params});
  }

  public getRoles() {
    return this.http.get(`${environment.baseUrl}${ENDPOINTS.ROLES}`)
      .subscribe(roles => {
        this.roles = roles;
      });
  }
}

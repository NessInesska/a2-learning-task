import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User, Role } from '../../classes';
import { ENDPOINTS, LOCAL_STORAGE_KEYS } from '../../constants';
import { GlobalErrorHandler } from '../../global-error-handler';
import { LocalStorageService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public login: string;
  public adminRole;
  public currentUser: User;
  public isAdmin = false;

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private globalErrorHandler: GlobalErrorHandler) {
  }

  public getUserByLogin(): Observable<User> {
    let params = new HttpParams();

    params = params.append(LOCAL_STORAGE_KEYS.LOGIN, this.localStorageService.getItem('login'));

    return this.http.get<User>(`${ENDPOINTS.USERS}`, {params}).pipe(
      map(
        (users: User[]) => Array.isArray(users) ? users[0] : null,
        catchError(error => this.globalErrorHandler.handleError(error))
      ));
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${ENDPOINTS.ROLES}`)
      .pipe(
        catchError(error => this.globalErrorHandler.handleError(error))
      );
  }
}

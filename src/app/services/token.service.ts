import { Injectable } from '@angular/core';

import { LOCAL_STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public getToken(): string {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.SESSION_TOKEN);
  }

  public setToken(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SESSION_TOKEN, token);
  }

  public removeToken(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SESSION_TOKEN);
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }
}

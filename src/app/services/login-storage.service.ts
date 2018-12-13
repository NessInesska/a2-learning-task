import { Injectable } from '@angular/core';

import { LOCAL_STORAGE_KEYS } from '../constants';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginStorageService {

  constructor(private localStorageService: LocalStorageService) { }


  public getLogin(): string {
    return this.localStorageService.getItem(LOCAL_STORAGE_KEYS.LOGIN);
  }

  public setLogin(login: string): void {
    this.localStorageService.setItem(LOCAL_STORAGE_KEYS.LOGIN, login);
  }

  public removeLogin(): void {
    this.localStorageService.removeItem(LOCAL_STORAGE_KEYS.LOGIN);
  }

  public hasLogin(): boolean {
    return !!this.localStorageService.hasItem(LOCAL_STORAGE_KEYS.LOGIN);
  }
}

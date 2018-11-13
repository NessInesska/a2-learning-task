import { Injectable } from '@angular/core';

import { User } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User = null;
  public login: string;

  constructor() { }

  public getCurrentUser(): User {
    return this.currentUser;
  }
}

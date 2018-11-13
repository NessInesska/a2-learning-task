import { Injectable } from '@angular/core';

import { User } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public currentUser: User = null;

  public getCurrentUser(): User {
    return this.currentUser;
  }
}

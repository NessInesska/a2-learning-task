import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { RoutingService, UserService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private routingService: RoutingService,
              private userService: UserService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin();
  }

  public checkLogin(): boolean {
    if (this.userService.currentUser !== null) {
      this.routingService.goToMainPage();
      return false;
    } else {
      return true;
    }
  }

}

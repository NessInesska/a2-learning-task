import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { RoutingService, UserService } from '../services';

@Injectable()
export class MainPageGuard implements CanActivate {

  constructor(private routingService: RoutingService,
              private userService: UserService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin();
  }

  public checkLogin(): boolean {
    if (this.userService.currentUser === null) {
      return;
    }

    if (this.userService.currentUser !== null) {
      return true;
    } else {
      this.routingService.navigate(['/login']);
      return false;
    }
  }
}

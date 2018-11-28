import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ROUTING_PATHES } from '../constants';

import { AuthorizationService, RoutingService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class MainPageGuard implements CanActivate {

  constructor(private routingService: RoutingService,
              private authService: AuthorizationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  public checkLogin(): boolean {
    if (!this.authService.hasToken()) {
      return true;
    } else {
      this.routingService.navigate([ROUTING_PATHES.MAIN_PAGE]);
    }
    return false;
  }
}

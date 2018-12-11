import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ROUTING_PATHES } from '../constants';
import { AuthorizationService, RoutingService, TokenService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthorizationService,
              private routingService: RoutingService,
              private tokenService: TokenService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  public checkLogin(): boolean {
    if (this.tokenService.hasToken()) {
      return true;
    } else {
      this.routingService.navigate([ROUTING_PATHES.LOGIN]);
    }
    return false;
  }
}

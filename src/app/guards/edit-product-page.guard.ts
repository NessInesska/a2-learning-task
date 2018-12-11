import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { ROUTING_PATHES } from '../constants';
import { AuthorizationService, RoutingService, TokenService, LoginStorageService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class EditProductPageGuard implements CanActivate {

  constructor(private authService: AuthorizationService,
              private routingService: RoutingService,
              private tokenService: TokenService,
              private loginStorageService: LoginStorageService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkAdminAccess();
  }

  public checkAdminAccess(): boolean {
    const login = this.loginStorageService.getLogin();

    // TODO rewrite this
    if (this.tokenService.hasToken() && login === 'frank') {
      return true;
    } else {
      this.routingService.navigate([ROUTING_PATHES.MAIN_PAGE]);
    }
    return false;
  }
}

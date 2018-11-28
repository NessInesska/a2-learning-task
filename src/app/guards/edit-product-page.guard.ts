import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { ROUTING_PATHES } from '../constants';

import { AuthorizationService, RoutingService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class EditProductPageGuard implements CanActivate {

  constructor(private authService: AuthorizationService,
              private routingService: RoutingService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkAdminAccess();
  }

  public checkAdminAccess(): boolean {
    if (this.authService.hasToken() && this.authService.hasIsAdmin()) {
      return true;
    } else {
      this.routingService.navigate([ROUTING_PATHES.MAIN_PAGE]);
    }
    return false;
  }
}

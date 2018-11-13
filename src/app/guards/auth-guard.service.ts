import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthorizationService, RoutingService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthorizationService,
              private routingService: RoutingService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  public checkLogin(): boolean {
    if (localStorage.getItem('session-token')) {
      return true;
    } else {
      this.routingService.navigate(['/login']);
    }
    return false;
  }
}

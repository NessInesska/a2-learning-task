import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RoutingService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class MainPageGuard implements CanActivate {

  constructor(private routingService: RoutingService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  public checkLogin(): boolean {
    if (!localStorage.getItem('session-token')) {
      return true;
    } else {
      this.routingService.navigate(['/main']);
    }
    return false;
  }
}

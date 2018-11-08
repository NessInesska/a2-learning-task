import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTING_PATHES } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  public goToMainPage() {
    this.router.navigate([ROUTING_PATHES.LOGIN]);
  }

  public navigate(path) {
    this.router.navigate(path);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTING_PATHES } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  public goToMainPage(): Promise<boolean> {
    return this.router.navigate([ROUTING_PATHES.MAIN_PAGE]);
  }

  public goToLoginPage(): Promise<boolean> {
    return this.router.navigate([ROUTING_PATHES.LOGIN]);
  }

  public goToProductDetailsPage(id: string): Promise<boolean> {
    return this.router.navigate([ROUTING_PATHES.PRODUCT, id]);
  }

  public goToEditProductPage(id: string): Promise<boolean> {
    return this.router.navigate([ROUTING_PATHES.PRODUCT, id, ROUTING_PATHES.EDIT]);
  }

  public goToNotFoundPage(): Promise<boolean> {
    return this.router.navigate([ROUTING_PATHES.NOT_FOUND]);
  }

  public goToServerErrorPage(): Promise<boolean> {
    return this.router.navigate([ROUTING_PATHES.INTERNAL_SERVER_ERROR]);
  }

  public navigate(path): Promise<boolean> {
    return this.router.navigate(path);
  }
}

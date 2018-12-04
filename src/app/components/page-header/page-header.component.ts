import { Component, Input } from '@angular/core';

import { AuthorizationService, RoutingService } from '../../services';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  @Input() login: string;
  @Input() notFound: boolean;

  constructor(private authService: AuthorizationService,
              private routingService: RoutingService) {
  }

  public logout(login): void {
    this.authService.logout(login);
    this.authService.removeToken();
    this.authService.clearLocalStorage();
    this.routingService.goToLoginPage();
  }

  public goToMainPage(): void {
    this.routingService.goToMainPage();
  }
}

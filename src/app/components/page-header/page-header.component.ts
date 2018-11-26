import { Component, Input } from '@angular/core';

import { AuthorizationService, RoutingService } from '../../services';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  @Input() login: string;
  @Input() notFound;

  constructor(private authService: AuthorizationService,
              private routingService: RoutingService) {
  }

  public logout(login) {
    this.authService.logout(login);
    this.authService.removeToken();
    this.routingService.goToLoginPage();
  }
}

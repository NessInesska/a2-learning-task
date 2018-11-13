import { Component, Input } from '@angular/core';
import { AuthorizationService, RoutingService } from '../../services';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  @Input() login: string;

  constructor(private authService: AuthorizationService,
              private routingService: RoutingService) {
  }

  public logout(login) {
    this.authService.logout(login);
    localStorage.removeItem('session-token');
    this.routingService.goToLoginPage();
  }
}

import { Component, OnInit } from '@angular/core';

import { AuthorizationService, RoutingService, LoginStorageService, TokenService } from '../../services';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  public login: string;

  constructor(private authService: AuthorizationService,
              private routingService: RoutingService,
              private tokenService: TokenService,
              private loginStorageService: LoginStorageService) {
  }

  public ngOnInit(): void {
    this.login = this.loginStorageService.getLogin();
  }

  public logout(login): void {
    this.authService.logout(login).subscribe();
    this.tokenService.removeToken();
    this.loginStorageService.removeLogin();
    this.routingService.goToLoginPage();
  }

  public goToMainPage(): void {
    this.routingService.goToMainPage();
  }
}

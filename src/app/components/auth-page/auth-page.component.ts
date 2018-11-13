import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthorizationService, RoutingService, UserService } from '../../services';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  public loginForm = this.formBuild.group({
    loginInput: ['', Validators.required],
    passwordInput: ['', Validators.required],
  });

  constructor(private authorizationService: AuthorizationService,
              private formBuild: FormBuilder,
              private routingService: RoutingService,
              private userService: UserService) { }

  public onLogin() {
    const login = this.loginForm.controls['loginInput'].value;
    const password = this.loginForm.controls['passwordInput'].value;

    if (this.loginForm.valid) {
      this.authorizationService.login(login, password).subscribe(res => {
        this.handleLogin(res);
      });

      // TODO: set currentUser value from null to logged user for authGuard
      this.userService.currentUser = login;
      this.userService.login = login;
    }
    this.routingService.goToMainPage();

  }

  public handleLogin(res) {
    this.authorizationService.setToken(res.headers.get('session-token'));
  }

  public get getFormControls() {
    return this.loginForm.controls;
  }
}

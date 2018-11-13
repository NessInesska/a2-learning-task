import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthorizationService, RoutingService } from '../../services';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  public loginForm = this.formBuild.group({
    loginInput: ['', [Validators.required, Validators.minLength(3)]],
    passwordInput: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(private authorizationService: AuthorizationService,
              private formBuild: FormBuilder,
              private routingService: RoutingService) {
  }

  public onLogin() {
    const login = this.loginForm.controls['loginInput'].value;
    const password = this.loginForm.controls['passwordInput'].value;

    if (this.loginForm.valid) {
      this.authorizationService.login(login, password).subscribe(res => {
        this.handleLogin(res);
      });
    }
  }

  public handleLogin(res) {
    this.authorizationService.setToken(res.headers.get('session-token'));
    this.routingService.goToMainPage();
  }

  public get getFormControls() {
    return this.loginForm.controls;
  }

  public get loginInput() {
    return this.loginForm.controls['loginInput'];
  }

  public get passwordInput() {
    return this.loginForm.controls['passwordInput'];
  }
}

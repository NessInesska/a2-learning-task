import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthorizationService } from '../../services';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  public loginForm = this.formBuild.group({
    loginInput: ['', {validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur'} ],
    passwordInput: ['', {validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur'}]
  });

  constructor(private authorizationService: AuthorizationService,
              private formBuild: FormBuilder) {
  }

  public onLogin() {
    const login = this.loginInput.value;
    const password = this.passwordInput.value;

    if (this.loginForm.valid) {
      this.authorizationService.login(login, password).subscribe(res => {
        this.authorizationService.handleLogin(res);
      });
    }
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

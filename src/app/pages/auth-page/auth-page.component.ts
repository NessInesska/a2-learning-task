import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { AuthorizationService, ProductService, RoutingService, UserService } from '../../services';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  public loginForm = this.formBuild.group({
    loginInput: ['', {validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur'}],
    passwordInput: ['', {validators: [Validators.required, Validators.minLength(3)], updateOn: 'blur'}]
  });

  constructor(private authorizationService: AuthorizationService,
              private userService: UserService,
              private productService: ProductService,
              private routingService: RoutingService,
              private formBuild: FormBuilder) {
  }

  public onLogin() {
    const login = this.loginInput.value;
    const password = this.passwordInput.value;

    this.userService.login = login;

    if (this.loginForm.valid) {
      this.authorizationService.login(login, password).subscribe(res => {
        this.authorizationService.handleLogin(res);

        let getRoles = this.userService.getRoles();
        let getCurrentUser = this.userService.getUserByLogin();

        forkJoin([getRoles, getCurrentUser])
          .subscribe(data => {
            // data[0][0] is admin role
            // data[1][0] is current user
            this.userService.adminRole = data[0][0];
            this.userService.currentUser = data[1][0];
            if (this.userService.adminRole.id === this.userService.currentUser.roleId) {
              this.userService.isAdmin = true;
            }
        });

        setTimeout(() => {
          this.routingService.goToMainPage();
        });
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

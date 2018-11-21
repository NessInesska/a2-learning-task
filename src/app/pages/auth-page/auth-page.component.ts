import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '../../classes';
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

  // public categories;
  // public user: User;
  // public roles;
  public adminRole;
  // public isAdmin = false;

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

        this.userService.getRoles();
        this.adminRole = this.userService.roles.filter(role => {
          if (role.id === 0) {
            return role;
          }
        });

        this.userService.getUserByLogin()
          .subscribe((user: User) => {
            this.userService.currentUser = user;
            if (user[0].roleId === this.adminRole[0].id) {
              this.userService.isAdmin = true;
              // this.isAdmin = true;
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

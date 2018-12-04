import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { LOCAL_STORAGE, STATUS_CODES, LOGIN_FORM_CONTROLS, MESSAGES } from '../../constants';
import { AuthorizationService, ModalService, ProductService, RoutingService, UserService } from '../../services';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {

  public loginForm = this.formBuild.group({
    loginInput: ['', {
      validators: [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')],
      updateOn: 'blur'
    }],
    passwordInput: ['', {
      validators: [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9 ]*')],
      updateOn: 'blur'
    }]
  });

  public wrongPassword: boolean = false;

  constructor(private authorizationService: AuthorizationService,
              private userService: UserService,
              private productService: ProductService,
              private routingService: RoutingService,
              private modalService: ModalService,
              private cd: ChangeDetectorRef,
              private formBuild: FormBuilder) {
  }

  public onLogin(): void {
    const login = this.loginInput.value;
    const password = this.passwordInput.value;

    this.userService.login = login;

    if (this.loginForm.valid) {
      this.authorizationService.login(login, password).subscribe(
        (res) => {
          this.authorizationService.handleLogin(res);

          const getRoles = this.userService.getRoles();
          const getCurrentUser = this.userService.getUserByLogin();

          forkJoin([getRoles, getCurrentUser])
            .subscribe(data => {
              // data[0][0] is admin role
              // data[1][0] is current user
              this.userService.adminRole = data[0][0];
              this.userService.currentUser = data[1][0];
              localStorage.setItem(LOCAL_STORAGE.LOGIN, this.userService.currentUser.login);
              if (this.userService.adminRole.id === this.userService.currentUser.roleId) {
                this.userService.isAdmin = true;
                localStorage.setItem(LOCAL_STORAGE.IS_ADMIN, this.userService.isAdmin.toString());
              }
            });

          setTimeout(() => {
            this.routingService.goToMainPage();
          });
        },
        (res: Response) => {
          if (res.status === STATUS_CODES.BAD_REQUEST) {
            this.wrongPassword = true;
            this.modalService.openModal({message: MESSAGES.WRONG_LOGIN_PASSWORD, isUnauthorised: false});
          } else if (res.status === STATUS_CODES.NOT_FOUND) {
            this.routingService.goToNotFoundPage();
          } else if (res.status === STATUS_CODES.INTERNAL_SERVER_ERROR) {
            this.routingService.goToNotFoundPage();
          }
        });
    }
  }

  public get getFormControls(): object {
    return this.loginForm.controls;
  }

  public get loginInput(): AbstractControl {
    return this.loginForm.controls[LOGIN_FORM_CONTROLS.LOGIN_INPUT];
  }

  public get passwordInput(): AbstractControl {
    return this.loginForm.controls[LOGIN_FORM_CONTROLS.PASSWORD_INPUT];
  }
}

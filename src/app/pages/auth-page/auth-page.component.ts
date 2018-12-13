import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UnsubscribeComponent } from '../../components/unsubscribe';
import { LOGIN_FORM_CONTROLS } from '../../constants/login-form-controls.constants';
import { AuthorizationService, RoutingService, LoginStorageService } from '../../services';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent extends UnsubscribeComponent implements OnInit {

  public loginForm: FormGroup;
  public wrongPassword = false;
  public LOGIN_FORM_CONTROLS = LOGIN_FORM_CONTROLS;

  constructor(private authorizationService: AuthorizationService,
              private routingService: RoutingService,
              private loginStorageService: LoginStorageService,
              private cd: ChangeDetectorRef,
              private formBuild: FormBuilder) {
    super();
    super.ngOnDestroy();
  }

  public ngOnInit(): void {
    this.handleLoginFormGroup();
    this.subscriptions.push(this.loginForm.valueChanges.subscribe());
  }

  public onLogin(): void {
    const login = this.loginControl.value;
    const password = this.passwordControl.value;

    this.loginStorageService.setLogin(login);

    if (this.loginForm.valid) {
      this.authorizationService.login(login, password).subscribe(
        () => {
          this.routingService.goToMainPage();
        });
    }
  }

  public get formControls(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }

  public get loginControl(): AbstractControl {
    return this.loginForm.controls[LOGIN_FORM_CONTROLS.LOGIN_INPUT];
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.controls[LOGIN_FORM_CONTROLS.PASSWORD_INPUT];
  }

  private handleLoginFormGroup(): void {
    this.loginForm = this.formBuild.group({
      [LOGIN_FORM_CONTROLS.LOGIN_INPUT]: ['', {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')],
        updateOn: 'blur'
      }],
      [LOGIN_FORM_CONTROLS.PASSWORD_INPUT]: ['', {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9 ]*')],
        updateOn: 'blur'
      }]
    });
  }
}

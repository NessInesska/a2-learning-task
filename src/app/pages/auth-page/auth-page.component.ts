import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ABSTRACT_FORM_CONTROLS } from '../../constants';
import { AuthorizationService, RoutingService, LoginStorageService } from '../../services';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent implements OnInit {

  public loginForm: FormGroup;
  public wrongPassword = false;

  constructor(private authorizationService: AuthorizationService,
              private routingService: RoutingService,
              private loginStorageService: LoginStorageService,
              private cd: ChangeDetectorRef,
              private formBuild: FormBuilder) {
  }

  public ngOnInit() {
    this.handleLoginFormGroup();
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
    return this.loginForm.controls[ABSTRACT_FORM_CONTROLS.LOGIN_CONTROL];
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.controls[ABSTRACT_FORM_CONTROLS.PASSWORD_CONTROL];
  }

  private handleLoginFormGroup(): void {
    this.loginForm = this.formBuild.group({
      loginControl: ['', {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')],
        updateOn: 'blur'
      }],
      passwordControl: ['', {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9 ]*')],
        updateOn: 'blur'
      }]
    });
  }
}

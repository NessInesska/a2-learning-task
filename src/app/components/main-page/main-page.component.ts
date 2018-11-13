import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {

  @ViewChild('showFiltersButton') public dropdownFiltersButton: ElementRef;

  @ViewChild('dropdownContent') public dropdownContent: ElementRef;

  public isInitialised: boolean = false;
  public login: string = this.userService.login;

  constructor(private userService: UserService) {
  }

  public onFiltersClick(): void {
    if (this.isInitialised) {
      this.dropdownFiltersButtonClick();
      return;
    }

    this.isInitialised = true;
    setTimeout(() => {
      this.dropdownFiltersButtonClick();
    });
  }

  public closeDropdown() {
    this.isInitialised = false;
  }

  private dropdownFiltersButtonClick(): void {
    if (!!this.dropdownFiltersButton) {
      this.dropdownFiltersButton.nativeElement.click();
    }
  }
}

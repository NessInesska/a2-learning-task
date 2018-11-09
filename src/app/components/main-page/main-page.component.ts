import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  @ViewChild('showFiltersButton') public dropdownFiltersButton: ElementRef;

  @ViewChild('dropdownContent') public dropdownContent: ElementRef;

  public initialised: boolean = false;

  constructor() { }

  public onFiltersClick(): void {
    if (this.initialised) {
      this.dropdownFiltersButtonClick();
      return;
    }

    this.initialised = true;
    setTimeout(() => {
      this.dropdownFiltersButtonClick();
    });
  }

  private dropdownFiltersButtonClick(): void {
    if (!!this.dropdownFiltersButton) {
      this.dropdownFiltersButton.nativeElement.click();
      this.initialised = false;
    }
  }
}

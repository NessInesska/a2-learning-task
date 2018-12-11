import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ROUTING_PATHES } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public isLoginPage = false;

  constructor(private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    location.pathname === ROUTING_PATHES.LOGIN ? this.isLoginPage = true : this.isLoginPage = false;
    console.log(location.pathname);
    this.cd.detectChanges();
  }

  public ngOnDestroy(): void {
    this.isLoginPage = false;
  }
}

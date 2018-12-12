import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTING_PATHES } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public loginRoute: string = ROUTING_PATHES.LOGIN;

  constructor(private router: Router) {
  }
}

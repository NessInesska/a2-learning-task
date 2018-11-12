import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
  }

  // public logout(login) {
  //   this.authService.logout(login);
  // }
}

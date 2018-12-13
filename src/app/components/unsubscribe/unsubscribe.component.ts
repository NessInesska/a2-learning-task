import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnDestroy {

  public subscriptions: Subscription[] = [];

  constructor() { }

  public ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}

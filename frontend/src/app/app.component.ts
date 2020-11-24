import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // FIELDS

  public title = 'log-application';
  public navbarLinks = [
    { text: 'Dashboard', href: 'dashboard' },
    { text: 'Manual Log', href: 'manual-log' },
    { text: 'Batch Log', href: 'batch-log' },
    { text: 'Search Logs', href: 'search-logs' },
  ];
}
